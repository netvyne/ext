import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React from 'react';
import Box from '@material-ui/core/Box';

const Profile = props => {

    return (
      <Box m={1}>
          Current User: <AccountCircleIcon fontSize="small"/>{props.user}
      </Box>
    );
  };
  
  export default Profile;