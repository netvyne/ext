// import React from "react";
import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ReplyIcon from '@material-ui/icons/Reply';
import SendIcon from '@material-ui/icons/Send';
import { Shout, Website } from '../../../types/common/types';

interface Props {
  // eslint-disable-next-line react/require-default-props
  parent?: Shout;
  website: Website;
  url: URL;
  initShowForm: boolean;
}

const LeaveReply = ({
  parent, website, url, initShowForm,
}: Props) => {
  const queryClient = useQueryClient();
  const [comment, setComment] = React.useState('');
  const [showForm, setShowForm] = React.useState(initShowForm);
  const replyMutation = useMutation({});
  const postComment = async (event : any) => {
    event.preventDefault();
    const data = {
      ParentShoutID: parent?.ID,
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

  // queryClient.invalidateQueries('/get_website_feed');

  const commentForm = (
    <form onSubmit={postComment}>
      <TextField
        value={comment}
        onInput={(e : any) => setComment(e.target.value)}
        multiline
        variant="outlined"
        placeholder={initShowForm ? 'Leave a public comment...' : 'Leave a public reply...'}
        fullWidth
      />
      {!initShowForm && (
      <Button
        size="small"
        onClick={() => {
          setShowForm(false);
        }}
      >
        Cancel
      </Button>
      )}
      <Button type="submit" size="small" color="primary" endIcon={<SendIcon />}>
        {' '}
        Submit
        {' '}
      </Button>
    </form>
  );

  const content = showForm ? (
    commentForm
  ) : (
    <Button size="small" onClick={() => setShowForm(!showForm)}>
      Reply
      <ReplyIcon />
    </Button>
  );
  return <Box>{content}</Box>;
};

export default LeaveReply;
