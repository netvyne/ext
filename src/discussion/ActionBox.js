import React from "react";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ShareIcon from "@material-ui/icons/Share";
import AddCommentSharpIcon from "@material-ui/icons/AddCommentSharp";

const ActionBox = (props) => {
  let actionbox;
  actionbox = (
    <Box mx={2} borderTop={1}>
      <Grid container wrap="nowrap" justify="space-around">
        <Grid item component={IconButton}>
          <KeyboardArrowUpIcon />
        </Grid>
        <Grid item component={IconButton}>
          <KeyboardArrowDownIcon />
        </Grid>
        <Grid item component={IconButton}>
          <AddCommentSharpIcon />
        </Grid>
        <Grid item component={IconButton}>
          <ShareIcon />
        </Grid>
        <Grid item component={IconButton}>
          <BookmarkBorderIcon />
        </Grid>
      </Grid>
    </Box>
  );

  return <CssBaseline>{actionbox}</CssBaseline>;
};

export default ActionBox;
