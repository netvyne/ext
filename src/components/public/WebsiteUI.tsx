// import ArrowUpward from '@mui/icons-material/ArrowUpward';
// import LinkIcon from '@mui/icons-material/Link';
// import PublicIcon from '@mui/icons-material/Public';
// import ReplyIcon from '@mui/icons-material/Reply';
// import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
// import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Url, Website } from '../../../types/common/types';

interface Props {
  initWebsite: Website;
  url: Url;
}

const WebsiteUI = ({
  initWebsite, url
} : Props) => {
  function clickTitle() {
    if (initWebsite && initWebsite.ID) {
      window.open(`${process.env.PUBLIC_WEB}/w/${initWebsite.ID}`, '_blank', 'noopener,noreferrer');
    }
    return false;
  }

  let websiteTitle : string = '';
  websiteTitle = (initWebsite?.Title && initWebsite?.Title !== '') ? initWebsite.Title : url?.Title;
  const website = (
    <Box mx={3} borderRadius="borderRadius" height="35px">
      <Grid container wrap="nowrap">
        <Grid
          container
          direction="column"
        >
          <Grid item component={Box} my={1}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                cursor: (initWebsite?.ID) ? 'pointer' : 'default'
              }}
              onClick={() => clickTitle()}
            >
              {(websiteTitle && websiteTitle.length > 32)
                ? websiteTitle.substring(0, 32).concat('...')
                : (websiteTitle)}
            </Typography>
          </Grid>
          {/* <Grid item component={Box} mx={10} borderTop={1} borderBottom={1}>
            <Grid container spacing={2} justifyContent="space-around">
              <Grid item>
                <ArrowUpward />
                {' '}
                {initWebsite.Karma + initWebsite.VoteStatus}
              </Grid>
              <Grid item>
                <SentimentSatisfiedAltIcon />
                {' '}
                {initWebsite.ApprovalRate}
                %
              </Grid>
              <Grid item>
                <ReplyIcon style={{ transform: 'scaleX(-1)' }} />
                {' '}
                {initWebsite.ShareCount}
              </Grid>
              <Grid item>
                {initWebsite.Public
                  ? <Tooltip title="Public"><PublicIcon fontSize="inherit" /></Tooltip>
                  : <Tooltip title="Unlisted"><LinkIcon fontSize="inherit" /></Tooltip>}
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
      </Grid>
    </Box>
  );

  return <CssBaseline>{website}</CssBaseline>;
};

export default WebsiteUI;
