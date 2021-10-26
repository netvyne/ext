/* eslint-disable max-len */
import {
  Box, Grid, IconButton, Tooltip
} from '@material-ui/core';
// import "./styles.scss";
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles, Theme } from '@material-ui/core/styles';
// import ScreenCapture from './screenCapture'
import TextField from '@material-ui/core/TextField';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import React, {
  FunctionComponent, useEffect, useState
} from 'react';
import {
  useMutation
} from 'react-query';
import { User } from '../../../types/common/types';
import { getCurrentUser } from '../../auth/auth';
import { createDiv, isValidURL, screenShot } from '../../utils';
import Dropdown from './dropdown';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export const Sharing: FunctionComponent = () => {
//   const queryClient = new QueryClient();

  const [shareSeparately, setShareSeparately] = React.useState(false);
  const [url, setUrl] = useState<any>({});
  const [comment, setComment] = React.useState('Check this out!');
  const [conversationIDs, setConversationIDs] = React.useState([]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [dataURL, setDataURL] = React.useState('');

  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertText, setAlertText] = React.useState('');

  const [sharedConvs, setSharedConvs] = React.useState<any>([]);
  const [sharedConTitles, setSharedConTitles] = React.useState<any>([]);
  const [user, setUser] = React.useState<User | null>();

  const [friendHandles, setFriendHandles] = React.useState([]);
  const [createConv, setCreateConv] = React.useState(false);
  const [dropdownRefetch, setDropdownRefetch] = React.useState(Date());

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

  // const route = `/get_website_posts?host=${url.host}&pathname=${url.pathname}&search=${encodeURIComponent(url.search)}`;
  // const { data, status } = useQuery<any, string>(route);

  useEffect(() => {
    const queryInfo = { active: true };
    if (chrome.tabs) {
      chrome.tabs.query(queryInfo, (tabs) => {
        const newUrl : any = isValidURL(tabs[0].url);
        const formatedUrl = {
          pathname: newUrl.pathname,
          host: newUrl.host,
          search: newUrl.search,
          Title: tabs[0].title,
        };
        console.log('formatedUrl :::: ', formatedUrl);
        setUrl(formatedUrl);
      });
    }
    chrome.runtime.onMessage.addListener(handleMessage);
    // if (data && data.Posts.length > 0) {
    //   const covnIDs : any = [];
    //   const ConvTitles : any = [];
    //   data.Posts.map((post : any, s : number) => {
    //     covnIDs.push(post.Conversation.ID);
    //     ConvTitles.push(`${post.Conversation.Title}`);
    //     return covnIDs;
    //   });
    //   setSharedConvs(covnIDs);
    //   setSharedConTitles(ConvTitles);
    // }
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
  const uploadImage = async (event : any, postId : string) => {
    event.preventDefault();
    const file = dataURLtoFile(dataURL, 'Image');
    const formData = new FormData();
    formData.append('Image', file, file.name);
    formData.append('Type', 'screenshot');
    formData.append('ID', postId);
    mutation.mutate(
      // @ts-ignore
      {
        route: '/upload_image',
        data: formData,
      },
    );
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
      ConversationIDs: conversationIDs,
    };
    const res = shareMutation.mutate(
      // @ts-ignore
      {
        route: '/post_user_post',
        data: mutateData,
      },
      {
        onSuccess: (response : any) => {
          setUrl('');
          setComment('Check this out!');
          setDropdownRefetch(Date());
          setConversationIDs([]);
          setFriendHandles([]);
          setCreateConv(false);
          uploadImage(event, response.Post.ID);
          setDataURL('');
          setOpen(true);
        },
      },
    );
    return res;
  };

  const handleClickOpenAlert = (event : any) => {
    event.preventDefault();
    let i = 0;
    const commonConvs : any = [];
    for (i = 0; i < conversationIDs.length; i += 1) {
      if (sharedConvs.indexOf(conversationIDs[i]) > -1) {
        commonConvs.push(`${sharedConTitles[sharedConvs.indexOf(conversationIDs[i])]}`);
      }
    }
    if (commonConvs.length > 0) {
      setAlertText(commonConvs.map((email : any, e: number) => <li>{email}</li>));
      setOpenAlert(true);
    } else {
      postShare(event);
    }
  };

  const handleCloseAlert = (event : any, option: string) => {
    if (option === 'agree') {
      postShare(event);
    }
    setOpenAlert(false);
  };

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

  return (
    <Box m={1}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Post has been shared successfully!
        </Alert>
      </Snackbar>
      {/* <Dialog
        open={openAlert}
        onClose={(e) => handleCloseAlert(e, 'cancel')}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Duplicate share alert</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have already share this post with following conversation(s).
            Do you want to continue?
            {alertText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => handleCloseAlert(e, 'disagree')} color="primary">
            No
          </Button>
          <Button onClick={(e) => handleCloseAlert(e, 'agree')} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog> */}
      <form onSubmit={postShare}>
        <Grid component={Box} mb={2}>
          <Dropdown dropdownRefetch={dropdownRefetch} setConversationIDs={setConversationIDs} mode="conv" />
        </Grid>
        <Grid component={Box}>
          <Dropdown dropdownRefetch={dropdownRefetch} setFriendHandles={setFriendHandles} mode="friends" />
        </Grid>
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
        <Grid>
          <FormControlLabel
            control={(
              <Checkbox
                checked={shareSeparately}
                onChange={(e: any) => setShareSeparately(e.target.checked)}
              />
            )}
            label="Share Separately"
          />
          <Tooltip title="This creates a separate comment thread for each friend you share with.">
            <span>
              <IconButton disabled><HelpOutlineIcon /></IconButton>
            </span>
          </Tooltip>
        </Grid>
        <Grid>
          <FormControlLabel
            control={(
              <Checkbox
                checked={createConv}
                onChange={(e: any) => setCreateConv(e.target.checked)}
              />
            )}
            label="Create Group Conversation"
          />
          <Tooltip title="This creates a group conversation out of the friend(s) selected from the 'Select Friend(s)...' dropdown.">
            <span>
              <IconButton disabled><HelpOutlineIcon /></IconButton>
            </span>
          </Tooltip>
        </Grid>
        <Box m={1}>
          <TextField
            value={comment}
            onInput={(e : any) => setComment(e.target.value)}
            id="nv-message"
            label="Message"
            placeholder="Lookit!"
            fullWidth
            multiline
            rows={3}
          />
        </Box>
        <Button type="submit" disabled={(conversationIDs.length === 0 && friendHandles.length === 0) || !user?.Registered}> Share </Button>
      </form>
    </Box>
  );
};
