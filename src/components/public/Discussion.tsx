/* eslint-disable max-len */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import createTheme from '@mui/material/styles/createTheme';
import styled from '@mui/material/styles/styled';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { AxiosError } from 'axios';
import { sha256 } from 'js-sha256';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import {
  Shout, User, Website
} from '../../../types/common/types';
import HCaptcha from '../common/hcaptcha';
import ReplyUI from './ReplyUI';
import ShoutPlaceholder from './ShoutPlaceholder';
import ShoutTree from './ShoutTree';
import './styles.scss';

interface Props {
  initCurrentUser: User[];
  initURL: any;
  sort: string;
  setSort: any;
  isTabUpdated: boolean;
  themeColors: any;
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
const Discussion = ({
  initCurrentUser, initURL, sort, setSort, isTabUpdated, themeColors
} : Props) => {
  // eslint-disable-next-line global-require
  const user : any = initCurrentUser;
  const [showForm, setShowForm] = React.useState(true);
  const [showCaptcha, setShowCaptcha] = React.useState(false);
  const [captchaToken, setCaptchaToken] = React.useState('');
  const [children, setChildren] = React.useState<Shout[]>([]);
  const captchaRef = React.createRef<HCaptcha>();
  const [comment, setComment] = React.useState('');
  const treeHeight = window.innerHeight - 392;
  const [showFullEditor, setShowFullEditor] = React.useState(false);

  const urlHash = sha256(`${initURL?.host}${initURL?.pathname}${initURL?.search}`);
  const route = `/get_shout_trees?url_hash=${urlHash}&sort=${sort}`;
  const { data, status } = useQuery<GetShoutTreesQuery, string>(
    route, {
      enabled: isTabUpdated,
      onSuccess: (shoutData) => {
        setChildren(shoutData.Roots);
      }
    }
  );

  const replyMutation = useMutation<SuccessResponse, AxiosError>(
    {
      onSuccess: (mutationData) => {
        setComment('');
        setShowCaptcha(false);
        setCaptchaToken('');
        setChildren((c) => ((c && c.length > 0) ? [mutationData.Shout, ...c] : [mutationData.Shout]));
        // refetch();
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
    trees = <Box sx={{ marginLeft: '8px' }}><ShoutPlaceholder /></Box>;
  } else if (status === 'success' && user) {
    if (children) {
      trees = children.map((treeRoot) => (
        <ShoutTree
          key={treeRoot.ID}
          website={data!.Website}
          treeRoot={treeRoot}
          defUser={user}
          themeColors={themeColors}
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
        themeColors={themeColors}
        showFullEditor={showFullEditor}
      />
    );
  }
  const sorter = (
    <Box
      p={1}
      height="40px"
      display="flex"
      justifyContent="space-between"
    >
      <Box>
        Sort:
        {' '}
        <Select
          size="small"
          value={sort}
          label="Sort"
          onChange={(event : any) => setSort(event.target.value)}
          style={{ height: '25px', backgroundColor: themeColors.divBackground, color: themeColors.commentText }}
        >
          <MenuItem value="top">Top</MenuItem>
          <MenuItem value="best">Best</MenuItem>
          <MenuItem value="old">Old</MenuItem>
          <MenuItem value="new">New</MenuItem>
        </Select>
      </Box>
      <Button onClick={() => setShowFullEditor(!showFullEditor)}>
        {showFullEditor ? 'Basic Editor' : 'Full Editor'}
      </Button>
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
          height: `${treeHeight}px`,
          overflow: 'auto',
          marginLeft: '-8px'
        }}
        >
          {trees}
        </Box>
      </ThemeProvider>
    </Root>
  );
};
export default Discussion;
