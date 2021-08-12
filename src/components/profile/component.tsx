import React, { FunctionComponent } from 'react';
// import "./styles.scss";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Box from '@material-ui/core/Box';
// import { useMutation, useQuery, useQueryClient } from 'react-query';
import { User } from '../../../types/common/types';
import { getCurrentUser } from '../../auth/auth';

interface GetUserQuery {
  initCurrentUser: User[];
}

const Profile = ({ initCurrentUser } : GetUserQuery) => {
  const [user, setUser] = React.useState<User|any>();
  getCurrentUser().then((currentUser:User|any) => setUser(initCurrentUser));

  return (
    <Box m={1}>
      Current User:
      {' '}
      <AccountCircleIcon fontSize="small" />
      {user?.UserName}
    </Box>
  );
};

export default Profile;
