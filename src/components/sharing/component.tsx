/* eslint-disable max-len */
import CloseIcon from '@mui/icons-material/Close';
import GroupIcon from '@mui/icons-material/Group';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import KeyboardBackspace from '@mui/icons-material/KeyboardBackspace';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Box,
  Button, Checkbox, CircularProgress, FormControlLabel, Grid, IconButton,
  Snackbar, Tooltip, Typography
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MDEditor from '@uiw/react-md-editor';
import React, {
  FunctionComponent, useEffect, useState
} from 'react';
import {
  useMutation, useQuery
} from 'react-query';
import { Post, User } from '../../../types/common/types';
import { getCurrentUser } from '../../auth/auth';
import { createDiv, isValidURL, screenShot } from '../../utils';
import PostShare from '../talk/PostShare';
import Dropdown from './dropdown';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface GetWebsitePostsQuery {
  FriendsPosts: Post[];
  ConversationsPosts: Post[];
}

const sharingTheme = createTheme({
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

export const Sharing: FunctionComponent = () => {
//   const queryClient = new QueryClient();

  const [shareSeparately, setShareSeparately] = React.useState(false);
  const [markSensitive, setMarkSensitive] = React.useState(false);
  const [url, setUrl] = useState<any>({});
  const [comment, setComment] = React.useState('Check this out!');
  const [conversationID, setConversationID] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const [dataURL, setDataURL] = React.useState('');

  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertText, setAlertText] = React.useState('');

  const [sharedConvs, setSharedConvs] = React.useState<any>([]);
  const [sharedConTitles, setSharedConTitles] = React.useState<any>([]);
  const [user, setUser] = React.useState<User | any>();

  const [friendHandles, setFriendHandles] = React.useState([]);
  const [createConv, setCreateConv] = React.useState(false);
  const [dropdownRefetch, setDropdownRefetch] = React.useState(Date());
  const [dropdown, setDropdown] = React.useState(false);
  const [moreOptions, setMoreOptions] = React.useState(false);
  const [showTalkTree, setShowTalkTree] = React.useState(false);
  const [friendsPosts, setFriendsPosts] = React.useState<Post[]>([]);
  const [post, setPost] = React.useState<any>([]);
  const [conversationsPosts, setConversationsPosts] = React.useState<Post[]>([]);
  const [isUserRegistered, setIsUserRegistered] = React.useState<any>(false);

  const toggleMoreOptions = () => {
    setMoreOptions(!moreOptions);
  };
  const toggleDropdown = () => {
    setConversationID(0);
    setFriendHandles([]);
    setFriendHandles([]);
    setDropdownRefetch(Date());
    setDropdown(!dropdown);
    setShareSeparately(false);
    setMarkSensitive(false);
    setCreateConv(false);
  };

  getCurrentUser().then((currentUser: User | null) => setUser(currentUser));

  function cropcallback() {
    chrome.storage.local.get({ screenshot: null }, (data) => {
      setDataURL(data.screenshot);
    });
  }

  const handleMessage = (msg : any) => {
    if (msg.target === 'app') {
      if (msg.type === 'screenshotcropped') {
        chrome.storage.local.get({ screenshot: null }, (data) => {
          setDataURL(data.screenshot);
        });
      }
    }
  };

  const { data, refetch, status } = useQuery<GetWebsitePostsQuery, string>(
    `/get_website_posts?host=${url.host}&pathname=${url.pathname}&search=${encodeURIComponent(url.search)}`, {
      onSuccess: (postData) => {
        setFriendsPosts(postData.FriendsPosts);
        setConversationsPosts(postData.ConversationsPosts);
      }
    }
  );

  const profileQuery = useQuery<any>('/profile', {
    onSuccess: (statusResponse) => {
      setIsUserRegistered(statusResponse.CurrentUser.Registered);
    }
  });

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
        };
        setUrl(formatedUrl);
      });
    }
    chrome.runtime.onMessage.addListener(handleMessage);
  }, []);
  // // // // // //

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const dataURLtoFile = (dataurl : any, filename : any) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n) {
      u8arr[n - 1] = bstr.charCodeAt(n - 1);
      n -= 1; // to make eslint happy
    }
    return new File([u8arr], filename, { type: mime });
  };

  const mutation = useMutation({});
  const uploadImage = async (postId : string) => {
    const file = dataURLtoFile(dataURL, 'Image');
    const formData = new FormData();
    formData.append('Image', file, file.name);
    formData.append('Type', 'screenshot');
    formData.append('ID', postId);
    // mutation.mutate(
    //   // @ts-ignore
    //   {
    //     route: '/upload_image',
    //     data: formData,
    //   },
    // );
    const res = mutation.mutate(
      // @ts-ignore
      {
        route: '/upload_image',
        data: formData,
      },
      {
        onSuccess: (response : any) => {
          setDataURL('');
        },
      },
    );
    return res;
  };

  function createTestDiv() {
    createDiv('createDiv'); // saves to local storage
  }

  function clearScreenShot() {
    screenShot('clear', cropcallback);
  }

  const shareMutation = useMutation({});
  const postShare = async (event: any) => {
    event.preventDefault();
    const mutateData = {
      Host: url.host,
      Pathname: url.pathname,
      Search: url.search,
      Comment: comment,
      Separate: shareSeparately,
      ReceiverHandles: friendHandles,
      CreateConv: createConv,
      ConversationID: conversationID,
      MarkSensitive: markSensitive,
    };
    const res = shareMutation.mutate(
      // @ts-ignore
      {
        route: '/post_user_post',
        data: mutateData,
      },
      {
        onSuccess: (response : any) => {
          setComment('Check this out!');
          setDropdownRefetch(Date());
          setConversationID(0);
          setFriendHandles([]);
          setShareSeparately(false);
          setMarkSensitive(false);
          setCreateConv(false);
          setCreateConv(false);
          if (dataURL !== '') {
            // console.log('Inside if condition');
            uploadImage(response.Post.ID);
            // setDataURL('');
          }
          setOpen(true);
          refetch();
        },
      },
    );
    return res;
  };

  const handleCloseAlert = (event : any, option: string) => {
    if (option === 'agree') {
      postShare(event);
    }
    setOpenAlert(false);
  };

  function notificationLink() {
    const href = `${process.env.PUBLIC_WEB}/auth/signin`;
    window.open(href, '_blank', 'noopener,noreferrer');
    return false;
  }

  // const mutation : any = useMutation(postShare);
  let bottom : any;
  if (mutation.isLoading) {
    bottom = (
      <Box>
        <Button type="submit">
          {' '}
          <CircularProgress color="inherit" size={20} />
        </Button>
      </Box>
    );
  } else if (mutation.isError) {
    bottom = (
      <Box>
        Error!
        <Button type="submit"> Share Site</Button>
      </Box>
    );
  } else if (mutation.isSuccess) {
    bottom = (
      <Box>
        Success!
        <Button type="submit"> Share Site</Button>
      </Box>
    );
  } else {
    // eslint-disable-next-line no-unused-vars
    bottom = (
      <Box>
        <Button type="submit"> Share Site</Button>
      </Box>
    );
  }
  const bbox = <Box />;

  let friendShares: any = '';
  let conversationShares: any = '';
  if (status === 'error') {
    friendShares = <div>Error</div>;
    conversationShares = <div>Error</div>;
  } else if (status === 'loading') {
    friendShares = <div>Loading</div>;
    conversationShares = <div>Loading</div>;
  } else {
    friendShares = friendsPosts.map((friend : any) => (
      <Grid
        item
        xs={12}
        style={{
          padding: '10px', backgroundColor: '#eceff1', marginBottom: '10px', cursor: 'pointer'
        }}
        onClick={() => { setShowTalkTree(true); setPost(friend); }}
      >
        {friend.Receivers.map((r: any) => ((user?.Handle === r.Handle) ? 'You' : r.FirstName)).join(', ').replace(/,([^,]*)$/, ' and $1')}
      </Grid>
    ));

    conversationShares = conversationsPosts.map((conversation : any) => (
      <Grid
        item
        xs={12}
        style={{
          padding: '10px', backgroundColor: '#eceff1', marginBottom: '10px', cursor: 'pointer'
        }}
        onClick={() => { setShowTalkTree(true); setPost(conversation); }}
      >
        {conversation.Receivers.map((cr: any) => ((user?.Handle === cr.Handle) ? 'You' : cr.FirstName)).join(', ').replace(/,([^,]*)$/, ' and $1')}
      </Grid>
    ));
  }

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <ThemeProvider theme={sharingTheme}>
      <Box m={1}>
        {!showTalkTree && (
        <Box m={1}>
          {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Post has been shared successfully!
            </Alert>
          </Snackbar> */}
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Post has been shared successfully!"
            action={action}
          />
          <form onSubmit={postShare}>
            {dropdown && (
            <Grid item container xs={12} direction="row" spacing={1} alignItems="center" wrap="nowrap">
              <Grid item xs={10}>
                <Dropdown dropdownRefetch={dropdownRefetch} setConversationID={setConversationID} mode="conv" />
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  sx={{
                    color: 'black',
                    '&:hover': {
                      color: '#757ce8',
                    },
                  }}
                  onClick={toggleDropdown}
                >
                  <PersonIcon />
                </IconButton>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  sx={{
                    color: moreOptions ? '#757ce8' : 'black',
                    '&:hover': {
                      color: '#757ce8',
                    }
                  }}
                  onClick={toggleMoreOptions}
                >
                  <SettingsIcon />
                </IconButton>
              </Grid>
            </Grid>
            )}
            {!dropdown && (
            <Grid item container xs={12} direction="row" spacing={1} alignItems="center" wrap="nowrap">
              <Grid item xs={10}>
                <Dropdown dropdownRefetch={dropdownRefetch} setFriendHandles={setFriendHandles} mode="friends" />
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  sx={{
                    color: 'black',
                    '&:hover': {
                      color: '#757ce8',
                    },
                  }}
                  onClick={toggleDropdown}
                >
                  <GroupIcon />
                </IconButton>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  sx={{
                    color: moreOptions ? '#757ce8' : 'black',
                    '&:hover': {
                      color: '#757ce8',
                    }
                  }}
                  onClick={toggleMoreOptions}
                >
                  <SettingsIcon />
                </IconButton>
              </Grid>
            </Grid>
            )}
            {bbox}
            <Box>
              <Button
                type="button"
                onClick={createTestDiv}
              >
                Include Screenshot
              </Button>
              <img
                style={{ display: dataURL ? 'block' : 'none', width: '100%' }}
                src={dataURL}
                alt="cropped"
              />
              <Button
                style={{ display: dataURL ? 'block' : 'none' }}
                type="button"
                onClick={clearScreenShot}
              >
                Clear
              </Button>
            </Box>
            {!dropdown && moreOptions && (
            <div>
              <>
                <FormControlLabel
                  style={{
                    marginBottom: '0px',
                  }}
                  control={(
                    <Checkbox
                      style={{
                        color: '#757ce8'
                      }}
                      checked={createConv}
                      onChange={(e: any) => setCreateConv(e.target.checked)}
                    />
                      )}
                  label="Create Group"
                />
                <Tooltip title="This creates a group out of the friend(s) you selected for future ease of sharing.">
                  <span>
                    <IconButton disabled><HelpOutlineIcon /></IconButton>
                  </span>
                </Tooltip>
                <FormControlLabel
                  style={{
                    marginBottom: '0px',
                  }}
                  control={(
                    <Checkbox
                      style={{
                        color: '#757ce8',
                      }}
                      checked={shareSeparately}
                      onChange={(e: any) => setShareSeparately(e.target.checked)}
                    />
                      )}
                  label="Share Separately"
                />
                <Tooltip title="This creates a separate comment thread for each friend you selected (instead of the default single thread). This will not work when creating a group.">
                  <span>
                    <IconButton disabled><HelpOutlineIcon /></IconButton>
                  </span>
                </Tooltip>
                <FormControlLabel
                  style={{
                    marginBottom: '0px',
                  }}
                  control={(
                    <Checkbox
                      style={{
                        color: '#757ce8',
                      }}
                      checked={markSensitive}
                      onChange={(e: any) => setMarkSensitive(e.target.checked)}
                    />
                      )}
                  label="Mark as Sensitive"
                />
                <Tooltip title="This marks your post as sensitive and provides recipients with a warning before they view it.">
                  <span>
                    <IconButton disabled><HelpOutlineIcon /></IconButton>
                  </span>
                </Tooltip>
              </>
            </div>
            )}
            {dropdown && moreOptions && (
            <div>
              <>
                <FormControlLabel
                  control={(
                    <Checkbox
                      style={{
                        color: '#757ce8',
                      }}
                      checked={shareSeparately}
                      onChange={(e: any) => setShareSeparately(e.target.checked)}
                    />
                      )}
                  label="Share Separately"
                />
                <Tooltip title="This creates a separate comment thread for each user in the group you selected (instead of the default single thread). You will not be able to filter for this post by group.">
                  <span>
                    <IconButton disabled><HelpOutlineIcon /></IconButton>
                  </span>
                </Tooltip>
                <FormControlLabel
                  control={(
                    <Checkbox
                      style={{
                        color: '#757ce8',
                      }}
                      checked={markSensitive}
                      onChange={(e: any) => setMarkSensitive(e.target.checked)}
                    />
                      )}
                  label="Mark as Sensitive"
                />
                <Tooltip title="This marks your post as sensitive and provides recipients with a warning before they view it.">
                  <span>
                    <IconButton disabled><HelpOutlineIcon /></IconButton>
                  </span>
                </Tooltip>
              </>
            </div>
            )}
            <Box m={1}>
              <MDEditor
                textareaProps={{
                  placeholder: 'Lookit!',
                }}
                height={100}
                value={comment}
                preview="edit"
                onChange={(value: string | undefined) => value !== undefined && setComment(value)}
              />
            </Box>
            <Button type="submit" disabled={(conversationID === 0 && friendHandles.length === 0) || !user?.Registered}> Share </Button>
            <Box width="100%">
              {!isUserRegistered && (
              <Button
                type="button"
                variant="outlined"
                color="primary"
                onClick={(e) => { notificationLink(); }}
              >
                Log in to share with friends
              </Button>
              )}
            </Box>
          </form>
          <Grid item container xs={12} direction="column" spacing={1} wrap="nowrap">
            {conversationShares.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="h6">
                Shared with conversations
              </Typography>
              {conversationShares}
            </Grid>
            )}
            {friendShares.length > 0 && (
            <Grid item xs={12}>
              <Typography variant="h6">
                Shared with friends
              </Typography>
              {friendShares}
            </Grid>
            )}
          </Grid>
        </Box>
        )}
        {showTalkTree && (
        <Box>
          <IconButton onClick={() => { setShowTalkTree(false); refetch(); }}>
            <KeyboardBackspace />
          </IconButton>
          <PostShare post={post} key={post.ID} defUser={user} setShowTalkTree={setShowTalkTree} refetch={refetch} />
        </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};
