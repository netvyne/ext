/* eslint-disable linebreak-style */
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Shout, User, Website } from '../../../types/common/types';
import ReplyUI from './ReplyUI';
import ShoutTreeUI from './ShoutTreeUI';
import ShoutVoteUI from './ShoutVoteUI';

interface Props {
  treeRoot: Shout;
  user: User;
  url: URL;
  website: Website
  refetch: ()=> any;
}

interface GetShoutTreesQuery {
  Roots: Shout[];
  Website: Website;
}

const ShoutTreeContainer = ({
  treeRoot, user, url, website, refetch
} : Props) => {
  const [root, setRoot] = React.useState<Shout>(treeRoot);
  const [children, setChildren] = React.useState<Shout[]>(root.Children || []);
  const [hide, setHide] = React.useState(root.Warn);
  const [saved, setSaved] = React.useState(treeRoot.Saved);
  const [showForm, setShowForm] = React.useState(treeRoot.Saved);
  const [comment, setComment] = React.useState('');
  const [shout, setShout] = React.useState(treeRoot);

  const postVote = async (event : any) => {
    event.preventDefault();
    const postVoteApiUrl = new URL(`${process.env.REACT_APP_PUBLIC_API}/post_vote_shout`);
    const init = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        Status: event.currentTarget.value === 'upvote' ? 1 : -1,
        ShoutID: shout.ID,
      }),
    };
    // @ts-ignore
    const res = await (await fetch(postVoteApiUrl, init)).json();
    setShout(res.Shout);
    return res;
  };

  const saveItemMutation = useMutation({});
  const onSaveItem = async (event : any, save: boolean) => {
    event.preventDefault();
    const data = {
      ShoutID: treeRoot.ID,
      Save: save,
    };
    // @ts-ignore
    const res = saveItemMutation.mutate({
      route: '/save_shout',
      data,
    },
    {
      onSuccess: () => {
        setSaved(!saved);
      },
    });
    return res;
  };
  const queryClient = useQueryClient();

  const replyMutation = useMutation({});
  const postComment = async (event : any) => {
    event.preventDefault();
    const data = {
      ParentShoutID: treeRoot.ID,
      Comment: comment,
      URL: {
        Host: url.host,
        Pathname: url.pathname,
        Search: url.search,
      },
    };

    const res: any = replyMutation.mutate(
      // @ts-ignore
      {
        route: '/post_shout',
        data,
      },
      {
        onSuccess: (response : any) => {
          setComment('');
          queryClient.invalidateQueries(`/get_shout_trees?host=${url.host}&pathname=${url.pathname}&search=${encodeURIComponent(url.search)}`);
        },
      },
    );
    setShowForm(false);
    return res;
  };

  const moreRepliesQuery = useQuery<GetShoutTreesQuery, string>(
    `/get_shout_trees?website_id=${website.ID}&root_ids=${root.MoreReplies?.join()}`,
    {
      enabled: false,
      onSuccess: (data: GetShoutTreesQuery) => {
        if (data.Roots.length > 0 && data.Roots[data.Roots.length - 1].ID === 0) {
          const dummy = data.Roots.pop();
          root.MoreReplies = dummy!.MoreReplies;
        } else {
          root.MoreReplies = [];
        }
        setChildren((prevState) => [...prevState, ...data.Roots]);
        setRoot(root);
      }
    }
  );

  const innerContent = (
    <>
      { !!children && children.map((childShout: Shout) => (
        <ShoutTreeContainer
          treeRoot={childShout}
          user={user}
          url={url}
          website={website}
          refetch={refetch}
        />
      ))}
      {(root.MoreReplies.length > 0) && <Button variant="outlined" onClick={() => moreRepliesQuery.refetch()}> Load More Comments</Button> }
    </>
  );

  // const color = treeRoot.Level % 2 === 0 ? '#eceff1' : '#fafafa';
  let content : any = '';
  // let children = null;
  // if (treeRoot.Children) {
  //   children = treeRoot.Children.map((childShout : Shout) => (
  //     <ShoutTreeContainer
  //       treeRoot={childShout}
  //       user={user}
  //       url={url}
  //       website={website}
  //     />
  //   ));
  // }

  if (treeRoot !== null) {
    let focus = -1;
    if (window.location.search.includes('focus')) {
      const urlParams = new URLSearchParams(window.location.search);
      focus = parseInt(urlParams.get('focus') as string, 10);
    }
    content = (
      <Grid item component={Box}>
        <ShoutTreeUI
          treeRoot={root}
          defUser={user}
          url={url}
          replyUI={ReplyUI}
          setShowForm={setShowForm}
          onSaveItem={onSaveItem}
          saved={saved}
          postComment={postComment}
          setComment={setComment}
          comment={comment}
          showForm={showForm}
          shoutVoteUI={ShoutVoteUI}
          innerContent={innerContent}
          reg={!!user.Registered}
          focus={focus}
          postVote={postVote}
        />
      </Grid>
    );
  } else {
    content = (
      <Grid item component={Box}>
        No comments
      </Grid>
    );
  }

  return <CssBaseline>{content}</CssBaseline>;
};

export default ShoutTreeContainer;
