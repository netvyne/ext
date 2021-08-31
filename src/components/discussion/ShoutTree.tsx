/* eslint-disable linebreak-style */
import React from 'react';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { DateTime } from 'luxon';
import Grid from '@material-ui/core/Grid';
import { useMutation, useQueryClient } from 'react-query';
import Button from '@material-ui/core/Button';
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
        bgcolor={
          treeRoot.ID === focus
            ? '#414ec4'
            : color
        }
        padding={1}
        m={1}
        borderRadius="borderRadius"
        direction="column"
      >
        <Grid container direction="row" wrap="nowrap">
          {/* @ts-ignore */}
          <Grid
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
          </Grid>

          <Grid container component={Box} m={1}>
            <Grid container component={Box} m={1} wrap="nowrap" spacing={1}>
              <Grid item component={Box}>
                {treeRoot.Author.UserName}
              </Grid>
              <Grid item component={Box}>
                {DateTime.fromISO(treeRoot.CreatedAt.toString(), {
                  zone: 'utc',
                }).toRelative()}
              </Grid>
            </Grid>

            <Grid item component={Box}>
              {treeRoot.Comment}
            </Grid>

            <Grid container component={Box} m={1} wrap="nowrap" spacing={1}>
              <LeaveReply website={website} parent={treeRoot} url={url} initShowForm={false} />
              {!isSaved && reg && (
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
              {isSaved && reg && (
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
