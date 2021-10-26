import {
  Box,
  Button, Dialog, DialogActions, DialogContent, DialogTitle
} from '@material-ui/core';
import { DateTime } from 'luxon';
import React from 'react';
import { useMutation, useQuery } from 'react-query';

interface GetUserKarmaQuery {
    KarmaMap: Map<string, number>;
    CreatedAt: DateTime
}

interface Props {
    userKarmaOpen: boolean
    toggleUserKarmaOpen: any
    userName: string
}

export default function UserKarma({ userKarmaOpen, toggleUserKarmaOpen, userName }: Props) {
  const { data, status } = useQuery<GetUserKarmaQuery, string>(
    `/get_user_karma?user_name=${userName}`, { enabled: userKarmaOpen }
  );
  let karma;
  let memberSince = 'N/A';
  if (status === 'error') {
    karma = <div>Error</div>;
  } else if (status === 'loading') {
    karma = <div>Loading</div>;
  } else if (status === 'success') {
    karma = Object.entries(data!.KarmaMap).map((value: [string, number]) => (
      <div>
        {value[0]}
        {' '}
        :
        {' '}
        {value[1]}
      </div>
    ));
    memberSince = DateTime.fromISO(data!.CreatedAt.toString(), { zone: 'local' }).toLocaleString(DateTime.DATE_FULL);
  }
  const blockUserMutation = useMutation({});
  const onBlockUser = async (event: any) => {
    event.preventDefault();
    const mutateData = {
      UserName: userName
    };
    const res = blockUserMutation.mutate(
      // @ts-ignore
      {
        route: '/post_block_user',
        data: mutateData,
      },
      {
        onSuccess: () => {
          console.log('successful block');
        },
      },
    );
    return res;
  };
  return (
    <Dialog
      open={userKarmaOpen}
      onClose={toggleUserKarmaOpen}
      aria-labelledby="user-karma"
    >
      <DialogTitle id="user-karma">
        {userName}
        {' '}
        Karma
      </DialogTitle>
      <DialogContent>
        <Box>
          {karma}
        </Box>
        <Box>
          Member Since:
          {' '}
          {memberSince}
        </Box>
        <Button onClick={onBlockUser}> Block User </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => toggleUserKarmaOpen()} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
