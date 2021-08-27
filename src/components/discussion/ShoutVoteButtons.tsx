import React from 'react';
import Box from '@material-ui/core/Box';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Shout } from '../../../types/common/types';

interface Props {
  initShout: Shout;
}

export default function ShoutVoteButtons({ initShout } : Props) {
  const [shout, setShout] = React.useState(initShout);
  const postVote = async (event : any) => {
    event.preventDefault();
    const url = new URL(`${process.env.REACT_APP_PUBLIC_API}/post_vote_shout`);
    const init = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        Status: event.currentTarget.value === 'upvote' ? 1 : -1,
        ShoutID: shout.ID,
      }),
    };
    // @ts-ignore
    const res = await (await fetch(url, init)).json();
    setShout(res.Shout);
    return res;
  };

  return (
    // @ts-ignore
    <Grid component={Box} container alignItems="center" direction="column">
      <Button value="upvote" onClick={postVote}>
        <KeyboardArrowUpIcon
          color={
            shout.VoteStatus === 1 ? 'primary' : 'secondary'
          }
        />
      </Button>
      <Box>{shout.Karma}</Box>
      <Button value="downvote" onClick={postVote}>
        <KeyboardArrowDownIcon
          color={
            shout.VoteStatus === -1 ? 'primary' : 'secondary'
          }
        />
      </Button>
    </Grid>
  );
}
