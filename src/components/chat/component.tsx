import React, { FunctionComponent, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { io } from "socket.io-client";
import { useMutation } from 'react-query';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';

export const Chat : FunctionComponent = (props : any) => {
    const [comment, setComment] = React.useState('');
    const webSocket = useRef<WebSocket | null>(null);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:5000/api/get_chat_socket?website_id=1');
        console.log('socket created', socket)

        webSocket.current =  socket
        webSocket.current.onmessage = (message : any) => {
            console.log("message:", message)
        };
        return () => {console.log("Closing");webSocket.current?.close()};
    }, []);

    const mutation = useMutation({});
    const postChat = async (event : any) => {
        event.preventDefault();
        const data = {
            ParentShoutID: 0,
            Comment: comment,
            WebsiteID: 1
        };
        // @ts-ignore
        const res = mutation.mutate({ route: '/post_chat', data });
        setComment('');
        return res;
    };
  
    return <Box height="75%">
        <Box height="75%">
            <Box>
                <b>ali raza :  </b> Helllo
            </Box>
            <Box>
                <b>ali raza :  </b> Helllo
            </Box>
            <Box>
                <b>ali raza :  </b> Helllo
            </Box>
            <Box>
                <b>ali raza :  </b> Helllo
            </Box>
            <Box>
                <b>ali raza :  </b> Helllo
            </Box>
            <Box>
                <b>ali raza :  </b> Helllo
            </Box>
        </Box>
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
    </Box>;
};

// export default Notifications;
