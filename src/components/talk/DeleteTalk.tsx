import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { Talk } from '../../../types/common/types';

interface Props {
  initTalk: Talk;
  postRefetch: any;
  themeColors: any;
}
interface GetTalkTreeQuery {
  Roots: Talk[];
}
const DeleteTalk = ({ initTalk, postRefetch, themeColors }: Props) => {
  const mutation = useMutation({});
  const { refetch } = useQuery<GetTalkTreeQuery, string>(
    `/get_talk_trees?post_id=${initTalk?.PostID}`, { enabled: false }
  );
  const deleteComment = async (event: any) => {
    event.preventDefault();
    const mutateData = {
      TalkID: initTalk.ID,
      Delete: true,
    };
    // @ts-ignore
    mutation.mutate({ route: '/update_talk', data: mutateData },
      {
        onSuccess: (response: any) => {
          const deletedTalk: any = initTalk;
          deletedTalk.Comment = response.Talk.Comment;
          // setInitTalk(deletedTalk);
          postRefetch();
          // initTalk.Comment = response.Talk.Comment;
          refetch();
        }
      });
  };

  return (
    <IconButton aria-label="delete" onClick={deleteComment} size="small" style={{ color: themeColors.linkColor }}>
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteTalk;
