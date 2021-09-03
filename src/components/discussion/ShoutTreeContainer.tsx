/* eslint-disable linebreak-style */
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Shout, User } from '../../../types/common/types';
import ReplyUI from './ReplyUI';
import ShoutTreeUI from './ShoutTreeUI';
import ShoutVoteUI from './ShoutVoteUI';

interface Props {
  treeRoot: Shout;
  user: User;
  url: URL;
}

const ShoutTreeContainer = ({
  treeRoot, user, url,
} : Props) => {
  const [saved, setSaved] = React.useState(treeRoot.Saved);
  const [showForm, setShowForm] = React.useState(treeRoot.Saved);
  const [comment, setComment] = React.useState('');
  const [shout, setShout] = React.useState(treeRoot);

  const postVote = async (event : any) => {
    event.preventDefault();
    const url = new URL(`${process.env.REACT_APP_PUBLIC_API}/post_vote_shout`);
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
    const res = await (await fetch(url, init)).json();
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
      ParentShoutID: treeRoot.ParentShout?.ID,
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

  const color = treeRoot.Level % 2 === 0 ? '#eceff1' : '#fafafa';
  let content : any = '';
  let children = null;
  if (treeRoot.Children) {
    children = treeRoot.Children.map((shout : Shout) => (
      <ShoutTreeContainer
        treeRoot={shout}
        user={user}
        url={url}
      />
    ));
  }

  if (treeRoot !== null) {
    content = (
      <Grid item component={Box}>
        <ShoutTreeUI
          treeRoot={treeRoot}
          user={user}
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
        />
        <Grid item component={Box}>
          {children}
        </Grid>
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
