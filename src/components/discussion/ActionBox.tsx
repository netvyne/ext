import React from 'react';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import { useMutation } from 'react-query';
import { Website, Url } from '../../../types/common/types';
import './styles.scss';

interface Props {
  initWebsite: Website;
  reg : boolean;
  url : any;
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
        Host: url.host,
        Pathname: url.pathname,
        Search: url.search,
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
        Host: url.host,
        Pathname: url.pathname,
        Search: url.search,
      },
    };
    // @ts-ignore
    const res : any = mutation.mutate({ route: '/post_vote_website', data });
    setWebsite(res.Website);
    return res;
  };

  const actionbox = (
    <Box>
      <Grid className="website-action-box">
        <Box className="votes">
          <Grid item component={IconButton} value="upvote" onClick={postVote}>
            <img src="../images/vote_up_icon.png" alt="vote up" />
          </Grid>
          <p>Vote</p>
          <Grid item component={IconButton} value="downvote" onClick={postVote}>
            <img src="../images/vote_down_icon.png" alt="vote down" />
          </Grid>
        </Box>
        <Box className="comments">
          <img src="../images/comments_icon.png" alt="Comments" />
          <p>{initWebsite?.ShoutCount}</p>
        </Box>
        <Box className="shares">
          <img src="../images/forward_icon.png" alt="Shares" />
          <p>{initWebsite?.ShareCount}</p>
        </Box>
        {!isSaved && (
          <Box className="save">
            <img src="../images/save_bookmark_icon.png" alt="Saves" />
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
              </Button>
            )}
          </Box>
        )}
        {isSaved && (
          <Box className="save">
            <img src="../images/save_bookmark_icon.png" alt="Saves" />
            <Button
              disabled={disabled}
              onClick={(e) => {
                onSaveItem(e, false);
                setDisabled(true);
              }}
            >
              UNDO
            </Button>
          </Box>
        )}
      </Grid>
    </Box>
  );

  return <CssBaseline>{actionbox}</CssBaseline>;
};

export default ActionBox;
