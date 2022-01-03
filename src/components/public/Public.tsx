/* eslint-disable max-len */
import {
  Box,
  ToggleButton, ToggleButtonGroup
} from '@mui/material';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import {
  Shout, User, Website
} from '../../../types/common/types';
import { isValidURL } from '../../utils';
import ActionContainer from './ActionContainer';
import Chat from './Chat';
import Discussion from './Discussion';
import WebsitePlaceholder from './WebsitePlaceholder';
import WebsiteUI from './WebsiteUI';

interface Props {
  initCurrentUser: User[];
  autoFetch: boolean;
  isTabActive: boolean;
}

interface GetShoutTreesQuery {
  Roots: Shout[];
  Website: Website;
}

const PREFIX = 'DISCUSSION';
const classes = {
  root: `${PREFIX}-root`,
};

const Root = styled('div')(() => ({
  [`&.${classes.root}`]: {
    padding: '10px !important',
  },
}));

const discussionTheme = createTheme({
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#3f51b5',
          textDecoration: 'none',
          '@media (max-width: 768px)': {
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            width: '145px',
            display: 'inline-block',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#3f51b5',
        },
        outlinedPrimary: {
          color: '#3f51b5',
          border: 'solid 1px #3f51b5',
        }
      },
    }
  }
});
const Public = ({ initCurrentUser, autoFetch, isTabActive } : Props) => {
  // const url : any = initUrl;
  const [url, setUrl] = React.useState<any>();
  const user : any = initCurrentUser;
  const [mode, setMode] = React.useState('discussion');
  // const [timer, setTimer] = React.useState(0);
  const handleMode = (event : any, newMode : string) => {
    setMode(newMode);
  };
  // const [oldTitle, setOldTitle] = React.useState<any>('');

  const route = `/get_shout_trees?host=${url?.host}&pathname=${url?.pathname}&search=${encodeURIComponent(url?.search)}`;
  const { data, status, refetch } = useQuery<GetShoutTreesQuery, string>(
    route, {
      enabled: isTabActive && autoFetch
    }
  );

  const queryInfo = { active: true, lastFocusedWindow: true };

  useEffect(() => {
    chrome.runtime.onMessage.addListener(
      (request) => {
        // listen for messages sent from background.js
        if (request.message === 'urlupdated') {
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
  }, []);
  let website : any = '';
  let actionBox;

  if (status === 'success' && user) {
    website = (
      <>
        <WebsiteUI initWebsite={data!.Website} url={url} />
      </>
    );
    actionBox = (
      <>
        <ActionContainer initWebsite={data!.Website} url={url} refetch={refetch} />
      </>
    );
  }

  return (
    <Root>
      {!data?.Website && (
        <WebsitePlaceholder />
      )}
      <ThemeProvider theme={discussionTheme}>
        {website}
        {actionBox}
        <Box height="25px">
          <ToggleButtonGroup
            size="small"
            value={mode}
            exclusive
            onChange={handleMode}
            aria-label="public mode"
            fullWidth
            style={{ height: '25px' }}
          >
            <ToggleButton value="discussion" aria-label="discussion">
              Discussion (
              {data?.Website.ShoutCount}
              )
            </ToggleButton>
            <ToggleButton value="chat" aria-label="chat">
              Live Chat
              (
              {data?.Website.LiveCount}
              )
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box>
          {mode === 'discussion'
            ? <Discussion initCurrentUser={initCurrentUser} autoFetch={autoFetch} initURL={url} />
            : <Chat />}
        </Box>
      </ThemeProvider>
    </Root>
  );
};
export default Public;
