import {
  Box, Button, Grid, Typography
} from '@material-ui/core';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Url, User } from '../../../types/common/types';
import ActionContainer from './ActionContainer';
import ReplyUI from './ReplyUI';
import './styles.scss';

interface GetUserQuery {
    initCurrentUser: User[];
    initUrl: Url;
}

const Shouts = ({ initCurrentUser, initUrl } : GetUserQuery) => {
  const url : any = initUrl;
  const [showCommentField, setShowCommentField] = useState<boolean>(true);
  const [comment, setComment] = React.useState('');
  const [showForm, setShowForm] = React.useState(true);
  // const [latestShout, setLatestShout] = React.useState<Shout>();
  const route = `/get_shout_trees?host=${url.host}&pathname=${url.pathname}&search=${encodeURIComponent(url.search)}`;

  const { data, status } = useQuery<any, string>(route);

  function clickHandler(e : any, websiteId: number) {
    e.preventDefault();
    window.open(`${process.env.PUBLIC_WEB}/w/${websiteId}`, '_blank', 'noopener,noreferrer');
    return false;
  }

  let latestShout : any = '';
  let actionBox : any = '';
  if (status === 'success') {
    if (data.Website) {
      actionBox = (
        <>
          <ActionContainer initWebsite={data.Website} reg url={url} />
        </>
      );
    }
    if (data.LatestShout && data.LatestShout.Comment) {
      latestShout = (
        <div>
          <div className="comment">
            <p>{`${data.LatestShout.Author.UserName}`}</p>
            <div>{data.LatestShout.Comment}</div>
          </div>
          <Button className="view-all-comments" variant="contained" color="primary" fullWidth onClick={(event : any) => clickHandler(event, data.LatestShout.WebsiteID)}>
            Viwe all comments
          </Button>
        </div>
      );
    }
  }
  const replyMutation = useMutation({});
  const postComment = async (event : any) => {
    event.preventDefault();
    const commentData = {
      ParentShoutID: 0,
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
        data: commentData,
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
      {actionBox}
      {!latestShout && (
      <Grid>
        <Grid>
          <Typography>Be the First to comment on this page</Typography>
        </Grid>
        <Grid>
          {reply}
        </Grid>
      </Grid>
      )}
      {latestShout && (
      <Grid>
        <Grid>
          <Typography>{latestShout}</Typography>
        </Grid>
      </Grid>
      )}
    </Box>
  );
};
export default Shouts;
