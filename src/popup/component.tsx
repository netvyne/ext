import React, { FunctionComponent, useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { browser } from 'webextension-polyfill-ts';
import { Sharing } from '@src/components/sharing';
import { Profile } from '@src/components/profile';
import { Discussion } from '@src/components/discussion';
// import { Capture } from "@src/components/capture";
import { Notifications } from '@src/components/notifications';
// import { Chat } from '@src/components/chat';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { QueryClientProvider } from 'react-query';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ShareIcon from '@material-ui/icons/Share';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import PersonIcon from '@material-ui/icons/Person';
// import ChatIcon from '@material-ui/icons/Chat';
import { User } from '../../types/common/types';
// import {
//   Row, Col, Button, Nav,
// } from 'react-bootstrap';

import { queryClient } from '../query';

import { getCurrentUser } from '../auth/auth';
import { isValidURL } from '../utils';
import './styles.scss';

// // // //

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

TabPanel.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  index: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  dir: PropTypes.any.isRequired,
  // eslint-disable-next-line react/require-default-props
  className: PropTypes.node,
};

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
    '& .MuiBox-root-10': {
      padding: '0px',
    },
  },
}));

export const Popup: FunctionComponent = () => {
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
    setValue(newValue);
  };

  // Renders the component tree
  return (
    <QueryClientProvider client={queryClient}>
      <div className="popup-container">
        <div className="container mx-1 my-1">
          <AppBar position="static" color="default" elevation={1}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab icon={<ChatBubbleOutlineIcon />} {...a11yProps(0)} />
              <Tab icon={<ShareIcon />} {...a11yProps(1)} />
              {/* <Tab icon={<NotificationsActiveIcon />} {...a11yProps(2)} /> */}
              {/* <Tab icon={<ChatIcon />} {...a11yProps(2)} /> */}
              <Tab icon={<PersonIcon />} onClick={(event : any) => clickHandler(event)} />
            </Tabs>
          </AppBar>

          <TabPanel value={value} index={0} dir={theme.direction} className={classes.tab}>
            <Discussion initCurrentUser={user} initUrl={url} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Sharing />
          </TabPanel>
          {/* <TabPanel value={value} index={2} dir={theme.direction}>
            <Chat initCurrentUser={user} />
          </TabPanel> */}
        </div>
      </div>
    </QueryClientProvider>
  );
};
