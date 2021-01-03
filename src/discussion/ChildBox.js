import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import moment from "moment/min/moment-with-locales";

const ChildBox = (props) => {
  let childComment;
  childComment = (
    <Box color="text.primary" border={1} m={1} padding={1}>
      <Box>
        <Box component="span">{props.comment.author.username}</Box>
        <Box component="span" m={1}>
          {moment.utc(props.comment.created_date).fromNow()}
        </Box>
      </Box>
      <Box>{props.comment.comment}</Box>
      <Button
        size="small"
        onClick={() => {
          props.setParentId(props.comment.id);
        }}
      >
        {" "}
        View Replies{" "}
      </Button>
    </Box>
  );

  return <CssBaseline>{childComment}</CssBaseline>;
};

export default ChildBox;
