/* eslint-disable max-len */
import HCaptcha from '@hcaptcha/react-hcaptcha';
import {
  Box, MenuItem, Select
} from '@mui/material';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import { AxiosError } from 'axios';
import React from 'react';
// import React, { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import {
  Shout, User, Website
} from '../../../types/common/types';
// import { isValidURL } from '../../utils';
import ReplyUI from './ReplyUI';
import ShoutPlaceholder from './ShoutPlaceholder';
import ShoutTree from './ShoutTree';
import './styles.scss';

interface Props {
  initCurrentUser: User[];
  autoFetch: boolean;
  initURL: any;
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
const Discussion = ({ initCurrentUser, autoFetch, initURL } : Props) => {
  // const [url, setUrl] = React.useState<any>({});
  const user : any = initCurrentUser;
  const [showForm, setShowForm] = React.useState(true);
  const [sort, setSort] = React.useState('best');
  const [showCaptcha, setShowCaptcha] = React.useState(false);
  const [captchaToken, setCaptchaToken] = React.useState('');
  const [children, setChildren] = React.useState<Shout[]>([]);
  const captchaRef = React.createRef<HCaptcha>();
  const [comment, setComment] = React.useState('');

  const route = `/get_shout_trees?host=${initURL?.host}&pathname=${initURL?.pathname}&search=${encodeURIComponent(initURL?.search)}&sort=${sort}`;
  const { data, status, refetch } = useQuery<GetShoutTreesQuery, string>(
    route, {
      enabled: autoFetch,
      onSuccess: (shoutData) => {
        setChildren(shoutData.Roots);
      }
    }
  );

  // useEffect(() => {
  //   const queryInfo = { active: true, lastFocusedWindow: true };
  //   if (chrome.tabs) {
  //     chrome.tabs.query(queryInfo, (tabs) => {
  //       const newUrl : any = isValidURL(tabs[0].url);
  //       const formatedUrl = {
  //         pathname: newUrl.pathname,
  //         host: newUrl.host,
  //         search: newUrl.search,
  //         Title: tabs[0].title,
  //         origin: newUrl.origin,
  //       };
  //       setUrl(formatedUrl);
  //       if (autoFetch) {
  //         refetch();
  //       }
  //     });
  //   }
  // }, []);

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

  const postComment = async (event : any) => {
    event.preventDefault();
    const postShoutData = {
      Comment: comment,
      URL: {
        Host: initURL.host,
        Pathname: initURL.pathname,
        Search: initURL.search,
      },
      CaptchaToken: captchaToken
    };
    // @ts-ignore
    const res = replyMutation.mutate({ route: '/post_shout', data: postShoutData });
    return res;
  };
  let trees : any = '';
  let reply: any = '';

  if (status === 'loading') {
    trees = <ShoutPlaceholder />;
  } else if (status === 'success' && user) {
    if (children) {
      trees = children.map((treeRoot) => (
        <ShoutTree
          key={treeRoot.ID}
          website={data!.Website}
          treeRoot={treeRoot}
          defUser={user}
        />
      ));
    }
    reply = (
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
  }
  const sorter = (
    <Box
      m={1}
      p={1}
      height="55px"
    >
      Sort:
      {' '}
      <Select
        size="small"
        value={sort}
        label="Sort"
        onChange={(event : any) => setSort(event.target.value)}
      >
        <MenuItem value="top">Top</MenuItem>
        <MenuItem value="best">Best</MenuItem>
        <MenuItem value="old">Old</MenuItem>
        <MenuItem value="new">New</MenuItem>
      </Select>
    </Box>
  );
  return (
    <Root>
      <ThemeProvider theme={discussionTheme}>
        {sorter}
        <Box height="150px">
          {reply}
        </Box>
        <Box style={{
          height: '500px',
          overflow: 'auto'
        }}
        >
          {trees}
        </Box>
      </ThemeProvider>
    </Root>
  );
};
export default Discussion;
