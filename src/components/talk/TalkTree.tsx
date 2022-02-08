/* eslint-disable max-len */
import {
  Avatar, Box, CssBaseline, Grid, Typography
} from '@mui/material';
import { DateTime } from 'luxon';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Post, Talk, User } from '../../../types/common/types';
import { formatImageURL } from '../../utils';
import DeleteTalk from './DeleteTalk';
import LeaveReply from './LeaveReply';
import TalkVoteButtons from './TalkVoteButtons';

interface Props {
  treeRoot: Talk;
  post: Post;
  defUser: User;
  setShowTalkTree: any;
  postRefetch: any;
  themeColors: any;
}

const TalkTree = ({
  treeRoot, post, defUser, setShowTalkTree, postRefetch, themeColors
}: Props) => {
  let focus = -1;
  if (window.location.search.includes('tfocus')) {
    const urlParams = new URLSearchParams(window.location.search);
    focus = parseInt(urlParams.get('tfocus') as string, 10);
  }
  const children = treeRoot.Children.map((talk: Talk) => (
    <TalkTree treeRoot={talk} key={talk.ID} post={post} defUser={defUser} setShowTalkTree={setShowTalkTree} postRefetch={postRefetch} themeColors={themeColors} />
  ));

  const color = treeRoot.Level % 2 === 0 ? themeColors.commentParent : themeColors.commentChild;
  const content = (
    <Grid
      container
      component={Box}
      bgcolor={treeRoot.ID === focus
        ? '#f5f77b'
        : color}
      padding={1}
      borderRadius="borderRadius"
      direction="column"
      style={{ marginBottom: '5px' }}
      color={themeColors.commentText}
    >
      <Grid
        container
        direction="row"
        wrap="nowrap"
      >
        {treeRoot.Author.AvatarPath && (
          <Avatar
            alt="Notification"
            src={formatImageURL(treeRoot.Author.AvatarPath)}
          />
        )}
        {!treeRoot.Author.AvatarPath && (
          <Avatar
            alt="Notification"
          >
            {treeRoot.Author.Handle.charAt(0).toUpperCase()}
          </Avatar>
        )}
        <Grid
          container
          component={Box}
          marginLeft="8px"
        >
          <Grid container alignItems="center">
            <Grid item component={Box}>
              <Typography variant="subtitle2">
                {treeRoot.Author.FirstName}
                {' '}
                {treeRoot.Author.LastName}
              </Typography>
            </Grid>
            {treeRoot.CreatedAt && (
              <Grid item component={Box} pl={1}>
                <Typography variant="caption">
                  {DateTime.fromISO(treeRoot.CreatedAt.toString(), {
                    zone: 'utc',
                  }).toRelative()}
                </Typography>
              </Grid>
            )}
          </Grid>

          <Grid item component={Box}>
            <ReactMarkdown components={{
              p: (props) => <div {...props} />
            }}
            >
              {treeRoot.Comment}

            </ReactMarkdown>
          </Grid>

          <Grid
            container
            alignItems="center"
            style={{ display: 'flex', flexDirection: 'row' }}
          >
            <Grid item style={{ width: '100%' }}>
              <Grid
                item
                style={{
                  display: 'flex', flexDirection: 'row', width: 'fit-content', float: 'left'
                }}
              >
                <TalkVoteButtons
                  initTalk={treeRoot}
                  defUser={defUser}
                />
                {defUser.Handle === treeRoot.Author.Handle
                && (
                  <DeleteTalk
                    initTalk={treeRoot}
                    postRefetch={postRefetch}
                  />
                )}
              </Grid>
              <LeaveReply parent={treeRoot} post={post} postRefetch={postRefetch} themeColors={themeColors} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item component={Box}>
        {children}
      </Grid>
    </Grid>
  );

  return <CssBaseline>{content}</CssBaseline>;
};

export default TalkTree;
