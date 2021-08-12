import { Box } from '@material-ui/core';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { useQuery } from 'react-query';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import WebsiteBox from './WebsiteBox';
import ActionBox from './ActionBox';
import ShoutTree from './ShoutTree';
import LeaveReply from './LeaveReply';

import {
  User, Shout, Website, Url,
} from '../../../types/common/types';
import './styles.scss';

interface GetUserQuery {
  initCurrentUser: User[];
  initUrl: Url
}

interface GetShoutTreesQuery {
  Roots: Shout[];
  initWebsite: Website;
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 'auto',
  },
}));

// export const Discussion: FunctionComponent = () => {
const Discussion = ({ initCurrentUser, initUrl } : GetUserQuery) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const classes = useStyles();
  const url : any = initUrl;
  const user : any = initCurrentUser;

  const route = `/get_shout_trees?host=${url.host}&pathname=${url.pathname}&search=${encodeURIComponent(url.search)}`;

  const { data, status } = useQuery<any, string>(route);
  let children;
  let website;
  let trees;
  let actionBox;
  if (status === 'error') {
    website = <div>Error</div>;
    children = null;
  } else if (status === 'loading') {
    website = (
      <Grid
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Grid>
    );
    children = null;
  } else {
    website = (
      <>
        <WebsiteBox initWebsite={data.Website} url={url} />
        <ActionBox initWebsite={data.Website} reg={user?.Registered} url={url} />
        <LeaveReply website={data.Website} url={url} />
      </>
    );
    if (data.Roots) {
      if (data.Roots.length > 0) {
        trees = data.Roots.map((treeRoot : any) => (
          <ShoutTree
            website={data.Website}
            treeRoot={treeRoot}
            // reg={false}
            reg={!user?.Registered}
            url={url}
          />
        ));
      } else {
        trees = (
          <Grid item component={Box}>
            No comments
          </Grid>
        );
      }
    } else {
      trees = (
        <Grid item component={Box}>
          No comments
        </Grid>
      );
    }
  }
  return (
    <Box>
      <div className="discussion-container">
        {website}
        {trees}
      </div>
    </Box>
  );
};
export default Discussion;
