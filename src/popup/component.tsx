import React, { FunctionComponent, useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { browser } from 'webextension-polyfill-ts';
// import WebFont from 'webfontloader';
import { Sharing } from '@src/components/sharing';
import { Discussion } from '@src/components/discussion';
import Chat from '@src/components/discussion/Chat';
import Shares from '@src/components/discussion/Shares';
// import { Capture } from '@src/components/capture';
import { Notifications } from '@src/components/notifications';
// import { Chat } from '@src/components/chat';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { QueryClientProvider } from 'react-query';
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';
import { User } from '../../types/common/types';
// import {
//   Row, Col, Button, Nav,
// } from 'react-bootstrap';

import { queryClient } from '../query';

import { getCurrentUser } from '../auth/auth';
import { isValidURL } from '../utils';
import './styles.scss';

// // // //
interface TabPanelProps {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
  index: any;
  value: any;
  // eslint-disable-next-line react/require-default-props
  className?: any;
}

function TabPanel(props : any) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
      <Box>
        <Typography>{children}</Typography>
      </Box>
      )}
    </div>
  );
}

// TabPanel.propTypes = {
//   // eslint-disable-next-line react/require-default-props
//   children: PropTypes.node,
//   // eslint-disable-next-line react/forbid-prop-types
//   index: PropTypes.any.isRequired,
//   // eslint-disable-next-line react/forbid-prop-types
//   value: PropTypes.any.isRequired,
//   // eslint-disable-next-line react/forbid-prop-types
//   dir: PropTypes.any.isRequired,
//   // eslint-disable-next-line react/require-default-props
//   className: PropTypes.node,
// };

function a11yProps(index : any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 'auto',
  },
  tab: {
    padding: '10px',
    '& .MuiBox-root-10': {
      padding: '10px',
    },
    margin: '16px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
  },
}));

export const Popup: FunctionComponent = () => {
  // WebFont.load({
  //   google: {
  //     families: ['Montserrat'],
  //   },
  // });

  const [user, setUser] = React.useState<User|any>();
  getCurrentUser().then((currentUser:User|any) => setUser(currentUser));
  const [url, setUrl] = useState<any>({});
  // Sends the `popupMounted` event
  React.useEffect(() => {
    browser.runtime.sendMessage({ popupMounted: true });
  }, []);

  function clickHandler(e : any) {
    // console.log(event);
    // window.location.href = 'http://www.w3schools.com';
    e.preventDefault();
    chrome.tabs.create({ url: `${process.env.PUBLIC_WEB}/profile`, active: false });
    return false;
  }

  useEffect(() => {
    const queryInfo = { active: true };
    if (chrome.tabs) {
      chrome.tabs.query(queryInfo, (tabs) => {
        const newUrl : any = isValidURL(tabs[0].url);
        const formatedUrl = {
          pathname: newUrl.pathname,
          host: newUrl.host,
          search: newUrl.search,
          Title: tabs[0].title,
        };
        setUrl(formatedUrl);
      });
    }
  }, []);

  const classes = useStyles();
  // const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const handleChange = (event : any, newValue : any) => {
    console.log('newValue', newValue);
    console.log('event', event);
    setValue(newValue);
  };

  // Renders the component tree
  return (
    <QueryClientProvider client={queryClient}>
      <div className="popup-container">
        <div className="container mx-1 my-1">
          <AppBar position="static" color="default" elevation={1}>
            <Grid className="topbar">
              <Grid className="logo">
                <img src="../landscap-logo.png" alt="logo" />
              </Grid>
              <Tabs
                className="tabs"
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
                TabIndicatorProps={{
                  style: {
                    backgroundColor: '#9F00CF',
                  },
                }}
              >
                <Tab icon={<Avatar alt="World feed" src={value === 0 ? '../images/world_feed_selected.png' : '../images/world_feed_normal.png'} className="tabIcon" />} {...a11yProps(0)} />
                <Tab icon={<Avatar alt="Conversation" src={value === 1 ? '../images/conversation_selected.png' : '../images/conversation_normal.png'} className="tabIcon" />} {...a11yProps(1)} />
                <Tab icon={<Avatar alt="Home" src={value === 2 ? '../images/home_selected.png' : '../images/home_normal.png'} className="tabIcon" />} {...a11yProps(2)} />
                <Tab icon={<Avatar alt="Share" src={value === 3 ? '../images/share_selected.png' : '../images/share_normal.png'} className="tabIcon" />} {...a11yProps(3)} />
                <Tab icon={<Avatar alt="Notification" src={value === 4 ? '../images/notification_selected.png' : '../images/notification_normal.png'} className="tabIcon" />} {...a11yProps(4)} />
              </Tabs>
            </Grid>
          </AppBar>

          <TabPanel value={value} index={0} dir={theme.direction} className={classes.tab}>
            <Discussion initCurrentUser={user} initUrl={url} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction} className={classes.tab}>
            <Chat initCurrentUser={user} />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction} className={classes.tab}>
            <Shares />
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <Sharing />
          </TabPanel>
          <TabPanel value={value} index={4} dir={theme.direction}>
            Notification
          </TabPanel>
          {/* <TabPanel value={value} index={2} dir={theme.direction}>
            <Chat initCurrentUser={user} />
          </TabPanel> */}
        </div>
      </div>
    </QueryClientProvider>
  );
};
