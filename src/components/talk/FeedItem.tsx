import { Tooltip } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ImageIcon from '@material-ui/icons/Image';
import LinkIcon from '@material-ui/icons/Link';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import PublicIcon from '@material-ui/icons/Public';
import { DateTime } from 'luxon';
import React from 'react';
import ReactPlayer from 'react-player';
import { useMutation, useQueryClient } from 'react-query';
import { Post, User, Website } from '../../../types/common/types';
import TagsList from '../common/TagsList';
import FlagWebsite from './FlagWebsite';
import PublishWebsite from './PublishWebsite';
import WebVoteButtons from './WebVoteButtons';

interface Props {
  initWebsite: Website;
  reg?: boolean;
  // eslint-disable-next-line react/require-default-props
  initPost?: Post;
  defUser: User;
}

export default function FeedItem({
  initWebsite, reg, initPost, defUser
}: Props) {
  const [user] = React.useState<User>(defUser);
  const queryClient = useQueryClient();
  const [website, setWebsite] = React.useState<Website>(initWebsite);
  const [showMedia, setShowMedia] = React.useState(false);
  const [showShare, setShowShare] = React.useState(false);
  const [showFlag, setShowFlag] = React.useState(false);
  const [clickedSave, setClickedSave] = React.useState(false);
  const [clickedSensitive, setClickedSensitive] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(website.Saved);
  const saveItemMutation = useMutation({});
  const [showTagsList, setShowTagsList] = React.useState(false);
  const onSaveItem = async (event: any, save: boolean) => {
    event.preventDefault();
    const mutateData = {
      WebsiteID: website.ID,
      Save: save,
    };
    const res = saveItemMutation.mutate(
      // @ts-ignore
      {
        route: '/save_website',
        data: mutateData,
      },
      {
        onSuccess: (data: any) => {
          setIsSaved(data.Website.Saved);
          queryClient.invalidateQueries(`/get_site?id=${data.Website.id}`);
        },
      },
    );
    return res;
  };

  function clickMod() {
    window.open(`${process.env.REACT_APP_MOD_URL}/website/${website.ID}`, '_blank', 'noopener,noreferrer');
    return false;
  }

  let focus = -1;
  if (window.location.search.includes('pfocus')) {
    const urlParams = new URLSearchParams(window.location.search);
    focus = parseInt(urlParams.get('pfocus') as string, 10);
  }
  const hidden = (
    <Grid
      container
      component={Box}
      bgcolor={initPost?.ID === focus
        ? '#f5f77b'
        : '#ffffff'}
      direction="column"
      boxShadow={3}
      m={1}
      p={1}
      borderRadius="borderRadius"
      wrap="nowrap"
    >
      <Typography variant="h6" color="primary">This Feed Item contains possibly sensitive material.</Typography>
      <Typography variant="subtitle2">Please take caution before viewing. </Typography>
      <Button variant="contained" color="primary" onClick={() => { setClickedSensitive(true); }}>View</Button>
    </Grid>
  );
  const nonHidden = (
    <Grid
      container
      component={Box}
      bgcolor={initPost?.ID === focus
        ? '#f5f77b'
        : '#ffffff'}
      direction="column"
      boxShadow={1}
      m={1}
      p={1}
      borderRadius="borderRadius"
      wrap="nowrap"
    >
      <Grid item>
        <Grid container direction="row" alignItems="flex-start" spacing={2}>
          <Grid item component={Box}>
            {website.Public
              ? <Tooltip title="Public"><PublicIcon fontSize="inherit" /></Tooltip>
              : <Tooltip title="Unlisted"><LinkIcon fontSize="inherit" /></Tooltip>}
          </Grid>
          <Grid item component={Box}>
            <Link href={website.URL} target="_blank">
              {website.Host}
            </Link>
          </Grid>
          <Grid item component={Box} fontSize="15px" flexGrow={1}>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <AccessTimeIcon style={{ fill: 'grey' }} fontSize="inherit" />
              </Grid>
              <Grid item component={Box} pl={0.5}>
                <Typography noWrap variant="caption" style={{ color: 'grey' }}>
                  {DateTime.fromISO(website.CreatedAt.toString(), { zone: 'utc' }).toRelative()}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item alignItems="center">
            <PublishWebsite
              open={showShare}
              handleClose={() => setShowShare(false)}
              website={website}
              setWebsite={setWebsite}
            />
            <Box>
              {website.Public
                ? <Button variant="outlined" size="small" onClick={() => { setShowShare(true); }}>Vyne</Button>
                : <Button onClick={() => { setShowShare(true); }}>Publish</Button>}
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container component={Box} direction="row">
          <Grid
            item
            component={Box}
            xs={1}
            style={{ cursor: 'pointer' }}
          >
            <Avatar
              variant="square"
              src={(initPost?.Image) ? initPost?.Image : website.Image}
              onClick={() => setShowMedia(!showMedia)}
              alt="website"
              style={{ width: '100%' }}
            >
              <ImageIcon />
            </Avatar>
          </Grid>
          <Grid item component={Box} xs={11}>
            <a href={website.URL} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'black' }}>
              <Grid container component={Box} pl={1} direction="column">
                <Grid item component={Box} width="auto">
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: 'auto' }}>
                    <Typography>
                      {website.Title}
                    </Typography>
                  </div>
                </Grid>
                <Grid item component={Box} width="auto">
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: 'auto' }}>
                    <p>
                      {website.Description}
                    </p>
                  </div>
                </Grid>
              </Grid>
            </a>
          </Grid>
        </Grid>
      </Grid>

      {showMedia && (
        <Grid
          item
          onClick={() => setShowMedia(!showMedia)}
          container
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Grid item component={Box} width="100%">
            {ReactPlayer.canPlay(website.URL) ? (
              <ReactPlayer width="100%" url={website.URL} controls />
            ) : (
              <img src={(initPost?.Image) ? initPost?.Image : website.Image} alt="website" width="100%" />
            )}
          </Grid>
        </Grid>
      )}

      <Grid item>
        {/* @ts-ignore */}
        <Grid container component={Box} direction="row" alignItems="flex-start">
          <Grid item component={Box}>
            <WebVoteButtons
              website={website}
            />
          </Grid>
          {website.Public
            && (
              <Grid item component={Box}>
                {((website.TagLabelNames)?.length > 0)
                  ? (
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                      <LocalOfferIcon style={{ fill: 'grey' }} fontSize="inherit" />
                      <Button size="small" href={`/v/${website.TagLabelNames[0]}`}>
                        {website.TagLabelNames[0]}
                      </Button>
                      <TagsList
                        open={showTagsList}
                        handleClose={() => setShowTagsList(false)}
                        tags={website.TagLabelNames}
                      />
                      {((website.TagLabelNames)?.length > 1) && (
                        <Button size="small" onClick={() => { setShowTagsList(true); }}>
                          +
                          {(website.TagLabelNames)?.length - 1}
                          {' more'}
                        </Button>
                      )}
                    </Box>
                  ) : <Button size="small">Processing</Button>}
                {/* {(website.TagLabelNames)?.length > 0
                  ? website.TagLabelNames?.map((t) => (
                    <Button size="small" href={`/v/${t}`}>
                      {t}
                    </Button>
                  )) : <Button size="small">Processing</Button>} */}
              </Grid>
            )}
          <Grid item component={Box}>
            <Button size="small" href={`/w/${website.ID}`}>
              {website.ShoutCount}
              {' '}
              comments
            </Button>
          </Grid>
          {reg && (
            <Grid item component={Box}>
              <Button size="small" href="">Share</Button>
            </Grid>
          )}
          {!isSaved && reg && (
            <Grid item component={Box}>
              <Button
                disabled={clickedSave}
                size="small"
                onClick={(e) => {
                  onSaveItem(e, true);
                  setClickedSave(true);
                }}
              >
                Save
              </Button>
            </Grid>
          )}
          {isSaved && reg && (
            <Grid item component={Box}>
              <Button
                size="small"
                disabled={clickedSave}
                onClick={(e) => {
                  onSaveItem(e, false);
                  setClickedSave(true);
                }}
              >
                Undo
              </Button>
            </Grid>
          )}
          <Grid item container alignItems="center">
            <FlagWebsite
              open={showFlag}
              handleClose={() => setShowFlag(false)}
              website={website}
            />
            <Box>
              <Button size="small" onClick={() => { setShowFlag(true); }}>Flag</Button>
            </Box>
          </Grid>
          {(user?.Role === 'mod' || user?.Role === 'admin')
            && (
              <Button size="small" onClick={() => clickMod()}>
                Mod
                {' '}
              </Button>
            )}
        </Grid>
      </Grid>
    </Grid>
  );
  return (
    <>
      {(website.Warn && !clickedSensitive && !user.DisableWarnNSFW) && hidden}
      {(!website.Warn || clickedSensitive || user.DisableWarnNSFW) && nonHidden}
    </>
  );
}

FeedItem.defaultProps = {
  reg: false,
};
