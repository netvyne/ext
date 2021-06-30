import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { DateTime } from 'luxon';
import ReactPlayer from 'react-player';
import Link from '@material-ui/core/Link';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ImageIcon from '@material-ui/icons/Image';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Avatar from '@material-ui/core/Avatar';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { useMutation, useQueryClient } from 'react-query';
import WebVoteButtons from './WebVoteButtons';
import { Website } from '../../../types/common/types';

interface Props {
  initWebsite: Website;
  reg?: boolean;
}

export default function FeedItem({ initWebsite, reg }: Props) {
  const queryClient = useQueryClient();
  const [website, setWebsite] = React.useState<Website>(initWebsite);
  const [showMedia, setShowMedia] = React.useState(false);
  const [clicked, setClicked] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(website.Saved);
  const saveItemMutation = useMutation({});
  const onSaveItem = async (event: any, save: boolean) => {
    event.preventDefault();
    const data = {
      WebsiteID: website.ID,
      Save: save,
    };
    const res = saveItemMutation.mutate(
      // @ts-ignore
      {
        route: '/save_website',
        data,
      },
      {
        onSuccess: () => {
          setIsSaved(website.Saved);
          queryClient.invalidateQueries('/get_website_feed');
        },
      },
    );
    return res;
  };
  return (
    <Grid
      container
      component={Box}
      direction="column"
      boxShadow={3}
      m={1}
      p={1}
      borderRadius="borderRadius"
      wrap="nowrap"
    >
      <Grid container direction="row" alignItems="flex-start" spacing={2}>
        <Grid item component={Box}>
          <Link href={`https://${website.Host}${website.Pathname}${website.Search}`} target="_blank">
            {website.Host}
          </Link>
        </Grid>
        <Grid item component={Box}>
          <AccessTimeIcon />
          {' '}
          {DateTime.fromISO(website.CreatedAt.toString(), { zone: 'utc' }).toRelative()}
        </Grid>
      </Grid>

      <Grid container component={Box} direction="row" my={2}>
        <Grid
          item
          component={Box}
          width="20%"
          maxHeight="100%"
          style={{ cursor: 'pointer' }}
        >
          <Avatar
            variant="square"
            src={website.Image}
            onClick={() => setShowMedia(!showMedia)}
            alt="website"
            style={{ width: '100%', height: '100%' }}
          >
            <ImageIcon style={{ width: '100%' }} />
          </Avatar>
        </Grid>
        <Grid item component={Box} width="80%">
          <Grid container component={Box} pl={1} direction="column">
            <Grid container direction="row" alignItems="flex-start">
              <Typography variant="h6">{website.Title}</Typography>
            </Grid>
            <Grid container direction="row" alignItems="flex-start">
              <Typography
                style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                {website.Description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {showMedia && (
        <Grid
          onClick={() => setShowMedia(!showMedia)}
          container
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Grid item component={Box} width="100%">
            {ReactPlayer.canPlay(`https://${website.Host}${website.Pathname}${website.Search}`) ? (
              <ReactPlayer width="100%" url={`https://${website.Host}${website.Pathname}${website.Search}`} controls />
            ) : (
              <Avatar variant="square" src={website.Image} alt="website">
                <ImageIcon style={{ width: '100%', height: '100%' }} />
              </Avatar>
            )}
          </Grid>
        </Grid>
      )}

      {/* @ts-ignore */}
      <Grid container component={Box} direction="row" alignItems="flex-start">
        <Grid item component={Box}>
          <WebVoteButtons
            item={website}
            setItem={setWebsite}
          />
        </Grid>
        <Grid item component={Box}>
          {/* <Button href={`/w/${website.ID}`}> */}
          <Button>    
            {website.ShoutCount}
            {' '}
            comments
          </Button>
        </Grid>
        {reg && (
          <Grid item component={Box}>
            <Button href="">share</Button>
          </Grid>
        )}
        {!isSaved && reg && (
          <Grid item component={Box}>
            <Button
              disabled={clicked}
              onClick={(e) => {
                onSaveItem(e, true);
                setClicked(true);
              }}
            >
              SAVE
              <BookmarkBorderIcon />
            </Button>
          </Grid>
        )}
        {isSaved && reg && (
          <Grid item component={Box}>
            <Button
              disabled={clicked}
              onClick={(e) => {
                onSaveItem(e, false);
                setClicked(true);
              }}
            >
              UNDO
              <BookmarkBorderIcon />
            </Button>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

FeedItem.defaultProps = {
  reg: false,
};
