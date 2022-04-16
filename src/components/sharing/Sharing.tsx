/* eslint-disable max-len */
import CloseIcon from '@mui/icons-material/Close';
import ReplyIcon from '@mui/icons-material/Reply';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import Typography from '@mui/material/Typography';
import MDEditor from '@uiw/react-md-editor';
import { AxiosError } from 'axios';
import { sha256 } from 'js-sha256';
import React, { useEffect } from 'react';
import {
  useMutation, useQuery
} from 'react-query';
import { Post, User } from '../../../types/common/types';
import { createDiv, screenShot } from '../../utils';
import HCaptcha from '../common/hcaptcha';
import Dropdown from './dropdown';
import './styles.scss';

interface GetWebsitePostsQuery {
  FriendsPosts: Post[];
  ConversationsPosts: Post[];
}
const sharButtonTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#9F00CF',
          color: '#ffffff',
          marginTop: '10px',
          '&.Mui-disabled': {
            color: '#6c757d',
            backgroundColor: '#ffffff'
          }
        }
      },
    }
  }
});
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
    }
  }
});

interface Props {
  defUser: User;
  url: any;
  themeColors: any;
}
const Sharing = ({ defUser, url, themeColors } : Props) => {
  const [comment, setComment] = React.useState('Check this out!');
  const [open, setOpen] = React.useState(false);

  const [dataURL, setDataURL] = React.useState('');
  const [markSensitive, setMarkSensitive] = React.useState(false);
  const [createConv, setCreateConv] = React.useState(false);
  const [receiverIDs, setReceiverIDs] = React.useState([]);
  const [dropdownRefetch, setDropdownRefetch] = React.useState(Date());
  const [conversationsPosts, setConversationsPosts] = React.useState<Post[]>([]);
  const [showCaptcha, setShowCaptcha] = React.useState(false);
  const [captchaToken, setCaptchaToken] = React.useState('');
  const captchaRef = React.createRef<HCaptcha>();

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

  const urlHash = sha256(`${url.host}${url.pathname}${url.search}`);
  const { refetch, status } = useQuery<GetWebsitePostsQuery, string>(
    `/get_website_posts?url_hash=${urlHash}`, {
      onSuccess: (postData) => {
        setConversationsPosts(postData.ConversationsPosts);
      }
    }
  );

  useEffect(() => {
    chrome.runtime.onMessage.addListener(handleMessage);
  }, []);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  function clickTag(postID : number) {
    window.open(`${process.env.PUBLIC_WEB}/p/${postID}`, '_blank', 'noopener,noreferrer');
    return false;
  }

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
  function createTestDiv() {
    createDiv(); // saves to local storage
  }

  function clearScreenShot() {
    screenShot('clear', cropcallback);
  }

  const shareMutation = useMutation({});
  const postShare = async (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    if (dataURL !== '') {
      const file = dataURLtoFile(dataURL, 'Image');
      formData.append('Image', file, file.name);
    }
    formData.append('Type', 'screenshot');
    formData.append('Host', url.host);
    formData.append('Pathname', url.pathname);
    formData.append('Search', url.search);
    formData.append('Comment', comment);
    formData.append('CreateConv', createConv.toString());
    formData.append('ReceiverIDs', JSON.stringify(receiverIDs));
    formData.append('MarkSensitive', markSensitive.toString());
    formData.append('PostType', 'website');
    formData.append('CaptchaToken', captchaToken);
    const res = shareMutation.mutate(
      // @ts-ignore
      {
        route: '/post_user_post_alt',
        data: formData,
      },
      {
        onSuccess: () => {
          setComment('Check this out!');
          setMarkSensitive(false);
          setCreateConv(false);
          setDropdownRefetch(Date());
          setShowCaptcha(false);
          setDataURL('');
          setOpen(true);
          refetch();
        },
        onError: (err: AxiosError) => {
          if (err.response?.status === 402) {
            setShowCaptcha(true);
          }
        }
      },
    );
    return res;
  };

  function notificationLink() {
    const href = `${process.env.PUBLIC_WEB}/auth/signin`;
    window.open(href, '_blank', 'noopener,noreferrer');
    return false;
  }

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

  let conversationShares: any = '';
  const nothingPlaceHolder = (
    <Grid
      item
      xs={12}
      style={{
        padding: '10px', backgroundColor: themeColors.divBackground, marginBottom: '10px', cursor: 'pointer', color: themeColors.commentText
      }}
    >
      Nothing yet. Be the first to share!
    </Grid>
  );
  if (status === 'error') {
    conversationShares = <div>Error</div>;
  } else if (status === 'loading') {
    conversationShares = <div>Loading</div>;
  } else {
    conversationShares = conversationsPosts.map((conversation : any) => (
      <Grid
        item
        xs={12}
        style={{
          padding: '10px', backgroundColor: themeColors.divBackground, marginBottom: '10px', cursor: 'pointer', color: themeColors.commentText
        }}
        onClick={() => { clickTag(conversation.ID); }}
      >
        {conversation.Receivers.map((cr: any) => ((defUser?.Handle === cr.Handle) ? 'You' : cr.FirstName)).join(', ').replace(/,([^,]*)$/, ' and $1')}
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
      <Box mt={1}>
        <Box>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Post has been shared successfully!"
            action={action}
          />
          <form onSubmit={postShare}>
            <Grid item container xs={12} direction="row" spacing={1} alignItems="center" wrap="nowrap">
              <Grid item xs={12}>
                <Dropdown dropdownRefetch={dropdownRefetch} setConversationID={setReceiverIDs} mode="conv" themeColors={themeColors} />
              </Grid>
            </Grid>
            {bbox}
            <Box>
              <Button
                type="button"
                onClick={createTestDiv}
                sx={{ paddingLeft: '0PX', color: themeColors.linkColor }}
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
            <Box sx={{ marginLeft: '0PX' }}>
              <MDEditor
                textareaProps={{
                  placeholder: 'Lookit!',
                }}
                height={100}
                value={comment}
                preview="edit"
                hideToolbar
                onChange={(value: string | undefined) => value !== undefined && setComment(value)}
              />
            </Box>
            <ThemeProvider theme={sharButtonTheme}>
              <Button className="sharePostBtn" type="submit" disabled={(receiverIDs.length === 0) || !defUser?.Registered}>
                {' '}
                Share
                {' '}
                <ReplyIcon style={{ transform: 'scaleX(-1)' }} />
                {' '}
              </Button>
            </ThemeProvider>
            <Box width="100%">
              {!defUser?.Registered && (
              <Button
                type="button"
                variant="outlined"
                color="primary"
                onClick={() => { notificationLink(); }}
              >
                Log in to share with friends
              </Button>
              )}
            </Box>
            {showCaptcha
              && (
                <HCaptcha
                  sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY || ''}
                  onVerify={(token) => setCaptchaToken(token)}
                  ref={captchaRef}
                />
              )}
          </form>
          <Grid item container xs={12} direction="column" spacing={1} wrap="nowrap">
            <Grid item xs={12}>
              <Typography variant="h6">
                Shared with conversations
              </Typography>
              { (conversationShares.length > 0) ? conversationShares : nothingPlaceHolder }
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Sharing;
