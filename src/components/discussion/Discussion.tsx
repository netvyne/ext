import { Box } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import {
  Shout, Url, User, Website
} from '../../../types/common/types';
import { Error } from '../error';
import ActionContainer from './ActionContainer';
import ReplyUI from './ReplyUI';
import ShoutTreeContainer from './ShoutTreeContainer';
import WebsiteUI from './WebsiteUI';

interface Props {
  initCurrentUser: User[];
  initUrl: Url
}

interface GetShoutTreesQuery {
  Roots: Shout[];
  Website: Website;
}

const Discussion = ({ initCurrentUser, initUrl } : Props) => {
  const url : any = initUrl;
  const user : any = initCurrentUser;
  const [showForm, setShowForm] = React.useState(true);
  const [comment, setComment] = React.useState('');

  const replyMutation = useMutation({});
  const postComment = async (event : any) => {
    event.preventDefault();
    const data = {
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
          // TODO: Update cached data
        },
      },
    );
    setShowForm(false);
    return res;
  };

  const route = `/get_shout_trees?host=${url.host}&pathname=${url.pathname}&search=${encodeURIComponent(url.search)}`;

  const { data, status } = useQuery<GetShoutTreesQuery, string>(route);
  let children;
  let website;
  let trees;
  let actionBox;
  if (status === 'error') {
    website = <Error />;
    children = null;
  } else if (status === 'loading' || !data) {
    website = (
      <Grid
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Grid>
    );
    children = null;
  } else {
    website = (
      <>
        <WebsiteUI initWebsite={data.Website} url={url} />
      </>
    );
    actionBox = (
      <>
        <ActionContainer initWebsite={data.Website} reg={user?.Registered} url={url} />
      </>
    );
    if (data.Roots) {
      if (data.Roots.length > 0) {
        trees = data.Roots.map((treeRoot : any) => (
          <ShoutTreeContainer
            treeRoot={treeRoot}
            user={user}
            url={url}
          />
        ));
      } else {
        trees = (
          <Grid item component={Box}>
            No comments so far
          </Grid>
        );
      }
    } else {
      trees = (
        <Grid item component={Box}>
          No comments so far
        </Grid>
      );
    }
  }
  const reply = (
    <ReplyUI
      postComment={postComment}
      setComment={setComment}
      comment={comment}
      showForm={showForm}
      setShowForm={setShowForm}
    />
  );
  return (
    <Box>
      <div>
        {website}
        {actionBox}
        {reply}
        {trees}
      </div>
    </Box>
  );
};
export default Discussion;
