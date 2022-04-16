// import ArrowDownward from '@mui/icons-material/ArrowDownward';
// import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import * as React from 'react';

export default function WebsitePlaceholder() {
  return (
    <>
      <Box mx={2} borderRadius="borderRadius" height="70px">
        <Grid container wrap="nowrap">
          <Grid
            container
            direction="column"
            alignItems="center"
          >
            <Grid item component={Box} my={1}>
              <Skeleton>
                <Grid item component={Box}>
                  Placeholder.com
                </Grid>
              </Skeleton>
            </Grid>
            {/* <Grid item component={Box} mx={10} borderTop={1} borderBottom={1}>
              <Grid container spacing={2} justifyContent="space-around">
                <Grid item sx={{ display: 'flex', flexDirection: 'row' }}>
                  <ThumbUpIcon />
                  <Skeleton width={30} height={20} />
                </Grid>
                <Grid item sx={{ display: 'flex', flexDirection: 'row' }}>
                  <SentimentSatisfiedAltIcon />
                  <Skeleton width={30} height={20} />
                  %
                </Grid>
                <Grid item sx={{ display: 'flex', flexDirection: 'row' }}>
                  <ReplyIcon style={{ transform: 'scaleX(-1)' }} />
                  <Skeleton width={30} height={20} />
                </Grid>
                <Grid item>
                  <PublicIcon fontSize="inherit" />
                </Grid>
              </Grid>
            </Grid> */}
          </Grid>
        </Grid>
      </Box>
      <Box mt={1} height="40px">
        <Grid container wrap="nowrap" justifyContent="center" style={{ alignItems: 'center' }}>
          <Grid item>
            <ThumbUpIcon
              style={{ color: 'grey' }}
            />
          </Grid>
          <Grid item>
            <ThumbDownIcon
              style={{ color: 'grey' }}
            />
          </Grid>
          {/* <Grid item>
            <IosShare sx={{ color: 'black' }} />
          </Grid>
          <Grid item component={Box} mr={1}>
            <Bookmark />
          </Grid> */}
        </Grid>
      </Box>
    </>
  );
}
