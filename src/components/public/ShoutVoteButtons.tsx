import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import React from 'react';
import { useMutation } from 'react-query';
import { Shout, User } from '../../../types/common/types';
import VoteTotal from '../common/VoteTotal';
import './styles.scss';

interface Props {
  initShout: Shout;
  defUser: User;
}

export default function ShoutVoteButtons({ initShout, defUser }: Props) {
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
        <ArrowUpwardIcon
          key={shout.VoteStatus}
          style={{ color: shout.VoteStatus === 1 ? 'green' : 'grey' }}
        />
      </Button>
      <VoteTotal
        total={shout.Karma + shout.VoteStatus}
        hidden={shout.Author.UserName !== defUser.UserName}
      />
      <Button value="-1" onClick={onPostVote} className="vote-buttons">
        <ArrowDownwardIcon
          key={shout.VoteStatus}
          style={{ color: shout.VoteStatus === -1 ? 'red' : 'grey' }}
        />
      </Button>
    </Grid>
  );
}
