import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as React from 'react';
import { useQuery } from 'react-query';
import { Conversation, ConversationMember, User } from '../../../types/common/types';

interface GetFriendQuery {
  Friends: User[];
}

interface Props {
  disabled?: boolean;
  setConversationIDs?: any;
  setFriendHandles?: any;
  convMembers?: ConversationMember[];
  mode: string;
}

export default function Dropdown({
  mode, setFriendHandles, setConversationIDs, convMembers, disabled
}: Props) {
  const { isLoading, isSuccess, data } = useQuery<any>('/get_conversation_list', { enabled: mode === 'conv' });
  const friendQuery = useQuery<GetFriendQuery>('/get_user_friends', { enabled: mode === 'friends' });
  const changed = (event: any, value: any) => {
    if (mode === 'conv') {
      setConversationIDs(value.map((conversation: Conversation) => conversation.ID));
    } else if (mode === 'friends') {
      setFriendHandles(value.map((user: User) => user.Handle));
    }
  };
  if (mode === 'conv') {
    const friendsPlaceholder: Conversation[] = [];
    let conversations: Conversation[] = [];
    if (isSuccess) {
      if (data && data!.Conversations !== null) {
        conversations = data!.Conversations;
      }
    }
    return (
      <Autocomplete
        multiple
        onChange={changed}
        id="tags-standard"
        style={{ width: 'auto' }}
        options={isLoading ? friendsPlaceholder : conversations}
        disablePortal
        loading={isLoading}
        disabled={disabled}
        getOptionLabel={(option: Conversation) => `${option.Title}`}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select conversation(s)..."
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
  // Else, mode === 'friends'
  const friendsPlaceholder: User[] = [];
  let friends: User[] = [];
  const removeMember = (mem: ConversationMember) => {
    friends.forEach((user, index) => {
      if (user.Handle === mem.Member.Handle) {
        friends.splice(index, 1);
      }
    });
  };
  if (friendQuery.status === 'success') {
    friends = friendQuery.data!.Friends;
    if (convMembers!.length > 1) {
      for (let i = 0; i < convMembers!.length; i += 1) {
        removeMember(convMembers![i]);
      }
    }
  }
  return (
    <Autocomplete
      multiple
      onChange={changed}
      id="tags-standard"
      style={{ width: 'auto' }}
      options={friendQuery.status === 'loading' ? friendsPlaceholder : friends}
      disablePortal
      loading={friendQuery.status === 'loading'}
      disabled={disabled}
      getOptionLabel={(option: User) => `${option.FirstName} ${option.LastName}`}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select friend(s)..."
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {friendQuery.status === 'loading' ? (
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

Dropdown.defaultProps = {
  disabled: false,
  convMembers: [],
  setFriendHandles: () => {},
  setConversationIDs: () => {},
};
