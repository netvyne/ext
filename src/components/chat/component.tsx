import React, {
  useEffect, useRef, useState,
} from 'react';
import { useQuery, useMutation } from 'react-query';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import ReplyIcon from '@material-ui/icons/Reply';
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { isValidURL } from '../../utils';
import { ChatMessage, User } from '../../../types/common/types';
import { getCurrentUser } from '../../auth/auth';

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
}));

// export const Chat : FunctionComponent = (props : any) => {
const Chat = ({ initCurrentUser } : GetUserQuery) => {
  const [comment, setComment] = React.useState('');
  const [parentChat, setParentChat] = useState<ChatMessage | null>();
  const webSocket = useRef<WebSocket | null>(null);
  const [messages, setMessages] = React.useState<any>([]);
  const [url, setUrl] = useState<any>({});
  const [user, setUser] = React.useState<User|any>();
  getCurrentUser().then((currentUser:User|any) => setUser(initCurrentUser));

  const classes = useStyles();

  function createSocket(currentUrl : any) {
    const socket = new WebSocket(`${process.env.REACT_SOCKET_API}/get_chat_socket?website_id=0&host=${currentUrl.host}&pathname=${currentUrl.pathname}&search=${encodeURIComponent(currentUrl.search)}`);
    console.log('Socket created', socket);
    webSocket.current = socket;
    webSocket.current.onmessage = (message : any) => {
      const response : any = JSON.parse(message.data);
      messages.push(response);
      console.log('messages ::: ', messages);
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
        },
      },
    );

    return res;
  };

  const msgs = messages.map((message : any) => (
    <div className={classes.root}>
      <Grid container spacing={2}>
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
    <Box height="75%">
      <Box height="75%">
        {msgs}
      </Box>
      {parentChatTitle}
      <form onSubmit={postChat}>
        <TextField
          value={comment}
          onInput={(e : any) => setComment(e.target.value)}
          id="nv-message"
          label="Message"
          placeholder="Send a message"
        />
        <Button type="submit" size="small" color="primary" endIcon={<SendIcon />}>
          {' '}
          Submit
          {' '}
        </Button>
      </form>
    </Box>
  );
};
export default Chat;
// export default Notifications;
