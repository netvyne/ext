import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React from 'react';
import { Shout } from '../../../types/common/types';
import './styles.scss';

interface Props {
  shout: Shout;
  postVote: any;
}

export default function ShoutVoteUI({ shout, postVote } : Props) {
  return (
    // @ts-ignore
    <Grid component={Box} container alignItems="center" direction="column">
      <Button value="upvote" onClick={postVote} className="vote-bbuttons">
        <KeyboardArrowUpIcon
          color={
            shout.VoteStatus === 1 ? 'primary' : 'secondary'
          }
        />
      </Button>
      <Box>{shout.Karma}</Box>
      <Button value="downvote" onClick={postVote} className="vote-bbuttons">
        <KeyboardArrowDownIcon
          color={
            shout.VoteStatus === -1 ? 'primary' : 'secondary'
          }
        />
      </Button>
    </Grid>
  );
}
