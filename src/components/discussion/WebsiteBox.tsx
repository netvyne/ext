import React from "react";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import SentimentSatisfiedSharpIcon from "@material-ui/icons/SentimentSatisfiedSharp";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ShareIcon from "@material-ui/icons/Share";

const WebsiteBox = (props : any) => {
  let website;
  website = (
    <Box mx={2} mt={1} borderRadius="borderRadius">
      <Grid container wrap="nowrap">
        <Grid container direction="column" alignItems="center" justify="center">
          <Box>
            <Typography variant="h5">
              {document.title.length < 100
                ? document.title
                : document.title.substring(0, 100).concat("...")}
            </Typography>
          </Box>
          <Grid container direction="row" justify="center" spacing={1}>
            <Grid
              item
              component={Box}
              display="flex"
              justify="center"
            >
              <KeyboardArrowUpIcon />
              {props.website?.upvotes}
            </Grid>
            <Grid
              item
              component={Box}
              display="flex"
              justify="center"
            >
              <SentimentSatisfiedSharpIcon />
              {(
                props.website?.upvotes / props.website?.upvotes +
                props.website?.downvotes
              ).toLocaleString("en", { style: "percent" })}
            </Grid>
            <Grid
              item
              component={Box}
              display="flex"
              // alignItems="center"
              justify="center"
            >
              <ChatBubbleOutlineIcon />
              {props.website?.webcomments}
            </Grid>
            <Grid
              item
              component={Box}
              display="flex"
              // alignItems="center"
              justify="center"
            >
              <ShareIcon />
              {props.website?.shares}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );

  return <CssBaseline>{website}</CssBaseline>;
};

export default WebsiteBox;
