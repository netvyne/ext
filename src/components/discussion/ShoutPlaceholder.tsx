import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import * as React from 'react';

export default function ShoutPlaceholder() {
  return (
    /* @ts-ignore */
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
  );
}