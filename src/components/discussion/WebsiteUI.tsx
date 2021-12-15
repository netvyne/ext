import {
  Box, CssBaseline, Grid, Typography
} from '@mui/material';
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
  // websiteTitle = (currentTitle !== websiteTitle) ? currentTitle : websiteTitle;
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
        </Grid>
      </Grid>
    </Box>
  );

  return <CssBaseline>{website}</CssBaseline>;
};

export default WebsiteUI;
