import React from 'react';
import Box from '@material-ui/core/Box';
import { DateTime } from 'luxon';
import { useQuery } from 'react-query';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import TalkTree from './TalkTree';
import FeedItem from './FeedItem';
import { Post, Talk } from '../../../types/common/types';

interface Props {
  initPost: any;
}

interface GetTalkTreeQuery {
  Roots: Talk[];
}

export default function FreedPost({ initPost } : Props) {
  const post : any = initPost;
  const { data, status } = useQuery<GetTalkTreeQuery, string>(
    `/get_talk_trees?post_id=${post.ID}`,
  );
  let trees : any = '';
  if (status === 'error') {
    trees = <div>Error</div>;
  } else if (status === 'loading') {
    trees = (
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
  } else {
    trees = data!.Roots.map((treeRoot) => (
      <TalkTree treeRoot={treeRoot} />
    ));
  }
  if (trees === '') {
    trees = (
      <Grid item component={Box}>
        No comments
      </Grid>
    );
  }
  return (
    <Grid
      container
      component={Box}
      boxShadow={3}
      direction="column"
      m={1}
      p={1}
      borderRadius="borderRadius"
      wrap="nowrap"
    >
      <Grid container direction="row" alignItems="flex-start" spacing={2}>
        <Grid item component={Box}>
          <Box component="span">
            Shared by
            {' '}
            {post.Author.FirstName}
            {' '}
            {post.Author.LastName}
          </Box>
          <Box component="span" m={1}>
            {DateTime.fromISO(post.CreatedAt.toString()).toRelative()}
          </Box>
        </Grid>
      </Grid>

      <Grid container component={Box}>
        <FeedItem initWebsite={post.Website} />
      </Grid>

      <Grid container component={Box}>
        {trees}
      </Grid>
    </Grid>
  );
}
