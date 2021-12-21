import ArrowDownward from '@mui/icons-material/ArrowDownward';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import Bookmark from '@mui/icons-material/Bookmark';
import IosShare from '@mui/icons-material/IosShare';
import PublicIcon from '@mui/icons-material/Public';
import ReplyIcon from '@mui/icons-material/Reply';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { Box, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import * as React from 'react';

export default function WebsitePlaceholder() {
  return (
    <>
      <Box mx={3} borderRadius="borderRadius" height="70px">
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
            <Grid item component={Box} mx={10} borderTop={1} borderBottom={1}>
              <Grid container spacing={2} justifyContent="space-around">
                <Grid item sx={{ display: 'flex', flexDirection: 'row' }}>
                  <ArrowUpward />
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
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box my={1} height="40px">
        <Grid container wrap="nowrap" justifyContent="space-around" style={{ alignItems: 'center' }}>
          <Grid item>
            <ArrowUpward
              style={{ color: 'grey' }}
            />
          </Grid>
          <Grid item>
            <ArrowDownward
              style={{ color: 'grey' }}
            />
          </Grid>
          <Grid item>
            <IosShare sx={{ color: 'black' }} />
          </Grid>
          <Grid item component={Box} mr={1}>
            <Bookmark />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
