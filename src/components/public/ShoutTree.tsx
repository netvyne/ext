/* eslint-disable max-len */
import ReplyIcon from '@mui/icons-material/Reply';
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import MDEditor from '@uiw/react-md-editor';
import { AxiosError } from 'axios';
import { DateTime } from 'luxon';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useMutation, useQuery } from 'react-query';
import { Shout, User, Website } from '../../../types/common/types';
import HCaptcha from '../common/hcaptcha';
import DeleteShout from './DeleteShout';
import ShoutVoteButtons from './ShoutVoteButtons';
import './styles.scss';
import UserKarma from './UserKarma';

interface Props {
  website: Website;
  treeRoot: Shout;
  defUser: User;
  themeColors: any;
}

interface GetShoutTreesQuery {
  Roots: Shout[];
  Website: Website;
}

interface SuccessResponse {
  Shout: Shout;
}

const ShoutTree = ({
  treeRoot, website, defUser, themeColors
}: Props) => {
  // const [user] = React.useState<User>(defUser);
  const [root, setRoot] = React.useState<Shout>(treeRoot);
  const [children, setChildren] = React.useState<Shout[]>(root.Children || []);
  const [hide, setHide] = React.useState(root.Warn);
  // const [clicked, setClicked] = React.useState(false);
  const [userKarmaOpen, setUserKarmaOpen] = React.useState(false);

  const [comment, setComment] = React.useState('');
  const [showForm, setShowForm] = React.useState(false);
  const [showCaptcha, setShowCaptcha] = React.useState(false);
  const [captchaToken, setCaptchaToken] = React.useState('');
  const captchaRef = React.createRef<HCaptcha>();
  const [shoutDeleted, setShoutDeleted] = React.useState(false);
  const [deleted, setDeleted] = React.useState(false);

  function toggleUserKarmaOpen() {
    setUserKarmaOpen(!userKarmaOpen);
  }
  let focus = -1;
  if (window.location.search.includes('focus')) {
    const urlParams = new URLSearchParams(window.location.search);
    focus = parseInt(urlParams.get('focus') as string, 10);
  }
  // const saveItemMutation = useMutation({});
  // const onSaveItem = async (event: any, save: boolean) => {
  //   event.preventDefault();
  //   const mutateData = {
  //     ShoutID: root.ID,
  //     Save: save,
  //   };
  //   const res = saveItemMutation.mutate(
  //     // @ts-ignore
  //     {
  //       route: '/save_shout',
  //       data: mutateData,
  //     },
  //     {
  //       onSuccess: (data: any) => {
  //         root.Saved = data.Shout.Saved;
  //         setRoot(root);
  //       },
  //     },
  //   );
  //   return res;
  // };

  const mutation = useMutation<SuccessResponse, AxiosError>(
    {
      onSuccess: (data) => {
        setComment('');
        setShowCaptcha(false);
        setCaptchaToken('');
        setChildren((c) => [data.Shout, ...c]);
        setShowForm(false);
      },
      onError: (err: AxiosError) => {
        if (err.response?.status === 402) {
          setShowCaptcha(true);
        }
      }
    }
  );

  const postComment = async (event: any) => {
    event.preventDefault();
    const mutateData = {
      WebsiteID: website.ID,
      ParentShoutID: root.ID,
      Comment: comment,
      CaptchaToken: captchaToken
    };
    // @ts-ignore
    const res = mutation.mutate({ route: '/post_shout', data: mutateData });
    return res;
  };
  const commentForm = (
    <form onSubmit={postComment} style={{ width: '100%' }}>
      <Grid alignItems="stretch">
        <MDEditor
          textareaProps={{
            placeholder: 'Leave a comment...',
            style: {
              color: themeColors.commentText
            }
          }}
          height={100}
          value={comment}
          preview="edit"
          hideToolbar
          onChange={(value: string | undefined) => value !== undefined && setComment(value)}
        />
        <Button
          size="small"
          onClick={() => {
            setShowForm(false);
          }}
          sx={{
            color: themeColors.linkColor
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          size="small"
          endIcon={<SendIcon />}
          sx={{
            color: themeColors.linkColor
          }}
          disabled={comment.trim().length === 0}
        >
          {' '}
          Submit
          {' '}
        </Button>
      </Grid>
      {showCaptcha
        && (
          <Box sx={{ zIndex: 99 }}>
            <HCaptcha
              sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY || ''}
              onVerify={(token) => setCaptchaToken(token)}
              ref={captchaRef}
            />
          </Box>
        )}
    </form>
  );

  const moreRepliesQuery = useQuery<GetShoutTreesQuery, string>(
    `/get_shout_trees?website_id=${website.ID}&root_ids=${root.MoreReplies?.join()}`,
    {
      enabled: false,
      onSuccess: (data: GetShoutTreesQuery) => {
        if (data.Roots.length > 0 && data.Roots[data.Roots.length - 1].ID === 0) {
          const dummy = data.Roots.pop();
          root.MoreReplies = dummy!.MoreReplies;
        } else {
          root.MoreReplies = [];
        }
        setChildren((prevState) => [...prevState, ...data.Roots]);
        setRoot(root);
      }
    }
  );
  const innerContent = (
    <>
      {!!children && children.map((shout: Shout) => (
        <ShoutTree
          key={shout.ID}
          website={website}
          treeRoot={shout}
          defUser={defUser}
          themeColors={themeColors}
        />
      ))}
      {(root.MoreReplies && root.MoreReplies.length > 0)
        && (
        <Button variant="outlined" onClick={() => moreRepliesQuery.refetch()}>
          {
            (root.ID === 0 && root.MoreReplies.length > 0) ? 'Load More Comments' : 'Load More Replies'
          }
        </Button>
        )}
    </>
  );
  let content;
  if (root.ID === 0) {
    // Content is just children directly without a parent comment
    content = innerContent;
  } else if (!deleted) {
    const color = root.Level % 2 === 0 ? themeColors.commentParent : themeColors.commentChild;
    content = (
      <Grid
        item
        container
        component={Box}
        bgcolor={
          root.ID === focus
            ? '#f5f77b'
            : color
        }
        borderRadius="borderRadius"
        direction="column"
        style={{ margin: '0px', marginBottom: '5px' }}
        color={themeColors.commentText}
      >
        <Grid item container direction="row" wrap="nowrap">
          {/* @ts-ignore */}

          <Grid item container component={Box} m={1}>
            <Grid item container component={Box} wrap="nowrap" spacing={1} justifyContent="space-between" pt={1}>
              <Grid
                component={Box}
                onClick={toggleUserKarmaOpen}
                sx={{
                  display: 'flex', alignItems: 'center', paddingTop: '0px', paddingLeft: '8px'
                }}
              >
                <Typography variant="body2" color="gray">
                  {root.Author.UserName}
                </Typography>
                <UserKarma
                  toggleUserKarmaOpen={toggleUserKarmaOpen}
                  userKarmaOpen={userKarmaOpen}
                  userName={root.Author.UserName}
                  defUser={defUser}
                />
              </Grid>
              <Box display="flex" sx={{ color: 'gray' }}>
                <Grid item component={Box} sx={{ display: 'flex', alignItems: 'center' }}>
                  {DateTime.fromISO(root.CreatedAt?.toString(), {
                    zone: 'utc',
                  }).toRelative()}
                </Grid>
                <Grid item component={Box} sx={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}>
                  {(root.LatestModerationAt)
                    ? (
                      <Tooltip title={`Last Reviewed: ${DateTime.fromISO(root.LatestModerationAt.toString(), {
                        zone: 'utc',
                      }).toRelative()}`}
                      >
                        <div
                          className="dot"
                          style={{
                            height: '5px',
                            width: '5px',
                            backgroundColor: '#80e5ff',
                            borderRadius: '50%'
                          }}
                        />
                      </Tooltip>
                    )
                    : (
                      <Tooltip title="Pending Review">
                        <div
                          className="dot"
                          style={{
                            height: '5px',
                            width: '5px',
                            backgroundColor: '#bbb',
                            borderRadius: '50%'
                          }}
                        />
                      </Tooltip>
                    )}
                </Grid>
              </Box>
            </Grid>

            <Grid item component={Box} className="text-area">
              {hide
                ? (
                  <>
                    <ReactMarkdown>
                      ***This comment includes potentially sensitive material***
                    </ReactMarkdown>
                    <Button onClick={() => setHide(false)}>Show Anyway</Button>
                  </>
                )
                : <ReactMarkdown>{root.Comment}</ReactMarkdown>}
            </Grid>
            <Grid container wrap="nowrap" alignItems="center" sx={{ height: '30px' }}>
              <ShoutVoteButtons
                initShout={root}
                defUser={defUser}
              />
              {!showForm && (
              <Button size="small" onClick={() => setShowForm(!showForm)} style={{ color: themeColors.linkColor }}>
                <ReplyIcon style={{ color: themeColors.linkColor }} />
                Reply
              </Button>
              )}
              {defUser.UserName === root.Author.UserName
                && <DeleteShout initShout={root} setRoot={setRoot} setShoutDeleted={setShoutDeleted} themeColors={themeColors} setDeleted={setDeleted} />}
            </Grid>
            {showForm && (
              commentForm
            )}
          </Grid>
        </Grid>

        <Grid item component={Box}>
          {innerContent}
        </Grid>
      </Grid>
    );
  }

  return (
    <Box ml={1}>
      {content}
      <Snackbar style={{ zIndex: 10000 }} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={shoutDeleted} autoHideDuration={3000} onClose={() => setShoutDeleted(false)}>
        <Alert onClose={() => setShoutDeleted(false)} severity="success">
          Success!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ShoutTree;
