import React from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from 'react-query';
import { User } from '../../../types/common/types';

interface GetFriendQuery {
  Friends: User[];
}

export default function Dropdown(props : any) {
// export const Dropdown: FunctionComponent = (props : any) => {
  // const { isLoading, data } = useQuery<any, any>("/get_friends");

  const { isLoading, data } = useQuery<GetFriendQuery>('/get_user_friends');
  // const changed = function (event : any, value : any) {
  //   props.setFriendIds(value.map((user : User) => user.ID));
  // };

  function changed(event : any, value : any) {
    props.setFriendEmails(value.map((user : User) => user.Email));
  }

  const friendsPlaceholder: User[] = [];
  return (
    <Autocomplete
      multiple
      onChange={changed}
      id="tags-standard"
      style={{ width: 'auto' }}
      options={isLoading ? friendsPlaceholder : data!.Friends}
      disablePortal
      loading={isLoading}
      getOptionLabel={(option : User) => `${option.FirstName} ${option.LastName}`}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select friend(s)..."
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
