// @ts-nocheck
import axios from 'axios';
import { QueryClient } from 'react-query';

export class CustomError extends Error {
  // eslint-disable-next-line no-unused-vars
  constructor(public res: Response, message?: string) {
    super(message);
  }
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    crossdomain?: boolean;
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

// const defaultMutationFn = async (args: { route: any; data: any; }) => {
//   // console.log(
//   //   'mutation url',
//   //   `${process.env.REACT_APP_PUBLIC_API}${args.route}`,
//   // );
//   // console.log('mutation args', args.data);
//   try {
//     const { data } = await axios.post(
//       `${process.env.REACT_APP_PUBLIC_API}${args.route}`,
//       args.data,
//       {
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         withCredentials: true,
//         crossdomain: true,
//       },
//     );
//     return data;
//   } catch (error) {
//     throw new CustomError(error.response);
//   }
// };

const defaultMutationFn = async (args: { route: any; data: any; }) => {
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
  // console.log('mutation response', data);
  return data;
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
