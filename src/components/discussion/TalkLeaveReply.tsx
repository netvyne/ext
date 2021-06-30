import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import { useMutation } from 'react-query';
import { Talk } from '../../../types/common/types';

interface Props {
  parent: Talk;
}

const LeaveReply = (props: Props) => {
  const [comment, setComment] = React.useState('');
  const [showForm, setShowForm] = React.useState(false);
  const mutation = useMutation({});
  const postComment = async (event: any) => {
    event.preventDefault();
    const data = {
      PostID: props.parent.Post.ID,
      ParentTalkID: props.parent.ID,
      Comment: comment,
    };
    // @ts-ignore
    const res = mutation.mutate({ route: '/post_talk', data });
    setShowForm(false);
    setComment('');
    // window.location.reload();
    return res;
  };
  const commentForm = (
    <form onSubmit={postComment}>
      <TextField value={comment} onInput={(e: any) => setComment(e.target.value)} />
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
    </Button>
  );
  return <Box>{content}</Box>;
};

export default LeaveReply;
