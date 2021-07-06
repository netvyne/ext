import { Box } from '@material-ui/core';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
// import ChildBox from "./ChildBox";
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import WebsiteBox from './WebsiteBox';
import ActionBox from './ActionBox';
import ShoutTree from './ShoutTree';
import LeaveReply from './LeaveReply';
import Shares from './Shares';
import Chat from './Chat';

import {
  User, Shout, Website, Url,
} from '../../../types/common/types';
import { getCurrentUser } from '../../auth/auth';
import { isValidURL } from '../../utils';

interface GetUserQuery {
  initCurrentUser: User[];
  initUrl: Url
}

interface GetShoutTreesQuery {
  Roots: Shout[];
  initWebsite: Website;
}

interface TabPanelProps {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
  index: any;
  value: any;
  // eslint-disable-next-line react/require-default-props
  className?: any;
}

function TabPanel(props: TabPanelProps) {
  const {
    children, value, index, className, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    '& .MuiBox-root-45': {
      padding: '5px !important',
    },
  },
}));

// export const Discussion: FunctionComponent = () => {
const Discussion = ({ initCurrentUser, initUrl } : GetUserQuery) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

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
    website = <div>Loading</div>;
    children = null;
  } else {
    website = (
      <>
        <WebsiteBox initWebsite={data.Website} url={url} />
        <LeaveReply website={data.Website} url={url} />
      </>
    );
    actionBox = (
      <>
        <ActionBox initWebsite={data.Website} reg={user?.Registered} url={url} />
      </>
    );
    if (data.Roots) {
      trees = data.Roots.map((treeRoot : any) => (
        <ShoutTree
          website={data.Website}
          treeRoot={treeRoot}
          // reg={false}
          reg={!user?.Registered}
          url={url}
        />
      ));
    }
  }
  return (
    <Box>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Discussion" {...a11yProps(0)} />
            <Tab label="Talks" {...a11yProps(1)} />
            <Tab label="Chat" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} className={classes.tab}>
          {website}
          {actionBox}
          {trees}
        </TabPanel>
        <TabPanel value={value} index={1} className={classes.tab}>
          <Shares />
        </TabPanel>
        <TabPanel value={value} index={2} className={classes.tab}>
          <Chat initCurrentUser={user} />
        </TabPanel>
      </div>
    </Box>
  );
};
export default Discussion;
