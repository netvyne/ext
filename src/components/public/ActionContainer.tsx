import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { Website } from '../../../types/common/types';
import ActionUI from './ActionUI';

interface Props {
  initWebsite: Website;
  url : any;
  refetch: any;
  themeColors: any;
}

const ActionContainer = ({
  initWebsite, url, refetch, themeColors
} : Props) => {
  const [website, setWebsite] = React.useState(initWebsite);
  const mutation = useMutation({});
  useEffect(() => {
    setWebsite(initWebsite);
  }, [initWebsite]);

  const postVote = async (event : any) => {
    event.preventDefault();
    const data = {
      Status: parseInt(event.currentTarget.value, 10),
      URL: {
        Host: url.host,
        Pathname: url.pathname,
        Search: url.search,
      },
    };
    // @ts-ignore
    const res = mutation.mutate({
      route: '/post_vote_website',
      data,
    },
    {
      onSuccess: (response: any) => {
        setWebsite(response.Website);
        refetch();
      },
    });
    return res;
  };

  return (
    <ActionUI
      website={website}
      postVote={postVote}
      themeColors={themeColors}
    />
  );
};

export default ActionContainer;
