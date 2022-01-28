/* eslint-disable max-len */
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';
import {
  AppBar, Avatar, Badge, Box, Grid, Tab, Tabs, Typography
} from '@mui/material/';
import { styled } from '@mui/material/styles';
import Public from '@src/components/public/Public';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { QueryClientProvider, useQuery } from 'react-query';
import { browser } from 'webextension-polyfill-ts';
import { User } from '../../types/common/types';
import Notifications from '../components/notifications/Notifications';
import Sharing from '../components/sharing/Sharing';
import { queryClient } from '../query';
import {
  formatImageURL, isValidURL, setBadge
} from '../utils';
import './styles.scss';

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

export const Popup: FunctionComponent = () => {
  const [autoFetch, setAutoFetch] = React.useState<any>(false);
  const [user, setUser] = React.useState<User|any>();
  const [url, setUrl] = useState<any>({});
  // eslint-disable-next-line no-unused-vars
  const [isTabActive, setIsTabActive] = useState<any>(false);
  const [isTabUpdated, setIsTabUpdated] = useState(false);
  const intervalMs = 5000;

  // Sends the `popupMounted` event
  React.useEffect(() => {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg === 'toggle') {
        chrome.storage.sync.get(['isExtClosed'], (result) => {
          if (result.isExtClosed === true) {
            chrome.storage.sync.get(
              {
                netvyneBadge: true,
              },
              (items) => {
                if (items.netvyneBadge === true || items.netvyneBadge === null) {
                  setIsTabUpdated(true);
                  setAutoFetch(true);
                } else {
                  setIsTabUpdated(false);
                  setAutoFetch(false);
                }
              }
            );
          } else {
            setIsTabUpdated(true);
            setAutoFetch(true);
          }
        });
      }
    });
    browser.runtime.sendMessage({ popupMounted: true });

    chrome.storage.sync.get(['isExtClosed'], (result) => {
      if (result.isExtClosed === true) {
        chrome.storage.sync.get(
          {
            netvyneBadge: true,
          },
          (items) => {
            if (items.netvyneBadge === true || items.netvyneBadge === null) {
              setAutoFetch(true);
            } else {
              setAutoFetch(false);
            }
          }
        );
      } else {
        setAutoFetch(true);
      }
    });
  }, []);

  const route = `/get_user_notifications?host=${url.host}&pathname=${encodeURIComponent(url.pathname)}&search=${encodeURIComponent(url.search)}`;

  const { data, refetch } = useQuery<any, string>(route, { enabled: (isTabActive && autoFetch && !!user), refetchInterval: intervalMs });

  const loginRoute = '/login';

  useQuery(loginRoute, {
    enabled: (isTabActive && autoFetch),
    refetchInterval: intervalMs,
    onSuccess: (retData: { [CurrentUser: string]: User }) => {
      if (retData && retData.CurrentUser) {
        setUser(retData.CurrentUser);
      }
    },
  });

  React.useEffect(() => {
    if (chrome.tabs) {
      chrome.tabs.getCurrent((tab) => {
        setIsTabActive(tab?.active);
      });
    }
  }, []);

  const queryInfo = { active: true, lastFocusedWindow: true };

  useEffect(() => {
    chrome.runtime.onMessage.addListener(
      (request) => {
        // listen for messages sent from background.js
        if (request.message === 'urlupdated') {
          setIsTabUpdated(true);
          setTimeout(() => {
            if (chrome.tabs) {
              chrome.tabs.query(queryInfo, (tabs) => {
                const newUrl : any = isValidURL(request.url);
                const formatedUrl = {
                  pathname: newUrl.pathname,
                  host: newUrl.host,
                  search: newUrl.search,
                  Title: tabs[0].title,
                  origin: newUrl.origin,
                };
                setUrl(formatedUrl);
                if (autoFetch) {
                  refetch();
                }
              });
            }
          }, 2000);
        }
      }
    );
  }, []);

  useEffect(() => {
    if (chrome.tabs) {
      chrome.tabs.query(queryInfo, (tabs) => {
        const newUrl : any = isValidURL(tabs[0].url);
        // setIsTabActive(true);
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
      if (data.WebsiteShoutCount > 0) {
        setBadge(data.WebsiteShoutCount);
      } else {
        setBadge('');
      }
    }
  }, [data]);

  const [value, setValue] = React.useState(0);
  const handleChange = (event : any, newValue : any) => {
    setValue(newValue);
  };

  // Renders the component tree
  return (
    <QueryClientProvider client={queryClient}>
      <Root className={classes.root}>
        <div className="popup-container">
          <div className="container mx-1 my-1">
            <AppBar position="fixed" sx={{ top: '0px' }} color="default" elevation={1}>
              <Grid className="topbar">
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
                  <Tab icon={<PublicIcon sx={{ color: value === 0 ? '#9F00CF' : 'black' }} />} label="Public" {...a11yProps(0)} />
                  <Tab icon={<HomeIcon sx={{ color: value === 1 ? '#9F00CF' : 'black' }} />} label="Private" {...a11yProps(1)} />
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
                        {user?.AvatarPath ? (
                          <Avatar
                            style={{ width: 24, height: 24 }}
                            alt="Avatar"
                            src={formatImageURL(user.AvatarPath)}
                          />
                        )
                          : (
                            <Avatar
                              alt="Handle initial"
                              style={{
                                width: 24, height: 24, fontSize: '1.5rem', backgroundColor: 'black'
                              }}
                            >
                              {`${user?.UserName?.charAt(0).toUpperCase()}`}
                            </Avatar>
                          )}
                      </Badge>
)}
                    label="Profile"
                    {...a11yProps(2)}
                  />
                </Tabs>
              </Grid>
            </AppBar>
            <Box sx={{ marginTop: '60px', padding: '8px', paddingTop: '0px' }}>
              <TabPanel value={value} index={0}>
                <Public initCurrentUser={user} isTabActive={isTabActive} url={url} isTabUpdated={isTabUpdated} />
              </TabPanel>
              <TabPanel style={{ paddingTop: '8px' }} value={value} index={1}>
                <Sharing defUser={user} />
              </TabPanel>
              <TabPanel style={{ paddingTop: '8px' }} value={value} index={2}>
                <Notifications refetch={refetch} />
              </TabPanel>
            </Box>
          </div>
        </div>
      </Root>
    </QueryClientProvider>
  );
};
