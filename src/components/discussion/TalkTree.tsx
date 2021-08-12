import React from 'react';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { DateTime } from 'luxon';
import ReactMarkdown from 'react-markdown';
import Grid from '@material-ui/core/Grid';
import TalkVoteButtons from './TalkVoteButtons';
import TalkLeaveReply from './TalkLeaveReply';
import { Talk } from '../../../types/common/types';

interface Props {
  treeRoot: Talk;
}

const TalkTree = ({ treeRoot }: Props) => {
  const children = treeRoot.Children.map((talk: Talk) => (
    <TalkTree treeRoot={talk} key={talk.ID} />
  ));

  const content = (
    <Grid
      container
      component={Box}
      bgcolor={treeRoot.Level % 2 === 0 ? '#eceff1' : '#fafafa'}
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
          <TalkVoteButtons
            initTalk={treeRoot}
          />
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
            {/* <Grid item component={Box}>
              {props.treeRoot.ID}
            </Grid> */}
          </Grid>

          <Grid item component={Box}>
            <ReactMarkdown>{treeRoot.Comment}</ReactMarkdown>
          </Grid>

          <Grid container component={Box} m={1} wrap="nowrap" spacing={1}>
            <TalkLeaveReply parent={treeRoot} />
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
