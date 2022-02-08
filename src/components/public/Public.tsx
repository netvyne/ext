/* eslint-disable max-len */
import {
  Box,
  ToggleButton, ToggleButtonGroup
} from '@mui/material';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import { sha256 } from 'js-sha256';
import React from 'react';
import { useQuery } from 'react-query';
import {
  Shout, User, Website
} from '../../../types/common/types';
import ActionContainer from './ActionContainer';
import Chat from './Chat';
import Discussion from './Discussion';
import WebsitePlaceholder from './WebsitePlaceholder';
import WebsiteUI from './WebsiteUI';

interface Props {
  initCurrentUser: User[];
  isTabActive: boolean;
  url: any;
  isTabUpdated: boolean;
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
const Public = ({
  initCurrentUser, isTabActive, url, isTabUpdated
} : Props) => {
  const user : any = initCurrentUser;
  const [mode, setMode] = React.useState('discussion');
  const [sort, setSort] = React.useState('best');
  const handleMode = (event : any, newMode : string) => {
    setMode(newMode);
  };

  const urlHash = sha256(`${url?.host}${url?.pathname}${url?.search}`);
  const route = `/get_shout_trees?url_hash=${urlHash}&sort=${sort}`;
  const { data, status, refetch } = useQuery<GetShoutTreesQuery, string>(
    route, {
      enabled: isTabActive && isTabUpdated
    }
  );

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
            ? (
              <Discussion
                initCurrentUser={initCurrentUser}
                initURL={url}
                sort={sort}
                setSort={setSort}
                isTabUpdated={isTabUpdated}
              />
            )
            : <Chat />}
        </Box>
      </ThemeProvider>
    </Root>
  );
};
export default Public;
