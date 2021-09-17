import {
  Box, Button, Grid, Typography
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { DateTime } from 'luxon';
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
      latestShout = data.LatestShout;
    }
  }

  let shout : any = '';
  if (latestShout !== '') {
    shout = (
      <div>
        <Typography variant="h5">Latest Comment</Typography>
        <div className="comment">
          <Grid item className="comment-author">
            <Grid item><b>{`${data.LatestShout.Author.UserName}`}</b></Grid>
            <Grid item component={Box} fontSize="15px">
              <Grid container direction="row" alignItems="center">
                <Grid item>
                  <AccessTimeIcon style={{ fill: 'grey' }} fontSize="inherit" />
                </Grid>
                <Grid item component={Box} style={{ color: 'grey' }} fontStyle="italic">
                  {DateTime.fromISO(data.LatestShout.CreatedAt.toString(), { zone: 'utc' }).toRelative()}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <div>{data.LatestShout.Comment}</div>
        </div>
        <Button className="view-all-comments" variant="contained" color="primary" fullWidth onClick={(event : any) => clickHandler(event, data.LatestShout.WebsiteID)}>
          View all comments
        </Button>
      </div>
    );
  }
  const replyMutation = useMutation({});
  const postComment = async (event : any) => {
    event.preventDefault();
    const commentData = {
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
          latestShout = response.Shout;
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
      {!shout && (
      <Grid>
        <Grid>
          <Typography>Be the First to comment on this page</Typography>
        </Grid>
        <Grid>
          {reply}
        </Grid>
      </Grid>
      )}
      {shout && (
      <Grid>
        <Grid>
          <Typography>{shout}</Typography>
        </Grid>
      </Grid>
      )}
    </Box>
  );
};
export default Shouts;
