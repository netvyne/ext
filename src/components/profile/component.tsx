import React, { FunctionComponent } from "react";
// import "./styles.scss";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Box from "@material-ui/core/Box";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { User } from "../../../types/common/types";

interface GetUserQuery {
  CurrentUser: User;
}

export const Profile: FunctionComponent = (props : any) => {
  // console.log("props :::>>>", props);

  const { data, status } = useQuery<GetUserQuery, string>("/get_user");
  // console.log("DATA ::::::::::::", data);


  return (
    <Box m={1}>
      Current User: <AccountCircleIcon fontSize="small" />
      {props.user}
    </Box>
  );
};
