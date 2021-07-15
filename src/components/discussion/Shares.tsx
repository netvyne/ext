import React, {
  FunctionComponent, useEffect, useRef, useState,
} from 'react';
import Box from '@material-ui/core/Box';
import { useQuery } from 'react-query';
// import { Helmet } from 'react-helmet-async';
// import FeedItem from './FeedItem';
// import FeedItemPlaceholder from './FeedItemPlaceholder';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CircularProgress from '@material-ui/core/CircularProgress';
import FreedPost from './FreedPost';
import { Website, User, PostShare } from '../../../types/common/types';
import { getCurrentUser } from '../../auth/auth';
import { isValidURL } from '../../utils';

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
  const [selectedShare, setSelectedShare] = useState<PostShare>();
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

  const handleClick = (event : any, share : PostShare) => {
    setSelectedShare(share);
    setClicked(true);
  };

  const route = `/get_website_posts?host=${url.host}&pathname=${url.pathname}&search=${encodeURIComponent(url.search)}`;

  const { data, status } = useQuery<any, string>(route);

  // console.log(data);
  let shares;
  if (status === 'error') {
    shares = <div>Error</div>;
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
    if (data.Shares && data.Shares.length > 0) {
      shares = data!.Shares?.map((share: PostShare) => (
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
                  (user && user.ID && user.ID === share.Sender.ID) ? share.Receiver.UserName : share.Sender.UserName
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
                  <FreedPost initPost={selectedShare?.Post} key={selectedShare?.PostID} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
}
