import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";

const NotificationBox = (props : any) => {
  let notif = (
    <Box color="text.primary" border={1} m={1} padding={1}>
      <Box>Type: {props.notification.is_reply ? "Reply" : "Share"}</Box>
      <Box>Sender: {props.notification.comment.author.username}</Box>
      <Box>Read: {props.notification.read ? "Read" : "Unread"}</Box>
      <Button size="small" onClick={() => {}}>
        {" "}
        View{" "}
      </Button>
    </Box>
  );

  return <CssBaseline>{notif}</CssBaseline>;
};

export default NotificationBox;
