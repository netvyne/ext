/* eslint-disable max-len */
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { DateTime } from 'luxon';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Post, Talk, User } from '../../../types/common/types';
import DeleteTalk from './DeleteTalk';
import LeaveReply from './LeaveReply';
import TalkVoteButtons from './TalkVoteButtons';

interface Props {
  treeRoot: Talk;
  post: Post;
  defUser: User;
  setShowTalkTree: any;
}

const TalkTree = ({
  treeRoot, post, defUser, setShowTalkTree
}: Props) => {
  let focus = -1;
  if (window.location.search.includes('tfocus')) {
    const urlParams = new URLSearchParams(window.location.search);
    focus = parseInt(urlParams.get('tfocus') as string, 10);
  }
  const children = treeRoot.Children.map((talk: Talk) => (
    <TalkTree treeRoot={talk} key={talk.ID} post={post} defUser={defUser} setShowTalkTree={setShowTalkTree} />
  ));

  const color = treeRoot.Level % 2 === 0 ? '#eceff1' : '#fafafa';
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
    >
      <Grid
        container
        direction="row"
        wrap="nowrap"
      >
        <Grid
          container
          component={Box}
          m={1}
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
          >
            <Grid item>
              <TalkVoteButtons
                initTalk={treeRoot}
                defUser={defUser}
              />
            </Grid>
            <Grid item>
              <LeaveReply parent={treeRoot} post={post} />
            </Grid>
            {defUser.Handle === treeRoot.Author.Handle
              && (
                <DeleteTalk
                  initTalk={treeRoot}
                  setShowTalkTree={setShowTalkTree}
                />
              )}
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
