import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import * as React from 'react';

export default function FeedItemPlaceholder() {
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
        <Skeleton variant="text">
          <Grid item component={Box}>
            Placeholder.com
          </Grid>
        </Skeleton>
        <Skeleton variant="text">
          <Grid item component={Box}>
            Hellloooo
          </Grid>
        </Skeleton>
      </Grid>

      <Grid container component={Box} direction="row" my={2}>
        <Grid
          item
          component={Box}
          width="20%"
          maxHeight="100%"
          style={{ cursor: 'pointer' }}
        >
          <Skeleton>
            <Avatar
              variant="square"
              style={{ width: '100%', height: '100%' }}
            />
          </Skeleton>
        </Grid>
        <Grid item component={Box} width="80%">
          <Grid container component={Box} pl={1} direction="column">
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="100%" />
          </Grid>
        </Grid>
      </Grid>
      {/* @ts-ignore */}
      <Grid container component={Box} direction="row" alignItems="flex-start">
        {/* @ts-ignore */}
        <Grid container component={Box} direction="row" alignItems="flex-start">
          <Grid item component={Box}>
            <Skeleton>
              <Button>Please</Button>
            </Skeleton>
          </Grid>
          <Grid item component={Box}>
            <Skeleton>
              <Button>Bear</Button>
            </Skeleton>
          </Grid>

          <Grid item component={Box}>
            <Skeleton>
              <Button>With</Button>
            </Skeleton>
          </Grid>

          <Grid item component={Box}>
            <Skeleton>
              <Button>Us...</Button>
            </Skeleton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
