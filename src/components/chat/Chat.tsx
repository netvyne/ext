/* eslint-disable max-len */
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@mui/icons-material/Cancel';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ReplyIcon from '@mui/icons-material/Reply';
import {
  Box, Button, Grid, IconButton, Paper,
  TextField, Typography
} from '@mui/material';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import React, {
  useEffect, useRef, useState
} from 'react';
import { useMutation } from 'react-query';
import { ChatMessage, User } from '../../../types/common/types';
import { getCurrentUser } from '../../auth/auth';
import { isValidURL } from '../../utils';
import './styles.scss';

  interface GetUserQuery {
    initCurrentUser: User[];
  }

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: '5px',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  chatBubble: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  messageContainer: {
    position: 'fixed',
    bottom: '0',
  },
  chatForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginLeft: '20px',
    marginBottom: '10px',
    marginRight: '20px',
  },
  messageTextField: {
    width: '88%',
  },
  messageSendButton: {
    width: '30%',
    color: '#ffffff',
    backgroundColor: '#9F00CF',
    height: '40px',
    marginTop: '10px',
    float: 'right',
    '&:hover': {
      background: '#33DA00',
    },
  }
}));

const Chat = ({ initCurrentUser } : GetUserQuery) => {
  const [comment, setComment] = React.useState('');
  const [parentChat, setParentChat] = useState<ChatMessage | null>();
  const webSocket = useRef<WebSocket | null>(null);
  const [messages, setMessages] = React.useState<any>([]);
  const [url, setUrl] = useState<any>({});
  const [user, setUser] = React.useState<User|any>();
  const [showAction, setShowAction] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [websiteId, setWebsiteId] = React.useState<any>(null);
  const divRef : any = useRef(null);
  const messagesEndRef: any = useRef(null);
  getCurrentUser().then((currentUser:User|any) => setUser(initCurrentUser));

  const classes = useStyles();

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  function createSocket(currentUrl : any) {
    const publicApiUrl : any = process.env.REACT_APP_PUBLIC_API;
    const socketUrl = publicApiUrl.replace('http', 'ws');
    const socket = new WebSocket(`${socketUrl}/get_chat_socket?website_id=0&host=${currentUrl.host}&pathname=${currentUrl.pathname}&search=${encodeURIComponent(currentUrl.search)}`);
    console.log('Socket created', socket);
    if (!socket) {
      const intervalID = setInterval(alert, 30000);
      clearInterval(intervalID);
      setInterval(() => {
        createSocket(currentUrl);
      }, 30000);
    }
    webSocket.current = socket;
    webSocket.current.onmessage = (message : any) => {
      console.log('messages :::::', message);
      const response : any = JSON.parse(message.data);
      messages.push(response);
      setMessages(messages);
    };
    return () => { console.log('Closing'); webSocket.current?.close(); };
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
    // if (messages.length === 0) {
    //   webSocket.current?.close();
    //   createSocket(url);
    // }
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
        onSuccess: (response : any) => {
          setComment('');
          setParentChat(null);
          scrollToBottom();
        },
      },
    );

    return res;
  };

  const addEmoji = async (emoji : any) => {
    console.log('here clicked', emoji);
    console.log('here clicked', emoji.native);
    setComment(`${comment} ${emoji.native}`);
    setShow(false);
  };

  const msgs = messages.map((message : any) => (
    <div
      className={classes.root}
    >
      <Grid
        container
        spacing={2}
        onMouseOver={() => setShowAction(true)}
        onMouseLeave={() => setShowAction(false)}
      >
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography>
                <b>
                  {message.Author.UserName}
                  {' '}
                  :
                  {' '}
                </b>
                {' '}
                {message.Comment}
              </Typography>
              <Typography color="textSecondary">
                <b>{(message.ParentChat) ? `in reply to @${message.ParentChat.Author.UserName} : ${message.ParentChat.Comment}` : ''}</b>
              </Typography>
            </Grid>
          </Grid>
          {showAction && (
            <Grid item>
              <Button
                type="submit"
                size="small"
                color="primary"
                endIcon={<ReplyIcon />}
                onClick={() => {
                  setParentChat(message);
                }}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  ));

  if (parentChat?.ID) {
    parentChatTitle = (
      <div className={classes.root}>
        <Paper className={classes.paper}>
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
      </div>
    );
  }
  return (
    <Box height="100%">
      <Typography className="live-chat-title" variant="h5">Live Chat</Typography>
      <div className="chat-messages">
        {msgs}
        <div ref={messagesEndRef} />
      </div>
      <Grid item xs container className={classes.messageContainer}>
        <Grid item xs={12}>
          {parentChatTitle}
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={postChat} className={classes.chatForm}>
            <Grid item xs={12} container className="livechat-textfield">
              <TextField
                value={comment}
                onInput={(e : any) => setComment(e.target.value)}
                placeholder="Send a message"
                className={classes.messageTextField}
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
                <Picker
                  set="apple"
                  title=""
                  emoji="point_up"
                  style={{
                    position: 'fixed', zIndex: 10, bottom: '20px', right: '20px'
                  }}
                  onSelect={addEmoji}
                />
              )
                : <IconButton onClick={() => setShow(true)}><InsertEmoticonIcon /></IconButton> }
            </Grid>
            <Grid item xs={12} container>
              <Button type="submit" size="small" color="primary" className={classes.messageSendButton}>
                {' '}
                Chat
                {' '}
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Chat;
