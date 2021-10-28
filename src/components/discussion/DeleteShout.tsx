import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { Shout } from '../../../types/common/types';

interface Props {
  initShout: Shout;
}
interface GetShoutTreeQuery {
  Roots: Shout[];
}
const DeleteShout = ({ initShout }: Props) => {
  const mutation = useMutation({});
  const { refetch } = useQuery<GetShoutTreeQuery, string>(
    `/get_talk_trees?post_id=${initShout?.ID}`, { enabled: false }
  );
  const deleteComment = async (event: any) => {
    event.preventDefault();
    const mutateData = {
      TalkID: initShout.ID,
      Delete: true,
    };
    // @ts-ignore
    mutation.mutate({ route: '/update_Shout', data: mutateData },
      {
        onSuccess: () => {
          refetch();
        }
      });
  };

  return (
    <IconButton aria-label="delete" onClick={deleteComment} size="small">
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteShout;
