import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useQuery } from "react-query";

export default function Dropdown(props) {
  const { isLoading, error, data } = useQuery("/get_friends");
  const changed = function (event, value, reason) {
    props.setFriendIds(value.map((user) => user.id));
  };

  return (
    <Autocomplete
      multiple
      onChange={changed}
      id="tags-standard"
      style={{ width: "auto" }}
      options={isLoading ? {} : data.friends}
      disablePortal={true}
      anchorEl={this}
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
