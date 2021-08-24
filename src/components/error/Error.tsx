import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

export default function Error() {
  return (
    <Box m={1} py={7}>
      <Typography variant="h2" color="primary">
        Sorry, something went wrong!
      </Typography>
    </Box>
  );
}
