import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { Post, Talk } from '../../../types/common/types';

interface Props {
  parent?: Talk;
  post: Post;
  initShowForm?: boolean;
}
interface GetTalkTreeQuery {
  Roots: Talk[];
}
const LeaveReply = ({ parent, post, initShowForm }: Props) => {
  const [comment, setComment] = React.useState('');
  const [showForm, setShowForm] = React.useState(initShowForm);
  const mutation = useMutation({});
  const { refetch } = useQuery<GetTalkTreeQuery, string>(
    `/get_talk_trees?post_id=${post.ID}`, { enabled: false }
  );
  const postComment = async (event: any) => {
    event.preventDefault();
    const mutateData = {
      PostID: post.ID,
      ParentTalkID: parent?.ID,
      Comment: comment,
    };
    // @ts-ignore
    mutation.mutate({ route: '/post_talk', data: mutateData },
      {
        onSuccess: () => {
          if (!initShowForm) {
            setShowForm(false);
          }
          setComment('');
          refetch();
        }
      });
  };

  const button = (
    <>
      {!initShowForm
        && (
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
    </>
  );
  const commentForm = (
    <form onSubmit={postComment} style={{ width: '100%' }}>
      <TextField
        value={comment}
        fullWidth
        multiline
        variant="outlined"
        onInput={(e: any) => setComment(e.target.value)}
      />
      {button}
    </form>
  );

  const content = showForm ? (
    commentForm
  ) : (
    <Button size="small" onClick={() => setShowForm(!showForm)}>
      Reply
    </Button>
  );
  return content;
};

LeaveReply.defaultProps = {
  initShowForm: false,
  parent: null,
};

export default LeaveReply;
