/* eslint-disable linebreak-style */
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import GavelIcon from '@material-ui/icons/Gavel';
import { DateTime } from 'luxon';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Shout, User } from '../../../types/common/types';
import ReplyUI from './ReplyUI';
import './styles.scss';
import UserKarma from './UserKarma';

interface Props {
  treeRoot: Shout;
  postComment: any;
  setComment: any;
  comment : string;
  showForm: any;
  setShowForm: any;
  defUser: User;
  url: URL;
  replyUI: any;
  saved: boolean;
  onSaveItem: any;
  shoutVoteUI: any;
  innerContent: any;
  reg: boolean;
  focus: number;
}

const ShoutTreeUI = ({
  treeRoot, postComment, setComment,
  comment, showForm, setShowForm, defUser, url, replyUI, saved,
  onSaveItem, shoutVoteUI, innerContent, reg, focus
} : Props) => {
  const [user] = React.useState<User>(defUser);
  const [root, setRoot] = React.useState<Shout>(treeRoot);
  const [clicked, setClicked] = React.useState(false);
  const [userKarmaOpen, setUserKarmaOpen] = React.useState(false);
  function toggleUserKarmaOpen() {
    setUserKarmaOpen(!userKarmaOpen);
  }
  const color = treeRoot.Level % 2 === 0 ? '#eceff1' : '#fafafa';
  let content : any = '';
  if (root.ID === 0) {
    // Content is just children directly without a parent comment
    content = innerContent;
  } else {
    content = (
      <Grid
        container
        component={Box}
        bgcolor={
        root.ID === focus
          ? '#f5f77b'
          : color
      }
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
          >
            {/* <ShoutVoteButtons
              initShout={root}
            /> */}
          </Grid>

          <Grid container component={Box} m={1}>
            <Grid container component={Box} m={1} wrap="nowrap" spacing={1}>
              <Grid item component={Box} onClick={toggleUserKarmaOpen}>
                <Typography variant="body2" color={root.Author.UserName === user?.UserName ? 'primary' : 'textPrimary'}>
                  {root.Author.UserName}
                </Typography>
                <UserKarma
                  toggleUserKarmaOpen={toggleUserKarmaOpen}
                  userKarmaOpen={userKarmaOpen}
                  userName={root.Author.UserName}
                />
              </Grid>
              <Grid item component={Box}>
                {DateTime.fromISO(root.CreatedAt?.toString(), {
                  zone: 'utc',
                }).toRelative()}
              </Grid>
            </Grid>

            <Grid item component={Box}>
              <ReactMarkdown>{root.Comment}</ReactMarkdown>
            </Grid>

            <Grid container component={Box} m={1} wrap="nowrap" spacing={1}>
              <ReplyUI
                postComment={postComment}
                setComment={setComment}
                comment={comment}
                setShowForm={setShowForm}
                showForm={showForm}
              />
              {!root.Saved && reg && (
              <Box>
                <Button
                  disabled={clicked}
                  size="small"
                  onClick={(e) => {
                    onSaveItem(e, true);
                    setClicked(true);
                  }}
                >
                  SAVE
                  <BookmarkBorderIcon />
                </Button>
              </Box>
              )}
              {root.Saved && reg && (
              <Box>
                <Button
                  disabled={clicked}
                  size="small"
                  onClick={(e) => {
                    onSaveItem(e, false);
                    setClicked(true);
                  }}
                >
                  UNDO
                  <BookmarkBorderIcon />
                </Button>
              </Box>
              )}
              { (user?.Role === 'mod' || user?.Role === 'admin')
              && (
              <Button href={`${process.env.REACT_APP_MOD_URL}/shout/${root.ID}`} target="_blank">
                MOD
                {' '}
                <GavelIcon />
              </Button>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item component={Box}>
          {innerContent}
        </Grid>
      </Grid>
    );
  }
  // else {
  //   content = (
  //     <Grid item component={Box}>
  //       No comments
  //     </Grid>
  //   );
  // }

  return <CssBaseline>{content}</CssBaseline>;
};

export default ShoutTreeUI;
