import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ImageIcon from '@material-ui/icons/Image';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Post, User, Website } from '../../../types/common/types';
import { getCurrentUser } from '../../auth/auth';
import { isValidURL } from '../../utils';
import { Error } from '../error';
import FreedPost from './FreedPost';

interface GetFeedQuery {
  Websites: Website[];
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: '5px',
    marginTop: '5px',
    width: '100%',
  },
}));

export default function Shares() {
  const classes = useStyles();
  const [url, setUrl] = useState<any>({});
  const [clicked, setClicked] = useState<boolean>(false);
  const [selectedShare, setSelectedShare] = useState<Post>();
  const [user, setUser] = React.useState<User | null>();
  getCurrentUser().then((currentUser: User | null) => setUser(currentUser));
  //   const { data, status } = useQuery<GetFeedQuery, string>('/get_website_feed', {
  //     // The query will not execute until /login returns
  //     enabled: !!user,
  //   });

  useEffect(() => {
    const queryInfo = { active: true };
    if (chrome.tabs) {
      chrome.tabs.query(queryInfo, (t) => {
        const newUrl : any = isValidURL(t[0].url);
        const formatedUrl = {
          pathname: newUrl.pathname,
          host: newUrl.host,
          search: newUrl.search,
          Title: t[0].title,
        };
        setUrl(formatedUrl);
      });
    }
  }, []);

  const handleClick = (event : any, share : Post) => {
    setSelectedShare(share);
    setClicked(true);
  };

  const route = `/get_website_posts?host=${url.host}&pathname=${url.pathname}&search=${encodeURIComponent(url.search)}`;

  const { data, status } = useQuery<any, string>(route);

  // console.log(data);
  let shares;
  if (status === 'error') {
    // shares = <div>Error</div>;
    shares = <Error />;
  } else if (status === 'loading') {
    shares = <div>Loading</div>;
    shares = (
      <Grid
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Grid>
    );
  } else if (status === 'success') {
    if (data.Posts && data.Posts.length > 0) {
      shares = data!.Posts?.map((share: Post) => (
        <div className={classes.root}>
          <List>
            <div onClick={(event : any) => handleClick(event, share)} onKeyPress={(event : any) => handleClick(event, share)} role="button" tabIndex={0}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={
                  // eslint-disable-next-line max-len
                  (share.Conversation.Title)
                  }
                />
              </ListItem>
            </div>
          </List>
          <Divider variant="inset" />
        </div>
      ));
    } else {
      shares = (
        <div className={classes.root}>
          <List>
            <div>
              <ListItem button>
                <ListItemText primary="No shares" />
              </ListItem>
            </div>
          </List>
        </div>
      );
    }
  }
  return (
    <Box m={0} p={0}>
      {/* <Helmet>
        <title>Feed</title>
      </Helmet>
      <FeedSidebar />
      {feed} */}
      {!clicked && (
        <Box>
          {shares}
        </Box>
      )}
      {clicked && (
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container direction="column">
              <Grid item>
                <Button type="button" size="small" color="primary" endIcon={<ArrowBackIosIcon />} onClick={() => { setClicked(false); }} />
              </Grid>
              <Grid item xs container direction="row" spacing={2}>
                <Grid item xs>
                  <FreedPost initPost={selectedShare} key={selectedShare?.ID} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
}
