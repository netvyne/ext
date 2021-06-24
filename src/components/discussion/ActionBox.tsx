import React from 'react';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ShareIcon from '@material-ui/icons/Share';
import AddCommentSharpIcon from '@material-ui/icons/AddCommentSharp';
import Tooltip from '@material-ui/core/Tooltip';
import { useMutation } from 'react-query';
import { Website, Url } from '../../../types/common/types';

interface Props {
  initWebsite: Website;
  reg : boolean;
  url : Url;
}

const ActionBox = ({ initWebsite, reg, url } : Props) => {
  const [website, setWebsite] = React.useState(initWebsite);
  // const [clicked, setClicked] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [disabled, setDisabled] = React.useState(!reg);
  const [isSaved, setIsSaved] = React.useState(website.Saved);
  const mutation = useMutation({});
  // const saveItemMutation = useMutation({});
  const onSaveItem = async (event : any, save: boolean) => {
    event.preventDefault();
    const data = {
      Save: save,
      URL: {
        Host: url.Host,
        Pathname: url.Pathname,
        Search: url.Search,
      },
    };
    const res = mutation.mutate(
      // @ts-ignore
      {
        route: '/save_website',
        data,
      },
      {
        onSuccess: (response : any) => {
          console.log('On Success', response);
          console.log(response.Website);
          setIsSaved(response.Website.Saved);
          setDisabled(false);
        },
      },
    );
    return res;
  };

  const postVote = async (event : any) => {
    event.preventDefault();
    const data = {
      Status: event.currentTarget.value,
      URL: {
        Host: url.Host,
        Pathname: url.Pathname,
        Search: url.Search,
      },
    };
    // @ts-ignore
    const res : any = mutation.mutate({ route: '/post_vote_website', data });
    setWebsite(res.Website);
    return res;
  };

  const actionbox = (
    <Box mx={2} borderTop={1}>
      <Grid container wrap="nowrap" justify="space-around">
        <Grid item component={IconButton} value="upvote" onClick={postVote}>
          <KeyboardArrowUpIcon
            color={
              website.VoteStatus === 'upvote' ? 'primary' : 'secondary'
            }
          />
        </Grid>
        <Grid item component={IconButton} value="downvote" onClick={postVote}>
          <KeyboardArrowDownIcon
            color={
              website.VoteStatus === 'downvote' ? 'primary' : 'secondary'
            }
          />
        </Grid>
        <Grid item component={IconButton}>
          <AddCommentSharpIcon />
        </Grid>
        <Grid item component={IconButton}>
          <ShareIcon />
        </Grid>
        {/* <Grid item component={IconButton}>
          <BookmarkBorderIcon />
        </Grid> */}
        {!isSaved && (
          <Grid item component={Box}>
            {disabled && (
              <Tooltip title="You need to get registered first" arrow>
                <span>
                  <Button disabled={disabled}>
                    SAVE
                  </Button>
                </span>
              </Tooltip>
            )}
            {!disabled && (
              <Button
                onClick={(e) => {
                  onSaveItem(e, true);
                  setDisabled(false);
                }}
              >
                SAVE
                <BookmarkBorderIcon />
              </Button>
            )}
          </Grid>
        )}
        {isSaved && (
          <Grid item component={Box}>
            <Button
              disabled={disabled}
              onClick={(e) => {
                onSaveItem(e, false);
                setDisabled(true);
              }}
            >
              UNDO
              <BookmarkBorderIcon />
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );

  return <CssBaseline>{actionbox}</CssBaseline>;
};

export default ActionBox;
