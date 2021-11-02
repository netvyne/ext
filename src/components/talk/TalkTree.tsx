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
  const [initTalk, setInitTalk] = React.useState<Talk>(treeRoot);
  let focus = -1;
  if (window.location.search.includes('tfocus')) {
    const urlParams = new URLSearchParams(window.location.search);
    focus = parseInt(urlParams.get('tfocus') as string, 10);
  }
  const children = initTalk.Children.map((talk: Talk) => (
    <TalkTree treeRoot={talk} key={talk.ID} post={post} defUser={defUser} setShowTalkTree={setShowTalkTree} />
  ));

  const color = initTalk.Level % 2 === 0 ? '#eceff1' : '#fafafa';
  const content = (
    <Grid
      container
      component={Box}
      bgcolor={initTalk.ID === focus
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
                {initTalk.Author.FirstName}
                {' '}
                {initTalk.Author.LastName}
              </Typography>
            </Grid>
            {initTalk.CreatedAt && (
              <Grid item component={Box} pl={1}>
                <Typography variant="caption">
                  {DateTime.fromISO(initTalk.CreatedAt.toString(), {
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
              {initTalk.Comment}

            </ReactMarkdown>
          </Grid>

          <Grid
            container
            alignItems="center"
          >
            <Grid item>
              <TalkVoteButtons
                initTalk={initTalk}
                defUser={defUser}
              />
            </Grid>
            <Grid item>
              <LeaveReply parent={initTalk} post={post} />
            </Grid>
            {defUser.Handle === initTalk.Author.Handle
              && (
                <DeleteTalk
                  initTalk={initTalk}
                  setInitTalk={setInitTalk}
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
