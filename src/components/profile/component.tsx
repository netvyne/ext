import React, { FunctionComponent } from "react";
// import "./styles.scss";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Box from "@material-ui/core/Box";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { User } from "../../../types/common/types";
import {getCurrentUser} from "../../auth/auth"

interface GetUserQuery {
  CurrentUser: User;
}

export const Profile: FunctionComponent = (props : any) => {
  const [user, setUser] = React.useState<User|any>()
  getCurrentUser().then( (currentUser:User|any) => setUser(currentUser))


  return (
    <Box m={1}>
      Current User: <AccountCircleIcon fontSize="small" />
      {props.user}
    </Box>
  );
};
