import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { Talk } from '../../../types/common/types';

interface Props {
  initTalk: Talk;
  setShowTalkTree: any;
}
interface GetTalkTreeQuery {
  Roots: Talk[];
}
const DeleteTalk = ({ initTalk, setShowTalkTree }: Props) => {
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
        onSuccess: () => {
          refetch();
          setShowTalkTree(false);
        }
      });
  };

  return (
    <IconButton aria-label="delete" onClick={deleteComment} size="small">
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteTalk;