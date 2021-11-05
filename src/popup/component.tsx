/* eslint-disable max-len */
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
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
  },
}));

export const Popup: FunctionComponent = () => {
  const [user, setUser] = React.useState<User|any>();
  getCurrentUser().then((currentUser:User|any) => setUser(currentUser));
  const [url, setUrl] = useState<any>({});
  const [shareCount, setShareCount] = useState(0);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // Sends the `popupMounted` event
  React.useEffect(() => {
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

  const { data, status, refetch } = useQuery<any, string>(route);

  useEffect(() => {
    const queryInfo = { active: true };
    if (chrome.tabs) {
      chrome.tabs.query(queryInfo, (tabs) => {
        const newUrl : any = isValidURL(tabs[0].url);
        let searchParam = newUrl.search;
        if (newUrl.host.indexOf('youtube.') > -1) {
          searchParam = newUrl.search.substr(0, newUrl.search.indexOf('&t='));
        }
        const formatedUrl = {
          pathname: newUrl.pathname,
          host: newUrl.host,
          search: searchParam,
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
  }, [data]);

  const classes = useStyles();
  // const classes = useStyles();
  const theme = useTheme();
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
              <div className="more-icon">
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                  <img src={value === 3 ? '../images/three_dots_selected.png' : '../images/three_dots_normal.png'} alt="more icon" />
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={() => handleClose('close')}
                >
                  <MenuItem onClick={() => handleClose('livechat')}>Live Chat</MenuItem>
                  <MenuItem onClick={() => moreOptionClick('feedback', 'https://forms.gle/LUzvrWqhtWnKwAxX6')}>Feedback</MenuItem>
                  {user && !!user.Registered && (<MenuItem onClick={() => moreOptionClick('logout', 'profile')}>Logout</MenuItem>)}
                  {user && !user.Registered && (<MenuItem onClick={() => moreOptionClick('login', 'auth/signin')}>Login</MenuItem>)}
                </Menu>
              </div>
            </Grid>
          </AppBar>
          <TabPanel value={value} index={0} dir={theme.direction} className={classes.tab}>
            <Discussion initCurrentUser={user} initUrl={url} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Sharing />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Notifications refetch={refetch} />
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <Chat initCurrentUser={user} />
          </TabPanel>
        </div>
      </div>
    </QueryClientProvider>
  );
};
