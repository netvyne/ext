import React from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from 'react-query';
import { User, Conversation } from '../../../types/common/types';

interface GetFriendQuery {
  Friends: User[];
  Conversations: Conversation[];
}

export default function Dropdown(props : any) {
// export const Dropdown: FunctionComponent = (props : any) => {
  // const { isLoading, data } = useQuery<any, any>("/get_friends");
  let friendsPlaceholder: User[] = [];
  // const { data, status } = useQuery<any, string>('/get_user_friends');
  const { data, status } = useQuery<any, string>('/get_conversation_list');
  let loadingStatus : boolean = true;
  if (status === 'error') {
    friendsPlaceholder = [];
    loadingStatus = false;
  } else if (status === 'loading') {
    friendsPlaceholder = [];
  } else if (status === 'success') {
    friendsPlaceholder = data!.Conversations;
    loadingStatus = false;
  }
  // const changed = function (event : any, value : any) {
  //   props.setFriendIds(value.map((user : User) => user.ID));
  // };

  function changed(event : any, value : any) {
    props.setConversationIDs(value.map((conversation : Conversation) => conversation.ID));
  }

  return (
    <Autocomplete
      multiple
      onChange={changed}
      id="tags-standard"
      style={{ width: 'auto' }}
      options={friendsPlaceholder}
      disablePortal
      loading={loadingStatus}
      getOptionLabel={(option : any) => `${option.Title}`}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select conversation(s)..."
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loadingStatus ? (
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
