/* eslint-disable max-len */
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Box } from '@mui/material';
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
import FeedItemPlaceholder from './FeedItemPlaceholder';
import ReplyUI from './ReplyUI';
import ShoutPlaceholder from './ShoutPlaceholder';
import ShoutTree from './ShoutTree';
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
const Discussion = ({ initCurrentUser, initUrl, autoFetch } : Props) => {
  // const url : any = initUrl;
  const [url, setUrl] = React.useState<any>({});
  const user : any = initCurrentUser;
  const [showForm, setShowForm] = React.useState(true);
  const [showCaptcha, setShowCaptcha] = React.useState(false);
  const [captchaToken, setCaptchaToken] = React.useState('');
  const [children, setChildren] = React.useState<Shout[]>([]);
  const captchaRef = React.createRef<HCaptcha>();
  const [comment, setComment] = React.useState('');
  const [currentTitle, setCurrentTitle] = React.useState<any>('');
  // const [autoFetch, setAutoFetch] = React.useState<any>(false);

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
    const timer = setTimeout(() => {
      const newCount = intervalCount + 1;
      setIntervalCount(newCount);
      const queryInfo = { active: true, lastFocusedWindow: true };
      if (chrome.tabs) {
        chrome.tabs.query(queryInfo, (tabs) => {
          if (currentTitle !== tabs[0].title) {
            setCurrentTitle(tabs[0].title);
            const newUrl : any = isValidURL(tabs[0].url);
            const formatedUrl = {
              pathname: newUrl.pathname,
              host: newUrl.host,
              search: newUrl.search,
              Title: tabs[0].title,
            };
            setUrl(formatedUrl);
            if (autoFetch) {
              refetch();
            }
          }
        });
      }
    }, 1000);
  }, [intervalCount]);

  // const replyMutation = useMutation({});
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
  let trees : any = '';
  let actionBox;

  if (status === 'error') {
    trees = <div>Error</div>;
    website = <div>Error</div>;
  } else if (status === 'loading') {
    trees = <ShoutPlaceholder />;
    website = <FeedItemPlaceholder />;
  } else if (status === 'success' && user) {
    if (children) {
      trees = children.map((treeRoot) => (
        <ShoutTree
          key={treeRoot.ID}
          website={data!.Website}
          treeRoot={treeRoot}
          reg={!!user.Registered}
          defUser={user}
        />
      ));
    }
    website = (
      <>
        <WebsiteUI initWebsite={data!.Website} url={url} refetch={refetch} currentTitle={currentTitle} />
      </>
    );
    actionBox = (
      <>
        <ActionContainer initWebsite={data!.Website} reg={user?.Registered} url={url} refetch={refetch} />
      </>
    );
  }
  const reply = (
    <ReplyUI
      postComment={postComment}
      setComment={setComment}
      comment={comment}
      showForm={showForm}
      setShowForm={setShowForm}
      showCaptcha={showCaptcha}
      captchaRef={captchaRef}
      setCaptchaToken={setCaptchaToken}
    />
  );
  return (
    <Root className={classes.root}>
      <ThemeProvider theme={discussionTheme}>
        <Box>
          <div>
            {website}
            {actionBox}
            {reply}
            {trees}
          </div>
        </Box>
      </ThemeProvider>
    </Root>
  );
};
export default Discussion;
