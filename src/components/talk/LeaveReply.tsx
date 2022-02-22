import SendIcon from '@mui/icons-material/Send';
import {
  Button
} from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { Post, Talk } from '../../../types/common/types';

interface Props {
  parent?: Talk;
  post: Post;
  initShowForm?: boolean;
  postRefetch: any;
  themeColors: any;
}
interface GetTalkTreeQuery {
  Roots: Talk[];
}
const LeaveReply = ({
  parent, post, initShowForm, postRefetch, themeColors
}: Props) => {
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
          postRefetch();
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
      <Button type="submit" size="small" color="primary" endIcon={<SendIcon />} disabled={comment.trim().length === 0}>
        {' '}
        Submit
        {' '}
      </Button>
    </>
  );
  const commentForm = (
    <form onSubmit={postComment} style={{ width: '100%', marginTop: '35px' }}>
      <MDEditor
        textareaProps={{
          placeholder: 'Leave a reply...',
        }}
        style={{ backgroundColor: themeColors.divBackground }}
        height={100}
        value={comment}
        preview="edit"
        onChange={(value: string | undefined) => value !== undefined && setComment(value)}
      />
      {button}
    </form>
  );

  const content = showForm ? (
    commentForm
  ) : (
    <Button style={{ float: 'left' }} size="small" onClick={() => setShowForm(!showForm)}>
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
