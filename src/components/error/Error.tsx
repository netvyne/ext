import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

interface Props {
  message?: string
}

export default function Error({ message }: Props) {
  return (
    <Box m={1} py={7} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Typography variant="h2" color="primary" sx={{ fontSize: '1.75rem' }}>
        Sorry, something went wrong!
      </Typography>
      <Typography>
        Message:
        {' '}
        {message}
      </Typography>
      <Box sx={{
        width: '400px',
        marginTop: '50px',
        '@media (max-width: 1024px)': {
          width: '300px'
        }
      }}
      >
        <img src="../../images/error.svg" alt="error" style={{ width: '100%' }} />
      </Box>
    </Box>
  );
}

Error.defaultProps = {
  message: '',
};
