import React from 'react';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { Button, Typography } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import SentimentSatisfiedSharpIcon from '@material-ui/icons/SentimentSatisfiedSharp';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ShareIcon from '@material-ui/icons/Share';
import Tooltip from '@material-ui/core/Tooltip';
import { Website, Url } from '../../../types/common/types';
import './styles.scss';

interface Props {
  initWebsite: Website;
  url: Url
}

const WebsiteBox = ({ initWebsite, url } : Props) => {
  let websiteTitle : string = '';
  websiteTitle = (initWebsite.Title && initWebsite.Title !== '') ? initWebsite.Title : url.Title;
  const webAddress = `${process.env.PUBLIC_WEB}/w/${initWebsite.ID}`;

  function clickHandler(e : any) {
    // console.log(event);
    // window.location.href = 'http://www.w3schools.com';
    e.preventDefault();
    chrome.tabs.create({ url: webAddress, active: false });
    return false;
  }

  const website = (
    <Box mx={2} mt={1} borderRadius="borderRadius" className="websitebox-container">
      <Grid container wrap="nowrap">
        <Grid container direction="column" alignItems="center" justify="center">
          <Box>
            <Typography variant="h5">
              {(websiteTitle && websiteTitle.length < 100)
                ? websiteTitle
                : websiteTitle.substring(0, 100).concat('...')}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  return <CssBaseline>{website}</CssBaseline>;
};

export default WebsiteBox;
