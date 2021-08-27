/* eslint-disable max-len */
import React, {
  FunctionComponent, useEffect, useState, useRef,
} from 'react';
// import "./styles.scss";

import Button from '@material-ui/core/Button';
// import ScreenCapture from './screenCapture'
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Box } from '@material-ui/core';
import {
  useMutation, useQuery,
} from 'react-query';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, Theme } from '@material-ui/core/styles';

// import { render } from 'react-dom';
import { AnyAaaaRecord } from 'dns';
import Screenshot from './screenshot';
import Dropdown from './dropdown';
import { getCurrentUser } from '../../auth/auth';
import { isValidURL, createDiv, screenShot } from '../../utils';
import { User } from '../../../types/common/types';

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

  const [shareSeparately, setShareSeparately] = React.useState(true);
  const [url, setUrl] = useState<any>({});
  const [comment, setComment] = React.useState('');
  const [friendEmails, setFriendEmails] = React.useState([]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [dataURL, setDataURL] = React.useState('');
  const [rect, setRect] = React.useState({ startX: 0, startY: 0 });

  const [message, setMessage] = React.useState<any>('');
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertText, setAlertText] = React.useState('');

  const [sharedEmails, setSharedEmails] = React.useState<any>([]);
  const [sharedNames, setSharedNames] = React.useState<any>([]);
  const [user, setUser] = React.useState<User | null>();
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

  const route = `/get_website_posts?host=${url.host}&pathname=${url.pathname}&search=${encodeURIComponent(url.search)}`;
  const { data, status } = useQuery<any, string>(route);

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
        setUrl(formatedUrl);
      });
    }
    chrome.runtime.onMessage.addListener(handleMessage);
    if (data && data.Shares.length > 0) {
      const emails : any = [];
      const names : any = [];
      data.Shares.map((share : any, s : number) => {
        if ((user && user.Email && user.Email === share.Sender.Email)) {
          emails.push(`${share.Receiver.Email}`);
          names.push(`${share.Receiver.FirstName} ${share.Receiver.LastName}`);
        } else {
          emails.push(`${share.Sender.Email}`);
          names.push(`${share.Sender.FirstName} ${share.Sender.LastName}`);
        }
        return emails;
      });
      setSharedEmails(emails);
      setSharedNames(names);
    }
  }, [data]);
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

  const postShare = async (event : any) => {
    event.preventDefault();
    // const shareURL = new URL(url);
    const postData = {
      Host: url.host,
      Pathname: url.pathname,
      Search: url.search,
      Comment: comment,
      Separate: shareSeparately,
      ReceiverEmails: friendEmails,
    };
    const res = mutation.mutate(
      // @ts-ignore
      {
        route: '/post_user_post',
        data: postData,
      },
      {
        onSuccess: (response : any) => {
          uploadImage(event, response.Post.ID);
          setFriendEmails([]);
          setComment('');
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
    const commonEmail : any = [];
    for (i = 0; i < friendEmails.length; i += 1) {
      console.log('index :: ', sharedEmails.indexOf(friendEmails[i]), ' value : ', friendEmails[i]);
      if (sharedEmails.indexOf(friendEmails[i]) > -1) {
        commonEmail.push(`${sharedNames[sharedEmails.indexOf(friendEmails[i])]} < ${friendEmails[i]}>`);
      }
    }
    if (commonEmail.length > 0) {
      setAlertText(commonEmail.map((email : any, e: number) => <li>{email}</li>));
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
      <Dialog
        open={openAlert}
        onClose={(e) => handleCloseAlert(e, 'cancel')}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Duplicate share alert</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have already share this post with following friends.
            Do you want to continue?
            {alertText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => handleCloseAlert(e, 'disagree')} color="primary">
            Yes
          </Button>
          <Button onClick={(e) => handleCloseAlert(e, 'agree')} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
      <form>
        <Dropdown setFriendEmails={setFriendEmails} key={mutation.isLoading} />
        {bbox}
        <Box>
          <Button
            type="button"
            onClick={createTestDiv}
          >
            Include Screenshot
          </Button>
          <img
            style={{ display: dataURL ? 'block' : 'none' }}
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
        <FormControlLabel
          control={(
            <Checkbox
              defaultChecked
              checked={shareSeparately}
              onChange={(e : any) => setShareSeparately(e.target.checked)}
            />
              )}
          label="Share Separately"
        />
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
        <Button type="button" onClick={handleClickOpenAlert}> Share </Button>
      </form>
    </Box>
  );
};
