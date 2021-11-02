/* eslint-disable max-len */
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from '@material-ui/lab/Alert';
import { DateTime } from 'luxon';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { Post, Talk, User } from '../../../types/common/types';
import Dropdown from '../sharing/dropdown';
import FeedItem from './FeedItem';
import LeaveReply from './LeaveReply';
import './styles.scss';
import TalkTree from './TalkTree';

interface Props {
  post: Post;
  defUser: User;
  setShowTalkTree: any;
  refetch: any;
}

interface GetTalkTreeQuery {
  Roots: Talk[];
}

export default function PostShare({
  post, defUser, setShowTalkTree, refetch
}: Props) {
  const useStyles = makeStyles(() => ({
    snackbar: {
      zIndex: 10000,
    },
  }));
  const [openShareMore, setOpenShareMore] = React.useState(false);
  const [dropdownRefetch, setDropdownRefetch] = React.useState(Date());
  const [showTree, setShowTree] = React.useState(false);
  const [friendHandles, setFriendHandles] = React.useState([]);
  const toggleShareMore = () => {
    setOpenShareMore(!openShareMore);
  };
  const [sbarOpen, setSbarOpen] = React.useState(false);
  const toggleSbar = () => {
    setSbarOpen(!sbarOpen);
  };
  const classes = useStyles();

  const { data, status } = useQuery<GetTalkTreeQuery, string>(
    `/get_talk_trees?post_id=${post.ID}`, { enabled: showTree }
  );
  let trees: {} | null | undefined;
  if (status === 'error') {
    trees = <div>Error</div>;
  } else if (status === 'loading') {
    trees = <div>Loading</div>;
  } else if (status === 'idle') {
    trees = <div />;
  } else {
    trees = data!.Roots.map((treeRoot) => (
      <TalkTree key={treeRoot.ID} treeRoot={treeRoot} post={post} defUser={defUser} setShowTalkTree={setShowTalkTree} />
    ));
  }
  const shareMoreMutation = useMutation({});
  const shareMore = async (event: any) => {
    event.preventDefault();
    const mutateData = {
      PostID: post.ID,
      ReceiverHandles: friendHandles,
    };
    const res = shareMoreMutation.mutate(
      // @ts-ignore
      {
        route: '/update_user_post',
        data: mutateData,
      },
      {
        onSuccess: () => {
          toggleShareMore();
          toggleSbar();
          setDropdownRefetch(Date());
          setFriendHandles([]);
          refetch();
        },
      },
    );
    return res;
  };
  const mutation = useMutation({});
  const deletePost = async (event: any) => {
    event.preventDefault();
    const mutateData = {
      PostID: post.ID,
      Delete: true
    };
    // @ts-ignore
    // mutation.mutate({ route: '/update_user_post', data: mutateData });
    const res = mutation.mutate(
      // @ts-ignore
      {
        route: '/update_user_post',
        data: mutateData,
      },
      {
        onSuccess: () => {
          setShowTalkTree(false);
          refetch();
        },
      },
    );
    return res;
  };
  return (
    <>
      <Grid
        container
        component={Box}
        boxShadow={3}
        direction="column"
        m={1}
        p={1}
        borderRadius="borderRadius"
        wrap="nowrap"
      >
        <Grid container direction="row" alignItems="flex-start" spacing={2}>
          <Grid item direction="column" component={Box} flexGrow={1}>
            <Grid item component={Box}>
              <Box component="span">
                Shared by
                {' '}
                {post.Author.FirstName}
                {' '}
                {post.Author.LastName}
              </Box>
              <Box component="span" m={1}>
                {DateTime.fromISO(post.CreatedAt.toString()).toRelative()}
              </Box>
            </Grid>
          </Grid>
          {post.Author.Handle === defUser?.Handle
          && (
            <Grid item xs={false}>
              <IconButton aria-label="add" onClick={toggleShareMore}>
                <AddCircleOutlineIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={deletePost}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>

        <Grid container component={Box}>
          <FeedItem initWebsite={post.Website} initPost={post} defUser={defUser} />
        </Grid>
        <Grid item component={Box}>
          <Box component="span">
            Private Discussion with
            {' '}
            {post.Receivers[0].FirstName}
            {' '}
            {post.Receivers.length > 1
            && (
              <Tooltip title={post.Receivers.slice(1).map((u) => u.FirstName).join(', ')} aria-label="more">
                <span>
                  And
                  {' '}
                  {post.Receivers.length - 1}
                  {' '}
                  Other(s)
                </span>
              </Tooltip>
            )}
          </Box>
        </Grid>
        {showTree
          ? (
            <Grid container component={Box} width={1}>
              <Button onClick={() => setShowTree(false)}> Hide Discussion</Button>
              {trees}
            </Grid>
          )
          : (
            <Grid container component={Box} width={1}>
              {post.LatestTalk.ID && (
                <>
                  Latest comment:
                  <TalkTree key={post.LatestTalk.ID} treeRoot={post.LatestTalk} post={post} defUser={defUser} setShowTalkTree={setShowTalkTree} />
                </>
              )}
              <Button onClick={() => setShowTree(true)}> Show Discussion</Button>
            </Grid>
          )}
        <LeaveReply post={post} initShowForm />
      </Grid>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={openShareMore}
        onClose={toggleShareMore}
      >
        <DialogTitle>
          Share This Post with More Friends
        </DialogTitle>
        <DialogContent style={{ height: '75px' }}>
          <Dropdown dropdownRefetch={dropdownRefetch} setFriendHandles={setFriendHandles} mode="friends" />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleShareMore} color="primary">
            Cancel
          </Button>
          <Button onClick={shareMore} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar className={classes.snackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={sbarOpen} autoHideDuration={3000} onClose={toggleSbar}>
        <Alert onClose={toggleSbar} severity="success">
          Success!
        </Alert>
      </Snackbar>
    </>
  );
}
