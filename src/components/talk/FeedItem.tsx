import { SentimentSatisfiedAlt } from '@mui/icons-material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FlagIcon from '@mui/icons-material/Flag';
import ImageIcon from '@mui/icons-material/Image';
import LinkIcon from '@mui/icons-material/Link';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PublicIcon from '@mui/icons-material/Public';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { DateTime } from 'luxon';
import React from 'react';
import ReactPlayer from 'react-player';
import { useMutation, useQueryClient } from 'react-query';
import { Post, User, Website } from '../../../types/common/types';
import { formatImageURL } from '../../utils';
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
  themeColors: any;
}

export default function FeedItem({
  initWebsite, reg, initPost, defUser, themeColors
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

  function clickComment() {
    if (website && website.ID) {
      window.open(`${process.env.PUBLIC_WEB}/w/${website.ID}`, '_blank', 'noopener,noreferrer');
    }
    return false;
  }
  const hidden = (
    <Grid
      container
      component={Box}
      direction="column"
      p={1}
      borderRadius="5px"
      wrap="nowrap"
      color={themeColors.commentText}
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
      direction="column"
      p={1}
      borderRadius="5px"
      wrap="nowrap"
      color={themeColors.commentText}
    >
      <Grid item>
        <Grid container direction="row" alignItems="flex-start" spacing={2}>
          <Grid item component={Box}>
            {website.Public
              ? <Tooltip title="Public"><PublicIcon fontSize="inherit" /></Tooltip>
              : <Tooltip title="Unlisted"><LinkIcon fontSize="inherit" /></Tooltip>}
          </Grid>
          <Grid item component={Box}>
            <Link href={website.URL} target="_blank" sx={{ color: themeColors.linkColor }}>
              {website.Host}
            </Link>
          </Grid>
          <Grid item component={Box} fontSize="15px" flexGrow={1}>
            <Grid container direction="row" alignItems="center" justifyContent="space-between">
              <Grid item sx={{ display: 'flex' }}>
                <Grid item>
                  <AccessTimeIcon style={{ fill: themeColors.commentText, color: themeColors.commentText }} fontSize="inherit" />
                </Grid>
                <Grid item component={Box} pl={0.5}>
                  <Typography noWrap variant="caption">
                    {DateTime.fromISO(website.CreatedAt.toString(), { zone: 'utc' }).toRelative()}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item alignItems="center">
                <FlagWebsite
                  open={showFlag}
                  handleClose={() => setShowFlag(false)}
                  website={website}
                />
                <Box>
                  <FlagIcon onClick={() => { setShowFlag(true); }} style={{ fill: themeColors.commentText }} fontSize="inherit" />
                  {/* <Button size="small" onClick={() => { setShowFlag(true); }}>Flag</Button> */}
                </Box>
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
              src={
                (initPost?.ImagePath)
                  ? formatImageURL(initPost?.ImagePath)
                  : formatImageURL(website.ImagePath)
              }
              onClick={() => setShowMedia(!showMedia)}
              alt="website"
              style={{ width: '100%' }}
            >
              <ImageIcon />
            </Avatar>
          </Grid>
          <Grid item component={Box} xs={11}>
            <a href={website.URL} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: themeColors.commentText }}>
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
      >
        <Grid item component={Box} width="100%">
          {ReactPlayer.canPlay(website.URL) ? (
            <ReactPlayer width="100%" url={website.URL} controls />
          ) : (
            <img src={(initPost?.ImagePath) ? formatImageURL(initPost?.ImagePath) : formatImageURL(website.ImagePath)} alt="website" width="100%" />
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
          <Box alignItems="center" mr={1}>
            <Tooltip title="Approval Rate" placement="top">
              <Button disableRipple size="small" startIcon={<SentimentSatisfiedAlt style={{ fill: themeColors.linkColor }} />} sx={{ color: themeColors.linkColor }}>
                {website.ApprovalRate}
                %
              </Button>
            </Tooltip>
          </Box>
          {website.Public
              && (
                <Grid item component={Box}>
                  {((website.TagLabelNames)?.length > 0)
                    ? (
                      <Box style={{ display: 'flex', alignItems: 'center', color: themeColors.linkColor }}>
                        <LocalOfferIcon style={{ fill: themeColors.linkColor }} fontSize="inherit" />
                        <Button size="small" href={`/v/${website.TagLabelNames[0]}`} sx={{ color: themeColors.linkColor }}>
                          {website.TagLabelNames[0]}
                        </Button>
                        <TagsList
                          open={showTagsList}
                          handleClose={() => setShowTagsList(false)}
                          tags={website.TagLabelNames}
                        />
                        {((website.TagLabelNames)?.length > 1) && (
                          <Button size="small" onClick={() => { setShowTagsList(true); }} sx={{ color: themeColors.linkColor }}>
                            +
                            {(website.TagLabelNames)?.length - 1}
                            {' more'}
                          </Button>
                        )}
                      </Box>
                    ) : <Button size="small" sx={{ color: themeColors.linkColor }}>Processing</Button>}
                </Grid>
              )}
          <Grid item component={Box}>
            <Button size="small" onClick={() => clickComment()} sx={{ color: themeColors.linkColor }}>
              {website.ShoutCount}
              {' '}
              comments
            </Button>
          </Grid>
          {reg && (
          <Grid item component={Box}>
            <Button size="small" href="" sx={{ color: themeColors.linkColor }}>Share</Button>
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
              sx={{ color: themeColors.linkColor }}
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
              sx={{ color: themeColors.linkColor }}
            >
              Undo
            </Button>
          </Grid>
          )}
          {(user?.IsMod || user?.IsAdmin)
              && (
                <Button size="small" onClick={() => clickMod()} sx={{ color: themeColors.linkColor }}>
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
