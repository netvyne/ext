import React from "react";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Grid from "@material-ui/core/Grid";

const WebsiteBox = (props) => {
  let website;
  website = (
    <Box border={1} m={2} borderRadius="borderRadius">
      <Grid container wrap="nowrap">
        <Grid
          container
          alignItems="center"
          direction="column"
          xs={2}
          borderRight={1}
        >
          <KeyboardArrowUpIcon />
          <Box>{props.website ? props.website.karma : 0} </Box>
          <KeyboardArrowDownIcon />
        </Grid>
        <Grid
          container
          xs={10}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Box>
            {document.title.length < 100
              ? document.title
              : document.title.substring(0, 100).concat("...")}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  return <CssBaseline>{website}</CssBaseline>;
};

export default WebsiteBox;
