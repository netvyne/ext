import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import SentimentSatisfiedSharpIcon from '@material-ui/icons/SentimentSatisfiedSharp';
import ShareIcon from '@material-ui/icons/Share';
import React from 'react';
import { Url, Website } from '../../../types/common/types';

interface Props {
  initWebsite: Website;
  url: Url
}

const WebsiteUI = ({ initWebsite, url } : Props) => {
  let websiteTitle : string = '';
  websiteTitle = (initWebsite.Title && initWebsite.Title !== '') ? initWebsite.Title : url.Title;
  const website = (
    <Box mx={2} mt={1} borderRadius="borderRadius">
      <Grid container wrap="nowrap">
        <Grid container direction="column" alignItems="center" justify="center">
          <Box>
            <Typography variant="h5">
              {(websiteTitle && websiteTitle.length < 32)
                ? websiteTitle
                : websiteTitle.substring(0, 32).concat('...')}
            </Typography>
          </Box>
          <Grid container direction="row" justify="center" spacing={1}>
            <Grid
              item
              component={Box}
              display="flex"
              justify="center"
            >
              <KeyboardArrowUpIcon />
              {initWebsite?.Upvotes}
            </Grid>
            <Grid
              item
              component={Box}
              display="flex"
              justify="center"
            >
              <SentimentSatisfiedSharpIcon />
              {(initWebsite?.Upvotes + initWebsite?.Downvotes) > 0 ? (
                initWebsite?.Upvotes / initWebsite?.Upvotes
                + initWebsite?.Downvotes
              ).toLocaleString('en', { style: 'percent' }) : '0%'}
            </Grid>
            <Grid
              item
              component={Box}
              display="flex"
              // alignItems="center"
              justify="center"
            >
              <ChatBubbleOutlineIcon />
              {initWebsite?.ShoutCount}
            </Grid>
            <Grid
              item
              component={Box}
              display="flex"
              // alignItems="center"
              justify="center"
            >
              <ShareIcon />
              {initWebsite?.ShareCount}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );

  return <CssBaseline>{website}</CssBaseline>;
};

export default WebsiteUI;
