// import { Tooltip, Typography } from '@material-ui/core';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import { Website } from '../../../types/common/types';

interface Props {
  website: Website;
  // setWebsite: any;
  postVote: any;
  // saved: boolean;
  // onSaveItem: any;
  // setShowShare: any;
  // showShare: boolean;
  // url: any;
  themeColors: any;
}

// const ActionUI = ({
//   website, setWebsite, postVote, saved, onSaveItem,
//   setShowShare, showShare, url
// } : Props) => {
const ActionUI = ({
  website, postVote, themeColors
} : Props) => {
  const actionbox = (
    <Box height="60px">
      <Grid container wrap="nowrap" justifyContent="center" style={{ alignItems: 'center' }}>
        <Grid item component={IconButton} value="1" onClick={postVote} sx={{ display: 'flex', flexDirection: 'column' }}>
          <ThumbUpIcon
            style={{ color: website.VoteStatus === 1 ? 'green' : 'grey' }}
          />
          <Typography style={{ color: themeColors.commentText }}>
            {(website?.Upvotes) ? website.Upvotes : 0}
          </Typography>
        </Grid>
        <Grid item component={IconButton} value="-1" onClick={postVote} sx={{ display: 'flex', flexDirection: 'column' }}>
          <ThumbDownIcon
            style={{ color: website.VoteStatus === -1 ? 'red' : 'grey' }}
          />
          <Typography style={{ color: themeColors.commentText }}>
            {(website?.Downvotes) ? website.Downvotes : 0}
          </Typography>
        </Grid>
        {/* <Grid item>
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
        </Grid> */}
      </Grid>
    </Box>
  );

  return <CssBaseline>{actionbox}</CssBaseline>;
};

export default ActionUI;
