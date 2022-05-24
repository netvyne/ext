/* eslint-disable max-len */
import Box from '@mui/material/Box';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import { sha256 } from 'js-sha256';
import React from 'react';
import { useQuery } from 'react-query';
import {
  Shout, User, Website
} from '../../../types/common/types';
import ActionContainer from './ActionContainer';
import Discussion from './Discussion';
import WebsitePlaceholder from './WebsitePlaceholder';
import WebsiteUI from './WebsiteUI';

interface Props {
  initCurrentUser: User;
  isTabActive: boolean;
  url: any;
  isTabUpdated: boolean;
  themeColors: any;
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
    }
  }
});
const Public = ({
  initCurrentUser, isTabActive, url, isTabUpdated, themeColors
} : Props) => {
  // const user : any = initCurrentUser;
  // const [mode, setMode] = React.useState('discussion');
  const [sort, setSort] = React.useState('best');
  // const handleMode = (event : any, newMode : string) => {
  //   setMode(newMode);
  // };

  const urlHash = sha256(`${url?.host}${url?.pathname}${url?.search}`);
  const route = `/get_shout_trees?url_hash=${urlHash}&sort=${sort}`;
  const { data, status, refetch } = useQuery<GetShoutTreesQuery, string>(
    route, {
      enabled: isTabActive && isTabUpdated
    }
  );

  let website : any = '';
  let actionBox;

  if (status === 'success' && initCurrentUser) {
    website = (
      <>
        <WebsiteUI initWebsite={data!.Website} url={url} />
      </>
    );
    actionBox = (
      <>
        <ActionContainer initWebsite={data!.Website} url={url} refetch={refetch} themeColors={themeColors} />
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
        {/* <Box height="25px">
          <ToggleButtonGroup
            size="small"
            value={mode}
            exclusive
            onChange={handleMode}
            aria-label="public mode"
            fullWidth
            sx={{ height: '25px', backgroundColor: themeColors.toggleButton }}
          >
            <ToggleButton value="discussion" aria-label="discussion" sx={{ '&:hover': { backgroundColor: themeColors.toggleButtonHover } }}>
              Discussion (
              {data?.Website.ShoutCount}
              )
            </ToggleButton>
          </ToggleButtonGroup>
        </Box> */}
        <Box>
          <Discussion
            initCurrentUser={initCurrentUser}
            initURL={url}
            sort={sort}
            setSort={setSort}
            isTabUpdated={isTabUpdated}
            themeColors={themeColors}
          />
        </Box>
      </ThemeProvider>
    </Root>
  );
};
export default Public;
