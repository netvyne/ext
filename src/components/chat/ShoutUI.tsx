/* eslint-disable indent */
import {
    Box, Button, Grid, Typography
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { DateTime } from 'luxon';
import React from 'react';
import { Shout } from '../../../types/common/types';
import './styles.scss';

interface Props{
    initLatestShout : Shout,
    clickHandler: any
}

const ShoutUI = ({
 initLatestShout, clickHandler
} : Props) => {
  let shout : any = '';
  if (initLatestShout && initLatestShout.Comment) {
    shout = (
      <div>
        <Typography variant="h5">Latest Comment</Typography>
        <div className="comment">
          <Grid item className="comment-author">
            <Grid item><b>{`${initLatestShout.Author.UserName}`}</b></Grid>
            <Grid item component={Box} fontSize="15px">
              <Grid container direction="row" alignItems="center">
                <Grid item>
                  <AccessTimeIcon style={{ fill: 'grey' }} fontSize="inherit" />
                </Grid>
                <Grid item component={Box} style={{ color: 'grey' }} fontStyle="italic">
                  {DateTime.fromISO(initLatestShout.CreatedAt.toString(), { zone: 'utc' }).toRelative()}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <div>{initLatestShout.Comment}</div>
        </div>
        <Button className="view-all-comments" variant="contained" color="primary" fullWidth onClick={(event : any) => clickHandler(event, initLatestShout.WebsiteID)}>
          View all comments
        </Button>
      </div>
    );
  }

  return <CssBaseline>{shout}</CssBaseline>;
};

export default ShoutUI;
