/* eslint-disable max-len */
import CancelIcon from '@mui/icons-material/Cancel';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ReplyIcon from '@mui/icons-material/Reply';
import {
  Box, Button, Grid, IconButton, Paper,
  TextField, Typography
} from '@mui/material';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import React, {
  useEffect, useRef, useState
} from 'react';
import { useMutation } from 'react-query';
import { ChatMessage } from '../../../types/common/types';
import { isValidURL } from '../../utils';
import './styles.scss';

const chatFormTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          width: '30%',
          color: '#ffffff',
          backgroundColor: '#9F00CF',
          height: '40px',
          marginTop: '10px',
          float: 'right',
          '&:hover': {
            background: '#33DA00',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '88%',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderColor: 'transparent',
        },
        input: {
          borderColor: 'transparent',
        },
        notchedOutline: {
          borderColor: 'transparent',
        },
      },
    }
  },
});

const parentChatTheme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '20px',
          marginTop: '5px',
          maxWidth: 500,
        },
      },
    },
  },
});

const PREFIX = 'CHAT';
const classes = {
  root: `${PREFIX}-root`,
};

const ChatForm = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  marginLeft: '5px',
  marginBottom: '10px',
  marginRight: '20px',
}));

const Root = styled('div')(() => ({
  [`&.${classes.root}`]: {
    flexGrow: 1,
  },
}));

const Chat = () => {
  const [comment, setComment] = React.useState('');
  const [parentChat, setParentChat] = useState<ChatMessage | null>();
  const webSocket = useRef<WebSocket | null>(null);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [url, setUrl] = useState<any>({});
  const [show, setShow] = React.useState(false);
  const messagesEndRef: any = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  function createSocket(currentUrl : any) {
    const publicApiUrl : any = process.env.REACT_APP_PUBLIC_API;
    const socketUrl = publicApiUrl.replace('http', 'ws');
    const socket = new WebSocket(`${socketUrl}/get_chat_socket?host=${currentUrl.host}&pathname=${currentUrl.pathname}&search=${encodeURIComponent(currentUrl.search)}`);
    // console.log('Socket created', socket);
    if (!socket) {
      const intervalID = setInterval(alert, 30000);
      clearInterval(intervalID);
      setInterval(() => {
        createSocket(currentUrl);
      }, 30000);
    }
    webSocket.current = socket;
    webSocket.current.onmessage = (message : any) => {
      const response : any = JSON.parse(message.data);
      messages.push(response);
      setMessages(messages);
    };
    return () => { webSocket.current?.close(); };
  }

  let parentChatTitle : any = '';
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
        createSocket(formatedUrl);
      });
    }
  }, []);

  useEffect(scrollToBottom, [messages]);

  const mutation = useMutation({});
  const postChat = async (event : any) => {
    event.preventDefault();
    const data = {
      ParentChatID: parentChat?.ID,
      Comment: comment,
      URL: {
        Host: url.host,
        Pathname: url.pathname,
        Search: url.search,
      },
    };
      // @ts-ignore
    const res = mutation.mutate(
      // @ts-ignore
      {
        route: '/post_chat',
        data,
      },
      {
        onSuccess: () => {
          setComment('');
          setParentChat(null);
          scrollToBottom();
        },
      },
    );

    return res;
  };

  const addEmoji = async (emoji : any) => {
    setComment(`${comment} ${emoji.native}`);
    setShow(false);
  };

  const msgs = messages.map((message : any) => (
    <Root
      className={classes.root}
    >
      <Grid
        container
        spacing={2}
      >
        <div className="mydivouter">
          <div className="chatTextMessage">
            <div>
              <span style={{ width: '20px', marginRight: '10px', fontWeight: 'bold' }}>{message.Author.UserName}</span>
              <span>{message.Comment}</span>
            </div>
            <div>
              <b>{(message.ParentChat) ? `in reply to @${message.ParentChat.Author.UserName} : ${message.ParentChat.Comment}` : ''}</b>
            </div>
          </div>
          <button
            type="button"
            className="mybuttonoverlap btn"
            onClick={() => {
              setParentChat(message);
            }}
          >
            <ReplyIcon />

          </button>
        </div>

      </Grid>
    </Root>
  ));

  if (parentChat?.ID) {
    parentChatTitle = (
      <Root className={classes.root}>
        <ThemeProvider theme={parentChatTheme}>
          <Paper>
            <Grid container spacing={2}>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      Replying to @
                      {parentChat.Author.UserName}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {parentChat.Author.UserName}
                      {' '}
                      :
                      {' '}
                      {parentChat.Comment}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Button type="button" size="small" color="primary" endIcon={<CancelIcon />} onClick={() => { setParentChat(null); }} />
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </ThemeProvider>
      </Root>
    );
  }
  return (
    <Box height="100%">
      <div className="chat-messages">
        {msgs}
        <div ref={messagesEndRef} />
      </div>
      <Grid item xs container sx={{ position: 'fixed', bottom: 0 }}>
        <Grid item xs={12}>
          {parentChatTitle}
        </Grid>
        <Grid item xs={12}>
          <ThemeProvider theme={chatFormTheme}>
            <ChatForm onSubmit={postChat}>
              <Grid item xs={12} container className="livechat-textfield">
                <TextField
                  value={comment}
                  onInput={(e : any) => setComment(e.target.value)}
                  placeholder="Send a message"
                  inputProps={{
                    underline: {
                      '&&&:before': {
                        borderBottom: 'none'
                      },
                      '&&:after': {
                        borderBottom: 'none'
                      }
                    }
                  }}
                />
                {show ? (
                  <div>
                    <CancelIcon
                      onClick={() => setShow(false)}
                      sx={{
                        position: 'fixed',
                        zIndex: '99',
                        bottom: '443px',
                        backgroundColor: '#ffffff',
                        border: 'solid 1px #d9d9d9',
                        color: '#858585',
                        borderRadius: '50%',
                        width: '25px',
                        height: '25px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        right: '7px',
                        cursor: 'pointer',
                      }}
                    >
                      X

                    </CancelIcon>
                    <Picker
                      set="apple"
                      title=""
                      emoji="point_up"
                      style={{
                        position: 'fixed', zIndex: 10, bottom: '20px', right: '20px'
                      }}
                      onSelect={addEmoji}
                    />
                  </div>
                )
                  : <IconButton onClick={() => setShow(true)}><InsertEmoticonIcon /></IconButton> }
              </Grid>
              <Grid item xs={12} container>
                <Button type="submit" size="small" color="primary">

                  {' '}
                  Chat
                  {' '}
                </Button>
              </Grid>
            </ChatForm>
          </ThemeProvider>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Chat;
