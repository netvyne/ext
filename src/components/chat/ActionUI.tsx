import { Switch, Tooltip, Typography } from '@material-ui/core';
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
import SharePublicDialog from './SharePublicDialog';

interface Props {
  website: Website;
  postVote: any;
  saved: boolean;
  onSaveItem: any;
}

const ActionUI = ({
  website, postVote, saved, onSaveItem,
} : Props) => {
  const [showShare, setShowShare] = React.useState(false);
  const actionbox = (
    <Box>
      <Grid container wrap="nowrap" justify="space-around">
        <Grid item component={IconButton} value="1" onClick={postVote}>
          <KeyboardArrowUpIcon
            color={
              website.VoteStatus === 1 ? 'primary' : 'secondary'
            }
          />
        </Grid>
        {website.Karma > 0 && (<Typography>{website.Karma}</Typography>)}
        <Grid item component={IconButton} value="-1" onClick={postVote}>
          <KeyboardArrowDownIcon
            color={
              website.VoteStatus === -1 ? 'primary' : 'secondary'
            }
          />
        </Grid>
        <Grid className="action-items">
          <SharePublicDialog
            open={showShare}
            handleClose={() => setShowShare(false)}
            website={website}
          />
          <Box>
            <Tooltip title="Unlisted">
              <LinkIcon />
            </Tooltip>
            <Switch
              size="small"
              checked={website.Public}
              disabled={website.Public}
              onChange={() => { setShowShare(true); }}
              name="visibility"
            />
            <Tooltip title="Public">
              <PublicIcon />
            </Tooltip>
          </Box>
        </Grid>
        <Grid className="action-items">
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
      </Grid>
    </Box>
  );

  return <CssBaseline>{actionbox}</CssBaseline>;
};

export default ActionUI;
