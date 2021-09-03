import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React from 'react';
import { Website } from '../../../types/common/types';

interface Props {
  website: Website;
  postVote: any;
  saved: boolean;
  onSaveItem: any;
}

const ActionUI = ({
  website, postVote, saved, onSaveItem,
} : Props) => {
  const actionbox = (
    <Box mx={2} borderTop={1}>
      <Grid container wrap="nowrap" justify="space-around">
        <Grid item component={IconButton} value="upvote" onClick={postVote}>
          <KeyboardArrowUpIcon
            color={
              website.VoteStatus === 1 ? 'primary' : 'secondary'
            }
          />
        </Grid>
        <Grid item component={IconButton} value="downvote" onClick={postVote}>
          <KeyboardArrowDownIcon
            color={
              website.VoteStatus === -1 ? 'primary' : 'secondary'
            }
          />
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
