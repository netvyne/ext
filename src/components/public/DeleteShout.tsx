// import { IconButton } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { Shout } from '../../../types/common/types';

interface Props {
  initShout: Shout;
  setRoot: any;
}
interface GetShoutTreeQuery {
  Roots: Shout[];
}
const DeleteShout = ({ initShout, setRoot }: Props) => {
  const mutation = useMutation({});
  const { refetch } = useQuery<GetShoutTreeQuery, string>(
    `/get_talk_trees?post_id=${initShout?.ID}`, { enabled: false }
  );
  const deleteComment = async (event: any) => {
    event.preventDefault();
    const mutateData = {
      ShoutID: initShout.ID,
      Delete: true,
    };

    const res = mutation.mutate(
      // @ts-ignore
      {
        route: '/update_shout',
        data: mutateData,
      },
      {
        onSuccess: (response : any) => {
          setRoot(response.Shout);
          refetch();
        },
      },
    );
    return res;
  };

  return (
    <IconButton aria-label="delete" onClick={deleteComment} size="small">
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteShout;
