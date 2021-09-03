/* eslint-disable linebreak-style */
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { DateTime } from 'luxon';
import React from 'react';
import { Shout, User } from '../../../types/common/types';
import ReplyUI from './ReplyUI';
import ShoutVoteButtons from './ShoutVoteUI';

interface Props {
  treeRoot: Shout;
  postComment: any;
  setComment: any;
  comment : string;
  showForm: any;
  setShowForm: any;
  user: User;
  url: URL;
  replyUI: any;
  saved: boolean;
  onSaveItem: any;
  shoutVoteUI: any;
}

const ShoutTreeUI = ({
  treeRoot, postComment, setComment,
  comment, showForm, setShowForm, user, url, replyUI, saved, onSaveItem, shoutVoteUI
} : Props) => {
  const color = treeRoot.Level % 2 === 0 ? '#eceff1' : '#fafafa';
  let content : any = '';
  if (treeRoot !== null) {
    content = (
      <Grid
        container
        component={Box}
        bgcolor={color}
        padding={1}
        m={1}
        borderRadius="borderRadius"
        direction="column"
      >
        <Grid container direction="row" wrap="nowrap">
          {/* @ts-ignore */}
          <Grid
            component={Box}
            container
            alignItems="center"
            direction="column"
            xs={1}
            p={1}
            mr={4}
          >
            {shoutVoteUI}
          </Grid>

          <Grid container component={Box} m={1}>
            <Grid container component={Box} m={1} wrap="nowrap" spacing={1}>
              <Grid item component={Box}>
                {treeRoot.Author.UserName}
              </Grid>
              <Grid item component={Box}>
                {DateTime.fromISO(treeRoot.CreatedAt.toString(), {
                  zone: 'utc',
                }).toRelative()}
              </Grid>
            </Grid>

            <Grid item component={Box}>
              {treeRoot.Comment}
            </Grid>

            <Grid container component={Box} m={1} wrap="nowrap" spacing={1}>
              <ReplyUI
                postComment={postComment}
                setComment={setComment}
                comment={comment}
                setShowForm={setShowForm}
                showForm={showForm}
              />
              {!saved && (
                <Box>
                  <Button
                    size="small"
                    onClick={(e) => {
                      onSaveItem(e, true);
                    }}
                  >
                    SAVE
                    <BookmarkBorderIcon />
                  </Button>
                </Box>
              )}
              {saved && (
                <Box>
                  <Button
                    size="small"
                    onClick={(e) => {
                      onSaveItem(e, false);
                    }}
                  >
                    UNDO
                    <BookmarkBorderIcon />
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    content = (
      <Grid item component={Box}>
        No comments
      </Grid>
    );
  }

  return <CssBaseline>{content}</CssBaseline>;
};

export default ShoutTreeUI;
