import React from 'react';
import Box from '@material-ui/core/Box';
import { DateTime } from 'luxon';
import { useQuery } from 'react-query';
import Grid from '@material-ui/core/Grid';
import TalkTree from './TalkTree';
import FeedItem from './FeedItem';
import { Post, Talk } from '../../../types/common/types';

interface Props {
  post: Post;
}

interface GetTalkTreeQuery {
  Roots: Talk[];
}

export default function FreedPost(props: any) {
  const post : any  = props.post;
  const { data, status } = useQuery<GetTalkTreeQuery, string>(
    `/get_talk_trees?post_id=${post.ID}`,
  );
  let trees;
  if (status === 'error') {
    trees = <div>Error</div>;
  } else if (status === 'loading') {
    trees = <div>Loading</div>;
  } else {
    trees = data!.Roots.map((treeRoot) => (
      <TalkTree treeRoot={treeRoot} />
    ));
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
