import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Box, Button, Grid
} from '@mui/material';
import React from 'react';
import { useMutation } from 'react-query';
import { Shout } from '../../../types/common/types';
import './styles.scss';

interface Props {
  initShout: Shout;
}

export default function ShoutVoteButtons({ initShout }: Props) {
  const [shout, setShout] = React.useState(initShout);
  const voteMutation = useMutation({});
  const onPostVote = async (e: any) => {
    e.preventDefault();
    const mutateData = {
      Status: parseInt(e.currentTarget.value, 10),
      ShoutID: shout.ID,
    };
    const res: any = voteMutation.mutate(
      // @ts-ignore
      {
        route: '/post_vote_shout',
        data: mutateData,
      },
      {
        onSuccess: (data: any) => {
          setShout(data.Shout);
        },
      },
    );
    return res;
  };

  return (
    // @ts-ignore
    <Grid component={Box} container alignItems="center" direction="row">
      <Button value="1" onClick={onPostVote} className="vote-buttons">
        <KeyboardArrowUpIcon
          key={shout.VoteStatus}
          color={
            shout.VoteStatus === 1 ? 'primary' : 'secondary'
          }
        />
      </Button>
      <Box>{shout.Karma}</Box>
      <Button value="-1" onClick={onPostVote} className="vote-buttons">
        <KeyboardArrowDownIcon
          key={shout.VoteStatus}
          color={
            shout.VoteStatus === -1 ? 'primary' : 'secondary'
          }
        />
      </Button>
    </Grid>
  );
}
