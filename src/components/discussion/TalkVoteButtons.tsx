import React from 'react';
import Box from '@material-ui/core/Box';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useMutation } from 'react-query';
import { Talk } from '../../../types/common/types';

interface Props {
  initTalk: Talk;
}

export default function TalkVoteButtons({ initTalk }: Props) {
  const [talk, setTalk] = React.useState(initTalk);
  const mutation = useMutation({});
  const postVote = async (event: any) => {
    event.preventDefault();
    const data = {
      Status: event.currentTarget.value,
      TalkID: talk.ID,
    };
    // @ts-ignore
    // const res: any = mutation.mutate({ route: '/post_vote_talk', data });
    // setTalk(res.Talk);

    const res: any = mutation.mutate(
      // @ts-ignore
      {
        route: '/post_vote_talk',
        data,
      },
      {
        onSuccess: (response : any) => {
          setTalk(response.Talk);
          // window.location.reload();
        },
      },
    );
    return res;
  };

  return (
    // @ts-ignore
    <Grid component={Box} container alignItems="center" direction="column">
      <Button value="upvote" onClick={postVote}>
        <KeyboardArrowUpIcon
          color={
            talk.VoteStatus === 'upvote' ? 'primary' : 'secondary'
          }
        />
      </Button>
      <Box>{talk.Karma}</Box>
      <Button value="downvote" onClick={postVote}>
        <KeyboardArrowDownIcon
          color={
            talk.VoteStatus === 'downvote'
              ? 'primary'
              : 'secondary'
          }
        />
      </Button>
    </Grid>
  );
}
