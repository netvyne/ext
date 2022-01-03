/* eslint-disable max-len */
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import GavelIcon from '@mui/icons-material/Gavel';
import ReplyIcon from '@mui/icons-material/Reply';
import SendIcon from '@mui/icons-material/Send';
import {
  Box, Button, CssBaseline, Grid, Typography
} from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import { AxiosError } from 'axios';
import { DateTime } from 'luxon';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useMutation, useQuery } from 'react-query';
import { Shout, User, Website } from '../../../types/common/types';
import HCaptcha from '../common/hcaptcha';
import DeleteShout from './DeleteShout';
// import LeaveReply from './LeaveReply';
import ShoutVoteButtons from './ShoutVoteButtons';
import './styles.scss';
import UserKarma from './UserKarma';

interface Props {
  website: Website;
  treeRoot: Shout;
  defUser: User;
}

interface GetShoutTreesQuery {
  Roots: Shout[];
  Website: Website;
}

interface SuccessResponse {
  Shout: Shout;
}

const ShoutTree = ({
  treeRoot, website, defUser
}: Props) => {
  const [user] = React.useState<User>(defUser);
  const [root, setRoot] = React.useState<Shout>(treeRoot);
  // const [showFlag, setShowFlag] = React.useState(false);
  const [children, setChildren] = React.useState<Shout[]>(root.Children || []);
  const [hide, setHide] = React.useState(root.Warn);
  const [clicked, setClicked] = React.useState(false);
  const [userKarmaOpen, setUserKarmaOpen] = React.useState(false);

  const [comment, setComment] = React.useState('');
  const [showForm, setShowForm] = React.useState(false);
  const [showCaptcha, setShowCaptcha] = React.useState(false);
  const [captchaToken, setCaptchaToken] = React.useState('');
  const captchaRef = React.createRef<HCaptcha>();

  function toggleUserKarmaOpen() {
    setUserKarmaOpen(!userKarmaOpen);
  }
  let focus = -1;
  if (window.location.search.includes('focus')) {
    const urlParams = new URLSearchParams(window.location.search);
    focus = parseInt(urlParams.get('focus') as string, 10);
  }
  const saveItemMutation = useMutation({});
  const onSaveItem = async (event: any, save: boolean) => {
    event.preventDefault();
    const mutateData = {
      ShoutID: root.ID,
      Save: save,
    };
    const res = saveItemMutation.mutate(
      // @ts-ignore
      {
        route: '/save_shout',
        data: mutateData,
      },
      {
        onSuccess: (data: any) => {
          root.Saved = data.Shout.Saved;
          setRoot(root);
          // refetch();
        },
      },
    );
    return res;
  };

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
    <form onSubmit={postComment}>
      <Grid alignItems="stretch">
        <MDEditor
          height={100}
          preview="edit"
          value={comment}
          onChange={(value: string | undefined) => value !== undefined && setComment(value)}
        />
        <Button
          size="small"
          onClick={() => {
            setShowForm(false);
          }}
        >
          Cancel
        </Button>
        <Button type="submit" size="small" color="primary" endIcon={<SendIcon />}>
          {' '}
          Submit
          {' '}
        </Button>
      </Grid>
      {showCaptcha
        && (
          <HCaptcha
            sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY || ''}
            onVerify={(token) => setCaptchaToken(token)}
            ref={captchaRef}
          />
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
          defUser={user}
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
  } else {
    const color = root.Level % 2 === 0 ? '#eceff1' : '#fafafa';
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
      >
        <Grid item container direction="row" wrap="nowrap">
          {/* @ts-ignore */}

          <Grid item container component={Box} m={1}>
            <Grid item container component={Box} wrap="nowrap" spacing={1}>
              <Grid item component={Box} onClick={toggleUserKarmaOpen}>
                <Typography variant="body2" color={root.Author.UserName === user?.UserName ? 'primary' : 'textPrimary'}>
                  {root.Author.UserName}
                </Typography>
                <UserKarma
                  toggleUserKarmaOpen={toggleUserKarmaOpen}
                  userKarmaOpen={userKarmaOpen}
                  userName={root.Author.UserName}
                />
              </Grid>
              <Grid item component={Box}>
                {DateTime.fromISO(root.CreatedAt?.toString(), {
                  zone: 'utc',
                }).toRelative()}
              </Grid>
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

            {/* <Grid item container component={Box} wrap="nowrap" spacing={1} style={{ display: 'flex', flexDirection: 'column' }}> */}
            <Grid container wrap="nowrap" alignItems="center" sx={{ height: '30px' }}>
              <ShoutVoteButtons
                initShout={root}
                defUser={defUser}
              />
              {!showForm && (
              <Button size="small" onClick={() => setShowForm(!showForm)}>
                <ReplyIcon />
                Reply
              </Button>
              )}
              <Button
                disabled={clicked}
                size="small"
                onClick={(e) => {
                  onSaveItem(e, !root.Saved);
                  setClicked(true);
                }}
              >
                {root.Saved ? 'UNDO' : 'SAVE'}
              </Button>
              {user.UserName === root.Author.UserName
                && <DeleteShout initShout={root} setRoot={setRoot} />}
              {(user?.IsMod)
                    && (
                      <Button href={`${process.env.REACT_APP_MOD_URL}/item/shout/${root.ID}`} target="_blank">
                        MOD
                        {' '}
                      </Button>
                    )}
            </Grid>
            {/* <LeaveReply website={website} parent={root} setChildren={setChildren} /> */}
            {/* <Grid item style={{ display: 'flex', flexDirection: 'row' }}>
                <Box>
                  <ShoutVoteButtons
                    initShout={root}
                    defUser={defUser}
                  />
                  {!showForm && (
                    <Button size="small" onClick={() => setShowForm(!showForm)}>
                      <ReplyIcon />
                      Reply
                    </Button>
                  )}
                </Box>
                {!root.Saved && defUser.Registered && (
                  <Box>
                    <Button
                      disabled={clicked}
                      size="small"
                      onClick={(e) => {
                        onSaveItem(e, true);
                        setClicked(true);
                      }}
                      style={{ color: '#000000' }}
                    >
                      SAVE
                      <BookmarkBorderIcon />
                    </Button>
                  </Box>
                )}
                {root.Saved && defUser.Registered && (
                  <Box>
                    <Button
                      disabled={clicked}
                      size="small"
                      onClick={(e) => {
                        onSaveItem(e, false);
                        setClicked(true);
                      }}
                      style={{ color: '#000000' }}
                    >
                      UNDO
                      <BookmarkBorderIcon />
                    </Button>
                  </Box>
                )}
                {(user?.Role === 'mod' || user?.Role === 'admin')
                  && (
                    <Button href={`${process.env.REACT_APP_MOD_URL}/shout/${root.ID}`} target="_blank" style={{ color: '#000000' }}>
                      MOD
                      {' '}
                      <GavelIcon />
                    </Button>
                  )}
                {defUser.UserName === root.Author.UserName
                    && (
                      <DeleteShout
                        initShout={root}
                        setRoot={setRoot}
                      />
                    )}
              </Grid> */}
            {showForm && (
              commentForm
            )}
            {/* </Grid> */}
          </Grid>
        </Grid>

        <Grid item component={Box}>
          {innerContent}
        </Grid>
      </Grid>
    );
  }

  return <CssBaseline>{content}</CssBaseline>;
};

export default ShoutTree;
