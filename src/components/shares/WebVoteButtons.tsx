import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React from 'react';
import { useMutation } from 'react-query';
import { Website } from '../../../types/common/types';

interface Props {
  item: Website;
  setItem: any;
}

export default function WebVoteButtons({ item, setItem }: Props) {
  const voteMutation = useMutation({});
  const onPostVote = async (event: any) => {
    event.preventDefault();
    const data = {
      Status: event.currentTarget.value === 'upvote' ? 1 : -1,
      Host: item.Host,
      Pathname: item.Pathname,
      Search: item.Search,
      WebsiteID: item.ID,
    };
    const res: any = voteMutation.mutate(
      // @ts-ignore
      {
        route: '/post_vote_website',
        data,
      },
      {
        onSuccess: (response : any) => {
          setItem(response.Website);
          // window.location.reload();
        },
      },
    );
    return res;
  };

  return (
    // @ts-ignore
    <Grid container component={Box} alignItems="center" direction="row">
      <Button value="upvote" onClick={onPostVote}>
        <KeyboardArrowUpIcon
          color={
            item.VoteStatus === 1 ? 'primary' : 'secondary'
          }
        />
      </Button>
      <Box>{item.Karma}</Box>
      <Button value="downvote" onClick={onPostVote}>
        <KeyboardArrowDownIcon
          color={
            item.VoteStatus === -1 ? 'primary' : 'secondary'
          }
        />
      </Button>
    </Grid>
  );
}
