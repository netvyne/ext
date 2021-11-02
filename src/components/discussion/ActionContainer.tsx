import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { Website } from '../../../types/common/types';
import ActionUI from './ActionUI';

interface Props {
  initWebsite: Website;
  reg : boolean;
  url : any;
  refetch: any;
}

const ActionContainer = ({
  initWebsite, reg, url, refetch
} : Props) => {
  const [website, setWebsite] = React.useState(initWebsite);
  const [saved, setSaved] = React.useState(website.Saved);
  const [showShare, setShowShare] = React.useState(false);
  const mutation = useMutation({});
  const onSaveItem = async (event : any, save: boolean) => {
    event.preventDefault();
    const data = {
      Save: save,
      URL: {
        Host: url.host,
        Pathname: url.pathname,
        Search: url.search,
      },
    };
    const res = mutation.mutate(
      // @ts-ignore
      {
        route: '/save_website',
        data,
      },
      {
        onSuccess: (response : any) => {
          setSaved(response.Website.Saved);
          refetch();
        },
      },
    );
    return res;
  };

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
      setWebsite={setWebsite}
      postVote={postVote}
      saved={saved}
      onSaveItem={onSaveItem}
      showShare={showShare}
      setShowShare={setShowShare}
      refetch={refetch}
    />
  );
};

export default ActionContainer;
