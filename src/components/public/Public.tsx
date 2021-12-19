/* eslint-disable max-len */
import {
  Box, Button, ToggleButton, ToggleButtonGroup
} from '@mui/material';
// import { styled } from '@mui/material/styles';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  Shout, Url, User, Website
} from '../../../types/common/types';
import { isValidURL } from '../../utils';
import ActionContainer from './ActionContainer';
import Chat from './Chat';
import Discussion from './Discussion';
import WebsiteUI from './WebsiteUI';

interface Props {
  initCurrentUser: User[];
  initUrl: Url;
  autoFetch: boolean;
}

interface GetShoutTreesQuery {
  Roots: Shout[];
  Website: Website;
}

interface SuccessResponse {
  Shout: Shout;
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
const Public = ({ initCurrentUser, initUrl, autoFetch } : Props) => {
  // const url : any = initUrl;
  const [url, setUrl] = React.useState<any>({});
  const user : any = initCurrentUser;
  const [mode, setMode] = React.useState('discussion');
  const handleMode = (event : any, newMode : string) => {
    setMode(newMode);
  };
  const [showForm, setShowForm] = React.useState(true);
  const [showChat, setShowChat] = React.useState(false);
  const [showCaptcha, setShowCaptcha] = React.useState(false);
  const [captchaToken, setCaptchaToken] = React.useState('');
  const [children, setChildren] = React.useState<Shout[]>([]);
  const [comment, setComment] = React.useState('');
  const [currentTitle, setCurrentTitle] = React.useState<any>('');

  const route = `/get_shout_trees?host=${url.host}&pathname=${url.pathname}&search=${encodeURIComponent(url.search)}`;
  const { data, status, refetch } = useQuery<GetShoutTreesQuery, string>(
    route, {
      enabled: autoFetch,
      onSuccess: (shoutData) => {
        setChildren(shoutData.Roots);
      }
    }
  );
  const [intervalCount, setIntervalCount] = React.useState(0);

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
          origin: newUrl.origin,
        };
        setUrl(formatedUrl);
        if (autoFetch) {
          refetch();
        }
      });
    }
  }, []);

  const replyMutation = useMutation<SuccessResponse, AxiosError>(
    {
      onSuccess: (mutationData) => {
        setComment('');
        setShowCaptcha(false);
        setCaptchaToken('');
        setChildren((c) => ((c && c.length > 0) ? [mutationData.Shout, ...c] : [mutationData.Shout]));
        refetch();
      },
      onError: (err: AxiosError) => {
        if (err.response?.status === 402) {
          setShowCaptcha(true);
        }
      }
    }
  );

  function loginLink() {
    const href = `${process.env.PUBLIC_WEB}`;
    window.open(href, '_blank', 'noopener,noreferrer');
    return false;
  }
  const queryClient = useQueryClient();

  const postComment = async (event : any) => {
    event.preventDefault();
    const postShoutData = {
      Comment: comment,
      URL: {
        Host: url.host,
        Pathname: url.pathname,
        Search: url.search,
      },
      CaptchaToken: captchaToken
    };
    // @ts-ignore
    const res = replyMutation.mutate({ route: '/post_shout', data: postShoutData });
    return res;
  };

  const child : any = '';
  let website : any = '';
  let actionBox;
  let loginButton: any = '';

  if (status === 'error') {
    // trees = <div>Error</div>;
    // website = <div>Error</div>;
    loginButton = (
      <Box width="100%">
        <Button
          type="button"
          variant="outlined"
          color="primary"
          onClick={(e) => { loginLink(); }}
        >
          Please visit netvyne.com to get started
        </Button>
      </Box>
    );
  } else if (status === 'success' && user) {
    website = (
      <>
        <WebsiteUI initWebsite={data!.Website} url={url} refetch={refetch} currentTitle={currentTitle} />
      </>
    );
    actionBox = (
      <>
        <ActionContainer initWebsite={data!.Website} reg={user?.Registered} url={url} refetch={refetch} setShowChat={setShowChat} />
      </>
    );
  }
  return (
    <Root>
      <ThemeProvider theme={discussionTheme}>
        {website}
        {actionBox}
        <Box my={1}>
          <ToggleButtonGroup
            size="small"
            value={mode}
            exclusive
            onChange={handleMode}
            aria-label="public mode"
            fullWidth
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
            ? <Discussion initCurrentUser={initCurrentUser} initUrl={initUrl} autoFetch={autoFetch} />
            : <Chat initCurrentUser={initCurrentUser} />}
        </Box>
      </ThemeProvider>
    </Root>
  );
};
export default Public;
