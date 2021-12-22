/* eslint-disable max-len */
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import GavelIcon from '@mui/icons-material/Gavel';
import {
  Box, Button, CssBaseline, Grid, Typography
} from '@mui/material';
import { DateTime } from 'luxon';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useMutation, useQuery } from 'react-query';
import { Shout, User, Website } from '../../../types/common/types';
import DeleteShout from './DeleteShout';
import LeaveReply from './LeaveReply';
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
        padding={1}
        m={1}
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

            <Grid item container component={Box} wrap="nowrap" spacing={1} style={{ display: 'flex', flexDirection: 'column' }}>
              <LeaveReply website={website} parent={root} setChildren={setChildren} />
              <Grid item style={{ display: 'flex', flexDirection: 'row' }}>
                <Box>
                  <ShoutVoteButtons
                    initShout={root}
                    defUser={defUser}
                  />
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
              </Grid>
            </Grid>
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