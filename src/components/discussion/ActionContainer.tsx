import React from 'react';
import { useMutation } from 'react-query';
import { Website } from '../../../types/common/types';
import ActionUI from './ActionUI';

interface Props {
  initWebsite: Website;
  reg : boolean;
  url : any;
}

const ActionContainer = ({ initWebsite, reg, url } : Props) => {
  const [website, setWebsite] = React.useState(initWebsite);
  const [saved, setSaved] = React.useState(website.Saved);
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
        },
      },
    );
    return res;
  };

  const postVote = async (event : any) => {
    event.preventDefault();
    const data = {
      Status: event.currentTarget.value,
      URL: {
        Host: url.host,
        Pathname: url.pathname,
        Search: url.search,
      },
    };
    // @ts-ignore
    const res : any = mutation.mutate({ route: '/post_vote_website', data });
    setWebsite(res.Website);
    return res;
  };

  return <ActionUI website={website} postVote={postVote} saved={saved} onSaveItem={onSaveItem} />;
};

export default ActionContainer;
