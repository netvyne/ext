/* eslint-disable max-len */
import {
  AppBar, Avatar, Badge, Box, Button, Grid,
  Menu, MenuItem, Tab, Tabs, ThemeProvider, Typography
} from '@mui/material/';
import { createTheme, styled } from '@mui/material/styles';
import { Sharing } from '@src/components/sharing';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { QueryClientProvider, useQuery } from 'react-query';
import { browser } from 'webextension-polyfill-ts';
import { User } from '../../types/common/types';
import { getCurrentUser } from '../auth/auth';
import Chat from '../components/chat/Chat';
import Discussion from '../components/discussion/Discussion';
import Notifications from '../components/notifications/Notifications';
import { queryClient } from '../query';
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
        <Typography component="span">{children}</Typography>
      </Box>
      )}
    </div>
  );
}

function a11yProps(index : any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
const PREFIX = 'POPUP';
const classes = {
  root: `${PREFIX}-root`,
};

const Root = styled('div')(() => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    alignItems: 'center'
  },
}));

const theme = createTheme({
  components: {
    MuiMenu: {
      styleOverrides: {
        list: { display: 'flex', flexDirection: 'column', padding: '10px' },
      },
    },
  },
});

export const Popup: FunctionComponent = () => {
  const [autoFetch, setAutoFetch] = React.useState<any>(false);
  const [user, setUser] = React.useState<User|any>();
  const [url, setUrl] = useState<any>({});
  const [shareCount, setShareCount] = useState(0);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isUserRegistered, setIsUserRegistered] = React.useState<any>(false);
  const [currentUser, setCurrentUser] = React.useState<any>(null);

  // Sends the `popupMounted` event
  React.useEffect(() => {
    chrome.storage.sync.set({
      isExtClosed: true,
    });
    browser.runtime.sendMessage({ popupMounted: true });
  }, []);

  function moreOptionClick(action : string, link : string) {
    let href = link;
    if (action !== 'feedback') {
      href = `${process.env.PUBLIC_WEB}/${link}`;
    }
    window.open(href, '_blank', 'noopener,noreferrer');
    setAnchorEl(null);
    return false;
  }

  const route = `/get_user_notifications?host=${url.host}&pathname=${url.pathname}&search=${encodeURIComponent(url.search)}`;

  const { data, status, refetch } = useQuery<any, string>(route, { enabled: autoFetch });
  const [intervalCount, setIntervalCount] = React.useState(0);

  const profileQuery = useQuery<any>('/profile', {
    enabled: autoFetch,
    onSuccess: (statusResponse) => {
      setIsUserRegistered(statusResponse.CurrentUser.Registered);
      setCurrentUser(statusResponse.CurrentUser);
      getCurrentUser().then((curUser:User|any) => setUser(curUser));
    }
  });

  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };
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
    if (data) {
      if (data.WebsitePostShareCount > 0) {
        setShareCount(data.WebsitePostShareCount);
      }
      if (data.WebsiteShoutCount > 0) {
        chrome.browserAction.setBadgeText({ text: `${data.WebsiteShoutCount}` });
      } else {
        chrome.browserAction.setBadgeText({ text: '' });
      }
    }
    const timer = setTimeout(() => {
      const newCount = intervalCount + 1;
      setIntervalCount(newCount);
      setAutoFetch(false);
      chrome.storage.sync.get(
        {
          netvyneBadge: true,
        },
        (items) => {
          if (items.netvyneBadge === true || items.netvyneBadge === null) {
            setAutoFetch(true);
          }
        }
      );
      chrome.storage.sync.get(['isExtClosed'], (result) => {
        if (result.isExtClosed === false) {
          setAutoFetch(true);
        }
      });
    }, 1000);
  }, [data, intervalCount]);

  const [value, setValue] = React.useState(0);
  const handleChange = (event : any, newValue : any) => {
    setValue(newValue);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (action: string) => {
    if (action === 'livechat') {
      setValue(3);
    }
    setAnchorEl(null);
  };

  // Renders the component tree
  return (
    <QueryClientProvider client={queryClient}>
      <Root className={classes.root}>
        <div className="popup-container">
          <div className="container mx-1 my-1">
            <AppBar position="static" color="default" elevation={1}>
              <Grid className="topbar">
                <Grid className="logo">
                  <Button onClick={() => moreOptionClick('profile', 'profile')}>
                    <img src="../icon-48.png" alt="logo" />
                  </Button>
                </Grid>
                <Tabs
                  className="tabs"
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="icon label tabs example"
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: '#9F00CF',
                    },
                  }}
                >
                  <Tab icon={<Avatar alt="Conversation" src={value === 0 ? '../images/conversation_selected.png' : '../images/conversation_normal.png'} className="tabIcon" />} label="Discuss" {...a11yProps(0)} />
                  <Tab icon={<Avatar alt="Share" src={value === 1 ? '../images/share_selected.png' : '../images/share_normal.png'} className="tabIcon" />} label="Share" {...a11yProps(1)} />
                  <Tab
                    icon={(
                      <Badge
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        color="primary"
                        variant="dot"
                        invisible={!data?.ContainsUnread}
                      >
                        <Avatar alt="Notification" src={value === 2 ? '../images/notification_selected.png' : '../images/notification_normal.png'} className="tabIcon" />
                      </Badge>
)}
                    label="Notifications"
                    {...a11yProps(2)}
                  />
                  <Tab className="livechat-tab" label="" {...a11yProps(3)} />
                </Tabs>
                <Button onClick={() => moreOptionClick('logout', 'profile')}>
                  {(isUserRegistered && user && user.AvatarURL) && (
                  <Avatar
                    style={{ width: 40, height: 40 }}
                    alt="Avatar"
                    src={user.AvatarURL}
                  />
                  )}
                  {(isUserRegistered && user && !user.AvatarURL) && (
                  <Avatar
                    alt="Handle initial"
                    style={{ width: 40, height: 40, fontSize: '1.5rem' }}
                  >
                    {`${currentUser.UserName.charAt(0).toUpperCase()}`}
                  </Avatar>
                  )}
                  {!isUserRegistered && currentUser && (
                  <Avatar
                    alt="Handle initial"
                    style={{ width: 40, height: 40, fontSize: '1.5rem' }}
                  >
                    {`${currentUser.UserName.charAt(0).toUpperCase()}`}
                  </Avatar>
                  )}
                </Button>
                <div className="more-icon">
                  <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <img src={value === 3 ? '../images/three_dots_selected.png' : '../images/three_dots_normal.png'} alt="more icon" />
                  </Button>
                  <ThemeProvider theme={theme}>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={() => handleClose('close')}
                    >
                      <MenuItem onClick={() => handleClose('livechat')}>Live Chat</MenuItem>
                      <MenuItem onClick={() => moreOptionClick('feedback', 'https://forms.gle/LUzvrWqhtWnKwAxX6')}>Feedback</MenuItem>
                      {isUserRegistered && (<MenuItem onClick={() => moreOptionClick('logout', 'profile')}>Logout</MenuItem>)}
                      {!isUserRegistered && (<MenuItem onClick={() => moreOptionClick('login', 'auth/signin')}>Login</MenuItem>)}
                    </Menu>
                  </ThemeProvider>
                </div>
              </Grid>
            </AppBar>
            <TabPanel value={value} index={0}>
              <Discussion initCurrentUser={user} initUrl={url} autoFetch={autoFetch} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Sharing />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Notifications refetch={refetch} />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Chat initCurrentUser={user} />
            </TabPanel>
          </div>
        </div>
      </Root>
    </QueryClientProvider>
  );
};
