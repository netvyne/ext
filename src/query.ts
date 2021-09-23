// @ts-nocheck
import axios from 'axios';
import { QueryClient } from 'react-query';

export class CustomError extends Error {
  // eslint-disable-next-line no-unused-vars
  constructor(public res: Response, message?: string) {
    super(message);
  }
}

const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_PUBLIC_API}${queryKey[0]}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      crossdomain: true,
    },
  );
  return data;
};

const defaultMutationFn = async (args: { route: any; data: any; }) => {
  // console.log(
  //   'mutation url',
  //   `${process.env.REACT_APP_PUBLIC_API}${args.route}`,
  // );
  // console.log('mutation args', args.data);
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_PUBLIC_API}${args.route}`,
      args.data,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        crossdomain: true,
      },
    );
    return data;
  } catch (error) {
    throw new CustomError(error.response);
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
    mutations: {
      mutationFn: defaultMutationFn,
    },
  },
});
