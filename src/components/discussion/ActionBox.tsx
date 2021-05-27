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
import { useMutation } from "react-query";
import { Website } from "../../../types/common/types";


interface Props {
  website: Website;
}

const ActionBox = (props : any) => {
  const [website, setWebsite] = React.useState(props.website);
  const mutation = useMutation({});
  const postVote = async (event : any) => {
    event.preventDefault();
    let data = {
		  Status: event.currentTarget.value,
		  URL: {
        Host: props.url.host,
        Pathname: props.url.pathname,
        Search: props.url.search
      }
    };
    //@ts-ignore
    let res : any = mutation.mutate({ route: "/post_vote_website", data: data });
    setWebsite(res.Website);
    return res;
  };

  let actionbox;
  actionbox = (
    <Box mx={2} borderTop={1}>
      <Grid container wrap="nowrap" justify="space-around">
        <Grid item component={IconButton} value="upvote" onClick={postVote}>
          <KeyboardArrowUpIcon
            color={
              website.VoteStatus === "upvote" ? "primary" : "secondary"
            }
          />
        </Grid>
        <Grid item component={IconButton} value="downvote" onClick={postVote}>
          <KeyboardArrowDownIcon 
            color={
              website.VoteStatus === "downvote" ? "primary" : "secondary"
            }
          />
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
