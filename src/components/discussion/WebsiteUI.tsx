import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { Url, Website } from '../../../types/common/types';

interface Props {
  initWebsite: Website;
  url: Url;
  refetch: any;
  currentTitle: any;
}

const WebsiteUI = ({
  initWebsite, url, refetch, currentTitle
} : Props) => {
  let websiteTitle : string = '';
  websiteTitle = (initWebsite.Title && initWebsite.Title !== '') ? initWebsite.Title : url.Title;
  websiteTitle = (currentTitle !== websiteTitle) ? currentTitle : websiteTitle;
  const website = (
    <Box mx={2} mt={1} borderRadius="borderRadius">
      <Grid container wrap="nowrap">
        <Grid container direction="column" style={{ alignItems: 'center' }} justifyContent="center">
          <Box>
            <Typography variant="h5">
              {(websiteTitle && websiteTitle.length > 32)
                ? websiteTitle.substring(0, 32).concat('...')
                : (websiteTitle) || 'Title of the webpage'}
            </Typography>
          </Box>
          {/* <Grid container direction="row" justifyContent="center" spacing={1}>
            <Grid
              item
              component={Box}
              display="flex"
              style={{ justifyContent: 'center' }}
            >
              <KeyboardArrowUpIcon />
              {initWebsite?.Upvotes}
            </Grid>
            <Grid
              item
              component={Box}
              display="flex"
              style={{ justifyContent: 'center' }}
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
              style={{ justifyContent: 'center' }}
            >
              <ChatBubbleOutlineIcon />
              {initWebsite?.ShoutCount}
            </Grid>
            <Grid
              item
              component={Box}
              display="flex"
              style={{ justifyContent: 'center' }}
            >
              <ShareIcon />
              {initWebsite?.ShareCount}
            </Grid>
          </Grid> */}
        </Grid>
      </Grid>
    </Box>
  );

  return <CssBaseline>{website}</CssBaseline>;
};

export default WebsiteUI;
