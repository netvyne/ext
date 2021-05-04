//@ts-nocheck
import { QueryClient } from "react-query";
import axios from "axios";

const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_PUBLIC_API}${queryKey[0]}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
      crossdomain: true,
    }
  );
  console.log("query response", data);
  return data;
};

const defaultMutationFn = async (args: { route: any; data: any; }) => {
  console.log(
    "mutation url",
    `${process.env.PUBLIC_API}${args.route}`
  );
  console.log("mutation args", args.data);
  const { data } = await axios.post(
    `${process.env.PUBLIC_API}${args.route}`,
    args.data,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
      crossdomain: true,
    }
  );
  console.log("mutation response", data);
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
