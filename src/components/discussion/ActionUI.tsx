// import { Tooltip, Typography } from '@material-ui/core';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ForumIcon from '@mui/icons-material/Forum';
import LinkIcon from '@mui/icons-material/Link';
import PublicIcon from '@mui/icons-material/Public';
import ShareIcon from '@mui/icons-material/Share';
import {
  Box, Button, CssBaseline,
  Grid, IconButton, Tooltip, Typography
} from '@mui/material';
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
  refetch: any;
  url: any;
  setShowChat: any;
}

const ActionUI = ({
  website, setWebsite, postVote, saved, onSaveItem,
  setShowShare, showShare, refetch, url, setShowChat
} : Props) => {
  const actionbox = (
    <Box mx={2} borderTop={1}>
      <Grid container wrap="nowrap" justifyContent="space-around" style={{ alignItems: 'center' }}>
        <Grid item component={Box}>
          {website.Public
            ? <Tooltip title="Public"><PublicIcon fontSize="inherit" /></Tooltip>
            : <Tooltip title="Unlisted"><LinkIcon fontSize="inherit" /></Tooltip>}
        </Grid>
        <Grid item component={IconButton} value="1" onClick={postVote}>
          <ArrowUpwardIcon
            style={{ color: website.VoteStatus === 1 ? 'green' : 'grey' }}
          />
        </Grid>
        <Typography>{website.VoteStatus + website.Karma}</Typography>
        <Grid item component={IconButton} value="-1" onClick={postVote}>
          <ArrowDownwardIcon
            style={{ color: website.VoteStatus === -1 ? 'red' : 'grey' }}
          />
        </Grid>
        <Grid container item style={{ alignItems: 'center' }}>
          <PublishWebsite
            open={showShare}
            handleClose={() => setShowShare(false)}
            website={website}
            setWebsite={setWebsite}
            initUrl={url}
          />
          <Box>
            {website.Public
              ? <Button onClick={() => { setShowShare(true); }} sx={{ color: 'black' }}>+Tag</Button>
              : <Button onClick={() => { setShowShare(true); }} sx={{ color: 'black' }}>Publish</Button>}
          </Box>
        </Grid>
        <Grid
          item
          component={Box}
          display="flex"
          style={{ justifyContent: 'center', marginRight: '10px', cursor: 'pointer' }}
        >
          <Tooltip title="Live Chat">
            <ForumIcon onClick={() => setShowChat(true)} />
          </Tooltip>
        </Grid>
        <Grid
          item
          component={Box}
          display="flex"
          style={{ justifyContent: 'center', marginRight: '10px' }}
        >
          <ChatBubbleOutlineIcon />
          {website?.ShoutCount}
        </Grid>
        <Grid
          item
          component={Box}
          display="flex"
          style={{ justifyContent: 'center', marginRight: '10px' }}
        >
          <ShareIcon />
          {website?.ShareCount}
        </Grid>
        {!saved
              && (
              <Button
                onClick={(e) => {
                  onSaveItem(e, !saved);
                }}
                sx={{ color: 'black' }}
              >
                SAVE
                <BookmarkBorderIcon />
              </Button>
              )}
        {saved && (
          <Grid item component={Box}>
            <Button
              onClick={(e) => {
                onSaveItem(e, !saved);
              }}
              sx={{ color: 'black' }}
            >
              UNDO
              <BookmarkBorderIcon />
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );

  return <CssBaseline>{actionbox}</CssBaseline>;
};

export default ActionUI;
