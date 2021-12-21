/* eslint-disable max-len */
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';
import {
  AppBar, Avatar, Badge, Box, Grid, Tab, Tabs, Typography
} from '@mui/material/';
import { styled } from '@mui/material/styles';
import Public from '@src/components/public/Public';
import { AxiosError } from 'axios';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { QueryClientProvider, useMutation, useQuery } from 'react-query';
import { browser } from 'webextension-polyfill-ts';
import { User } from '../../types/common/types';
import Notifications from '../components/notifications/Notifications';
import Sharing from '../components/sharing/Sharing';
import { queryClient } from '../query';
import { isValidURL } from '../utils';
import './styles.scss';

interface loginMutation {
  CurrentUser: User;
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

export const Popup: FunctionComponent = () => {
  const [autoFetch, setAutoFetch] = React.useState<any>(false);
  const [user, setUser] = React.useState<User|any>();
  const [url, setUrl] = useState<any>({});
  const [intervalCount, setIntervalCount] = useState(0);
  // intervalCount
  const intervalMs = 5000;

  // Sends the `popupMounted` event
  React.useEffect(() => {
    chrome.storage.sync.set({
      isExtClosed: true,
    });
    browser.runtime.sendMessage({ popupMounted: true });
  }, []);
  const mutation = useMutation<loginMutation, AxiosError>({});
  const getUser = async () => {
    console.log('Here in login ::: ');
    const mutateData = {
      Password: '',
      Email: '',
    };
    const res = mutation.mutate(
      // @ts-ignore
      {
        route: '/login',
        data: mutateData,
      },
      {
        onSuccess: (retData: { [CurrentUser: string]: User }) => {
          if (retData && retData.CurrentUser) {
            setUser(retData.CurrentUser);
          }
        },
      },
    );
    return res;
  };

  React.useEffect(() => {
    // getUser();
    // eslint-disable-next-line no-unused-vars
    setTimeout(() => {
      const newCount = intervalCount + 1;
      setIntervalCount(newCount);
      getUser();
    }, 5000);
  }, [intervalCount]);

  const route = `/get_user_notifications?host=${url.host}&pathname=${url.pathname}&search=${encodeURIComponent(url.search)}`;

  const { data, refetch } = useQuery<any, string>(route, { enabled: autoFetch && !!user, refetchInterval: intervalMs });

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
      if (data.WebsiteShoutCount > 0) {
        chrome.browserAction.setBadgeText({ text: `${data.WebsiteShoutCount}` });
      } else {
        chrome.browserAction.setBadgeText({ text: '' });
      }
    }
    setTimeout(() => {
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
    }, 5000);
  }, [data, intervalCount]);

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
                        {user?.AvatarURL ? (
                          <Avatar
                            style={{ width: 24, height: 24 }}
                            alt="Avatar"
                            src={user.AvatarURL}
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
            <Box sx={{ marginTop: '65px', padding: '8px' }}>
              <TabPanel value={value} index={0}>
                <Public initCurrentUser={user} autoFetch={autoFetch} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Sharing defUser={user} />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Notifications refetch={refetch} />
              </TabPanel>
            </Box>
          </div>
        </div>
      </Root>
    </QueryClientProvider>
  );
};
