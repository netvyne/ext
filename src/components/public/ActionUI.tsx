// import { Tooltip, Typography } from '@material-ui/core';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import IosShareIcon from '@mui/icons-material/IosShare';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import { Website } from '../../../types/common/types';
import PublishWebsite from './PublishWebsite';

interface Props {
  website: Website;
  setWebsite: any;
  postVote: any;
  saved: boolean;
  onSaveItem: any;
  setShowShare: any;
  showShare: boolean;
  url: any;
}

const ActionUI = ({
  website, setWebsite, postVote, saved, onSaveItem,
  setShowShare, showShare, url
} : Props) => {
  const actionbox = (
    <Box height="40px">
      <Grid container wrap="nowrap" justifyContent="space-around" style={{ alignItems: 'center' }}>
        <Grid item component={IconButton} value="1" onClick={postVote}>
          <ArrowUpwardIcon
            style={{ color: website.VoteStatus === 1 ? 'green' : 'grey' }}
          />
        </Grid>
        <Grid item component={IconButton} value="-1" onClick={postVote}>
          <ArrowDownwardIcon
            style={{ color: website.VoteStatus === -1 ? 'red' : 'grey' }}
          />
        </Grid>
        <Grid item>
          <PublishWebsite
            open={showShare}
            handleClose={() => setShowShare(false)}
            website={website}
            setWebsite={setWebsite}
            initUrl={url}
          />
          <Tooltip title="Share Publicly">
            <IosShareIcon onClick={() => { setShowShare(true); }} />
          </Tooltip>
        </Grid>
        <Grid item component={Box} mr={1}>
          <Tooltip title={saved ? 'Unsave' : 'Save'}>
            {saved
              ? (
                <BookmarkIcon
                  onClick={(e) => {
                    onSaveItem(e, !saved);
                  }}
                />
              ) : (
                <BookmarkBorderIcon
                  onClick={(e) => {
                    onSaveItem(e, !saved);
                  }}
                />
              )}
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );

  return <CssBaseline>{actionbox}</CssBaseline>;
};

export default ActionUI;
