import axios, { AxiosResponse } from 'axios';
import { User } from '../../types/common/types';
import { queryClient } from '../query';

interface GetUserQuery {
    CurrentUser: User;
  }

export async function getCurrentUser(email?: string, password?: string): Promise<User|null> {
  const getUserQueryData = queryClient.getQueryData<GetUserQuery>('/login');
  if (getUserQueryData) {
    return getUserQueryData.CurrentUser;
  }
  const response: AxiosResponse<GetUserQuery> = await axios.post(
    `${process.env.REACT_APP_PUBLIC_API}/login`,
    { Email: email, Password: password },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    },
  );
  if (response.status === 200) {
    queryClient.setQueryData('/login', response.data);
    return response.data.CurrentUser;
  }
  console.log('Error getting user');
  return null;
}
