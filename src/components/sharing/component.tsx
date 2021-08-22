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
  useMutation,
} from 'react-query';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

// import { render } from 'react-dom';
import Screenshot from './screenshot';
import Dropdown from './dropdown';
// import { fetchResource } from '../../utils';
import { isValidURL, createDiv, screenShot } from '../../utils';

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

  const postShare = async (event : any) => {
    event.preventDefault();
    // const shareURL = new URL(url);
    const data = {
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
        data,
      },
      {
        onSuccess: (response : any) => {
          uploadImage(event, response.Post.ID);
          setFriendEmails([]);
          setComment('');
          setDataURL('');
          setOpen(true);
          // uploadImage(event, "1");
        },
      },
    );
    return res;
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
      <form onSubmit={postShare}>
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
        {/* <Screenshot
          modalContainer={bbox}
          dataURL={dataURL}
          setDataURL={setDataURL}
          rect={rect}
          setRect={setRect}
        /> */}
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
        <Button type="submit"> Share </Button>
      </form>
    </Box>
  );
};
