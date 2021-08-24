/* eslint-disable linebreak-style */
import React from 'react';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { DateTime } from 'luxon';
import ReactMarkdown from 'react-markdown';
import Grid from '@material-ui/core/Grid';
import { useMutation, useQueryClient } from 'react-query';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ShoutVoteButtons from './ShoutVoteButtons';
import LeaveReply from './LeaveReply';
import { Shout, Website } from '../../../types/common/types';

interface Props {
  website: Website;
  treeRoot: Shout;
  reg: boolean;
  url: URL;
}

const ShoutTree = ({
  treeRoot, website, reg, url,
} : Props) => {
  let children = null;
  if (treeRoot.Children) {
    children = treeRoot.Children.map((shout : Shout) => (
      <ShoutTree
        website={website}
        treeRoot={shout}
        reg={reg}
        url={url}
      />
    ));
  }
  const queryClient = useQueryClient();
  let focus = -1;
  if (window.location.search.includes('focus')) {
    const urlParams = new URLSearchParams(window.location.search);
    focus = parseInt(urlParams.get('focus') as string, 10);
  }
  const [isSaved, setIsSaved] = React.useState(treeRoot.Saved);
  const [clicked, setClicked] = React.useState(false);
  const saveItemMutation = useMutation({});
  const onSaveItem = async (event : any, save: boolean) => {
    event.preventDefault();
    const data = {
      ShoutID: treeRoot.ID,
      Save: save,
    };
    // @ts-ignore
    const res = saveItemMutation.mutate({
      route: '/save_shout',
      data,
    },
    {
      onSuccess: () => {
        setIsSaved(treeRoot.Saved);
        queryClient.invalidateQueries(`/get_shout_trees?website_id=${website.ID}`);
      },
    });
    return res;
  };

  const color = treeRoot.Level % 2 === 0 ? '#eceff1' : '#fafafa';
  let content : any = '';
  if (treeRoot !== null) {
    console.log('Inside if');
    content = (
      <Grid
        container
        component={Box}
        padding={1}
        m={1}
        borderRadius="borderRadius"
        direction="column"
        className="main_user"
      >
        <Grid className="parent" container direction="row" wrap="nowrap">
          <Grid className="user_name">
            {/* @ts-ignore */}
            {/* <Grid
              component={Box}
              container
              alignItems="center"
              direction="column"
              xs={1}
              p={1}
              mr={4}
            >
              <ShoutVoteButtons
                initShout={treeRoot}
              />
            </Grid> */}
            <Grid className="profile_img">
              <Avatar>A</Avatar>
            </Grid>

            <Grid className="comment_text">
              <Grid className="text_area">
                <h1>
                  {treeRoot.Author.UserName}
                </h1>
                <p>
                  <ReactMarkdown>{treeRoot.Comment}</ReactMarkdown>
                </p>
                {/* <Grid item component={Box}>
                  {DateTime.fromISO(treeRoot.CreatedAt.toString(), {
                    zone: 'utc',
                  }).toRelative()}
                </Grid> */}
              </Grid>

              <Grid className="comment_box">
                <Grid className="counter_box">
                  <img src="../images/vote_up_icon.png" alt="upvote" />
                  <p>1.1k</p>
                  <img src="../images/vote_down_icon.png" alt="downvote" />
                </Grid>
                <Grid className="comment_btn">
                  {!isSaved && reg && (
                    <Box>
                      <Button
                        disabled={clicked}
                        size="small"
                        onClick={(e) => {
                          onSaveItem(e, true);
                          setClicked(true);
                        }}
                        className="btn"
                      >
                        SAVE
                        <BookmarkBorderIcon />
                      </Button>
                    </Box>
                  )}
                  {isSaved && reg && (
                    <Box>
                      <Button
                        disabled={clicked}
                        size="small"
                        onClick={(e) => {
                          onSaveItem(e, false);
                          setClicked(true);
                        }}
                        className="btn"
                      >
                        UNDO
                        <BookmarkBorderIcon />
                      </Button>
                    </Box>
                  )}
                  {/* <button type="button" className="btn">Reply</button> */}
                </Grid>
                <LeaveReply website={website} parent={treeRoot} url={url} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item component={Box}>
          {children}
        </Grid>
      </Grid>
    );
  } else {
    console.log('Inside else');
    content = (
      <Grid item component={Box}>
        No comments
      </Grid>
    );
  }

  return <CssBaseline>{content}</CssBaseline>;
};

export default ShoutTree;
