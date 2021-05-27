import React from "react";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import { DateTime } from "luxon";
import Grid from "@material-ui/core/Grid";
import { useMutation, useQueryClient } from "react-query";
import Button from "@material-ui/core/Button";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import WebcommentVoteButtons from "./WebcommentVoteButtons";
import LeaveReply from "./LeaveReply";
import { Shout, Website } from "../../../types/common/types";

interface Props {
  website: Website;
  treeRoot: Shout;
  reg: boolean;
}

const WebcommentTree = (props : Props) => {
  var children = null;
  if (props.treeRoot.Children) {
  children = props.treeRoot.Children.map((treeRoot : Shout) => (
    <WebcommentTree
      website={props.website}
      treeRoot={treeRoot}
      reg={props.reg}
    />
  ));
  }
  const queryClient = useQueryClient();
  let focus = -1;
  if (window.location.search.includes("focus")) {
    const urlParams = new URLSearchParams(window.location.search);
    focus = parseInt(urlParams.get("focus") as string);
  }
  const [isSaved, setIsSaved] = React.useState(props.treeRoot.Saved);
  const [clicked, setClicked] = React.useState(false);
  const saveItemMutation = useMutation({});
  const onSaveItem = async (event : any, save: boolean) => {
    event.preventDefault();
    let data = {
      ShoutID: props.treeRoot.ID,
      Save: save,
    };
    let res = saveItemMutation.mutate(
      //@ts-ignore
      {
        route: "/save_shout",
        data: data,
      },
      {
        onSuccess: () => {
          setIsSaved(props.treeRoot.Saved);
          queryClient.invalidateQueries(
            // `/get_webcomment_trees?website_id=${props.website.ID}`
            `/get_shout_trees?website_id=${props.website.ID}`
          );
        },
      }
    );
    return res;
  };

  let content;
  content = (
    <Grid
      container
      component={Box}
      bgcolor={
        props.treeRoot.ID === focus
          ? "#414ec4"
          : props.treeRoot.Level % 2 === 0
          ? "#eceff1"
          : "#fafafa"
      }
      padding={1}
      m={1}
      borderRadius="borderRadius"
      direction="column"
    >
      <Grid container direction="row" wrap="nowrap">
        {/*@ts-ignore*/}
        <Grid
          component={Box}
          container
          alignItems="center"
          direction="column"
          xs={1}
          p={1}
          mr={4}
        >
          <WebcommentVoteButtons
            shout={props.treeRoot}
          />
        </Grid>

        <Grid container component={Box} m={1}>
          <Grid container component={Box} m={1} wrap="nowrap" spacing={1}>
            <Grid item component={Box}>
              {props.treeRoot.Author.UserName}
            </Grid>
            <Grid item component={Box}>
              {DateTime.fromISO(props.treeRoot.CreatedAt.toString(), {
                zone: "utc",
              }).toRelative()}
            </Grid>
          </Grid>

          <Grid item component={Box}>
            {props.treeRoot.Comment}
          </Grid>

          <Grid container component={Box} m={1} wrap="nowrap" spacing={1}>
            <LeaveReply website={props.website} parent={props.treeRoot} />
            {!isSaved && props.reg && (
              <Box>
                <Button
                  disabled={clicked}
                  size="small"
                  onClick={(e) => {
                    onSaveItem(e, true);
                    setClicked(true);
                  }}
                >
                  SAVE
                  <BookmarkBorderIcon />
                </Button>
              </Box>
            )}
            {isSaved && props.reg && (
              <Box>
                <Button
                  disabled={clicked}
                  size="small"
                  onClick={(e) => {
                    onSaveItem(e, false);
                    setClicked(true);
                  }}
                >
                  UNDO
                  <BookmarkBorderIcon />
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid item component={Box}>
        {children}
      </Grid>
    </Grid>
  );

  return <CssBaseline>{content}</CssBaseline>;
};

export default WebcommentTree;
