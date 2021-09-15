/* eslint-disable linebreak-style */
import { TextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ReplyIcon from '@material-ui/icons/Reply';
import SendIcon from '@material-ui/icons/Send';
import React from 'react';

interface Props {
    // eslint-disable-next-line react/require-default-props
    postComment: any;
    setComment: any;
    comment: string;
    setShowForm: any;
    showForm: boolean;
  }

const ReplyUI = ({
  postComment, setComment, comment, showForm, setShowForm,
}: Props) => {
  const commentForm = (
    <form onSubmit={postComment}>
      <TextField
        value={comment}
        onInput={(e : any) => setComment(e.target.value)}
        multiline
        variant="outlined"
        placeholder={showForm ? 'Leave a public comment...' : 'Leave a public reply...'}
        fullWidth
      />
      <Button
        size="small"
        onClick={() => {
          setShowForm(false);
        }}
      >
        Cancel
      </Button>
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

export default ReplyUI;
