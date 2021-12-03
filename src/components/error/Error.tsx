import { Box, Typography } from '@mui/material';
import React from 'react';

interface Props {
  message?: string
}

export default function Error({ message }: Props) {
  return (
    <Box m={1} py={7}>
      <Typography variant="h2" color="primary">
        Sorry, something went wrong!
      </Typography>
      <Typography>
        Message:
        {' '}
        {message}
      </Typography>
    </Box>
  );
}

Error.defaultProps = {
  message: '',
};
