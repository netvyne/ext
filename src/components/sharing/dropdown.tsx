import React, { FunctionComponent } from "react";

import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useQuery } from "react-query";

export default function Dropdown(props : any) {
// export const Dropdown: FunctionComponent = (props : any) => {  
  // const { isLoading, data } = useQuery<any, any>("/get_friends");
  const data : any = {
    friends : [{
      created_date: "2021-04-14 00:00:00",
      is_registered: true,
      id: 12,
      username: "USERNAME",
      _passhash: "PASSHASH",
      role: "ROLE",
      google_id: "GOOGLE",
      apple_id: "APPLE",
      given_name: "GIVEN NAME",
      family_name: "FAMILY NAME",
      email: "EMAIL",
      picture_url: "PICTURE URL",
      birthday: "2021-04-14 00:00:00",
      profile_nonce: 12
    }]}
  const isLoading = false;
  const changed = function (event : any, value : any, reason : any) {
    props.setFriendIds(value.map((user : any) => user.id));
  };

  return (
    <Autocomplete
      multiple
      onChange={changed}
      id="tags-standard"
      style={{ width: "auto" }}
      options={isLoading ? {} : data.friends}
      disablePortal={true}
      loading={isLoading}
      getOptionLabel={(option) => option.given_name + " " + option.family_name}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select friend(s)..."
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
