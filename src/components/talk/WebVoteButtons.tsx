import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import React from 'react';
import { useMutation } from 'react-query';
import { Website } from '../../../types/common/types';

interface Props {
  website: Website;
}

export default function WebVoteButtons({ website }: Props) {
  const [voteStatus, setVoteStatus] = React.useState(website.VoteStatus);
  const voteMutation = useMutation({});
  const onPostVote = async (e: any) => {
    e.preventDefault();
    const mutateData = {
      Status: parseInt(e.currentTarget.value, 10),
      URL: {
        Host: website.Host,
        Pathname: website.Pathname,
        Search: website.Search,
      },
      WebsiteID: website.ID,
    };
    const res: any = voteMutation.mutate(
      // @ts-ignore
      {
        route: '/post_vote_website',
        data: mutateData,
      },
      {
        onSuccess: (data: any) => {
          setVoteStatus(data.Website.VoteStatus);
        },
      },
    );
    return res;
  };
  return (
    // @ts-ignore
    <Grid container component={Box} alignItems="center" direction="row">
      <Button value="1" onClick={onPostVote} size="small">
        <ArrowUpwardIcon
          color={
            voteStatus === 1 ? 'primary' : 'secondary'
          }
        />
      </Button>
      <Typography>{website.Karma + voteStatus}</Typography>
      <Button value="-1" onClick={onPostVote} size="small">
        <ArrowDownwardIcon
          color={
            voteStatus === -1 ? 'primary' : 'secondary'
          }
        />
      </Button>
    </Grid>
  );
}
