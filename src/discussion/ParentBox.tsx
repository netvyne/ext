import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import moment from "moment/min/moment-with-locales";
import LeaveReply from "./LeaveReply";
const ParentBox = props => {
  let parentComment;
  if (props.comment) {
    parentComment = (
      <Box border={1} mb={5} p={1}>
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
            props.setParentId(props.comment.parent_id);
          }}
        >
          {" "}
          Back{" "}
        </Button>
        <LeaveReply parent={props.comment} />
      </Box>
    );
  } else {
    // leave reply for website (top level reply)
    parentComment = (
      <Box border={1} mb={5} p={1}>
        <LeaveReply parent={null} />
      </Box>
    );
  }
  return <CssBaseline>{parentComment}</CssBaseline>;
};
export default ParentBox;
