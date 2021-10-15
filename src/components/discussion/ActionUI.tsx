import { Tooltip, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import LinkIcon from '@material-ui/icons/Link';
import PublicIcon from '@material-ui/icons/Public';
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
}

const ActionUI = ({
  website, setWebsite, postVote, saved, onSaveItem, setShowShare, showShare
} : Props) => {
  const actionbox = (
    <Box mx={2} borderTop={1}>
      <Grid container wrap="nowrap" justify="space-around" alignItems="center">
        <Grid item component={Box}>
          {website.Public
            ? <Tooltip title="Public"><PublicIcon fontSize="inherit" /></Tooltip>
            : <Tooltip title="Unlisted"><LinkIcon fontSize="inherit" /></Tooltip>}
        </Grid>
        <Grid item component={IconButton} value="1" onClick={postVote}>
          <KeyboardArrowUpIcon
            color={
              website.VoteStatus === 1 ? 'primary' : 'secondary'
            }
          />
        </Grid>
        <Typography>{website.VoteStatus + website.Karma}</Typography>
        <Grid item component={IconButton} value="-1" onClick={postVote}>
          <KeyboardArrowDownIcon
            color={
              website.VoteStatus === -1 ? 'primary' : 'secondary'
            }
          />
        </Grid>
        <Grid item alignItems="center">
          <PublishWebsite
            open={showShare}
            handleClose={() => setShowShare(false)}
            website={website}
            setWebsite={setWebsite}
          />
          <Box>
            {website.Public
              ? <Button onClick={() => { setShowShare(true); }}>+Tag</Button>
              : <Button onClick={() => { setShowShare(true); }}>Publish</Button>}
          </Box>
        </Grid>
        {!saved
              && (
              <Button
                onClick={(e) => {
                  onSaveItem(e, !saved);
                }}
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
