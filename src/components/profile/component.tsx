import React, { FunctionComponent } from "react";
// import "./styles.scss";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Box from "@material-ui/core/Box";

export const Profile: FunctionComponent = (props : any) => {

  return (
    <Box m={1}>
      Current User: <AccountCircleIcon fontSize="small" />
      {props.user}
    </Box>
  );
};
