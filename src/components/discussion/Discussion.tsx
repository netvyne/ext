/* eslint-disable max-len */
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Box } from '@material-ui/core';
import { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  Shout, Url, User, Website
} from '../../../types/common/types';
import { isValidURL } from '../../utils';
import ActionContainer from './ActionContainer';
import FeedItemPlaceholder from './FeedItemPlaceholder';
import ReplyUI from './ReplyUI';
import ShoutPlaceholder from './ShoutPlaceholder';
import ShoutTree from './ShoutTree';
import WebsiteUI from './WebsiteUI';

interface Props {
  initCurrentUser: User[];
  initUrl: Url;
}

interface GetShoutTreesQuery {
  Roots: Shout[];
  Website: Website;
}

interface SuccessResponse {
  Shout: Shout;
}

const Discussion = ({ initCurrentUser, initUrl } : Props) => {
  // const url : any = initUrl;
  const [url, setUrl] = React.useState<any>({});
  const user : any = initCurrentUser;
  const [showForm, setShowForm] = React.useState(true);
  const [showCaptcha, setShowCaptcha] = React.useState(false);
  const [captchaToken, setCaptchaToken] = React.useState('');
  const [children, setChildren] = React.useState<Shout[]>([]);
  const captchaRef = React.createRef<HCaptcha>();
  const [comment, setComment] = React.useState('');
  const [currentTitle, setCurrentTitle] = React.useState<any>('');

  const route = `/get_shout_trees?host=${url.host}&pathname=${url.pathname}&search=${encodeURIComponent(url.search)}`;

  const { data, status, refetch } = useQuery<GetShoutTreesQuery, string>(
    route, {
      onSuccess: (shoutData) => {
        setChildren(shoutData.Roots);
      }
    }
  );
  const [intervalCount, setIntervalCount] = React.useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newCount = intervalCount + 1;
      setIntervalCount(newCount);
      const queryInfo = { active: true };
      if (chrome.tabs) {
        chrome.tabs.query(queryInfo, (tabs) => {
          if (currentTitle !== tabs[0].title) {
            setCurrentTitle(tabs[0].title);
            const newUrl : any = isValidURL(tabs[0].url);
            let searchParam = newUrl.search;
            if (newUrl.host.indexOf('youtube.') > -1 && newUrl.search.indexOf('&t=') > -1) {
              searchParam = newUrl.search.substr(0, newUrl.search.indexOf('&t='));
            }
            const formatedUrl = {
              pathname: newUrl.pathname,
              host: newUrl.host,
              search: searchParam,
              Title: tabs[0].title,
            };
            setUrl(formatedUrl);
            refetch();
          }
        });
      }
    }, 1000);
  }, [intervalCount]);

  // const replyMutation = useMutation({});
  const replyMutation = useMutation<SuccessResponse, AxiosError>(
    {
      onSuccess: (mutationData) => {
        setComment('');
        setShowCaptcha(false);
        setCaptchaToken('');
        setChildren((c) => ((c && c.length > 0) ? [mutationData.Shout, ...c] : [mutationData.Shout]));
        refetch();
      },
      onError: (err: AxiosError) => {
        if (err.response?.status === 402) {
          setShowCaptcha(true);
        }
      }
    }
  );
  const queryClient = useQueryClient();

  const postComment = async (event : any) => {
    event.preventDefault();
    const postShoutData = {
      Comment: comment,
      URL: {
        Host: url.host,
        Pathname: url.pathname,
        Search: url.search,
      },
      CaptchaToken: captchaToken
    };
    // @ts-ignore
    const res = replyMutation.mutate({ route: '/post_shout', data: postShoutData });
    return res;
  };

  const child : any = '';
  let website : any = '';
  let trees : any = '';
  let actionBox;

  if (status === 'error') {
    trees = <div>Error</div>;
    website = <div>Error</div>;
  } else if (status === 'loading') {
    trees = <ShoutPlaceholder />;
    website = <FeedItemPlaceholder />;
  } else if (status === 'success' && user) {
    if (children) {
      trees = children.map((treeRoot) => (
        <ShoutTree
          key={treeRoot.ID}
          website={data!.Website}
          treeRoot={treeRoot}
          reg={!!user.Registered}
          defUser={user}
        />
      ));
    }
    website = (
      <>
        <WebsiteUI initWebsite={data!.Website} url={url} refetch={refetch} currentTitle={currentTitle} />
      </>
    );
    actionBox = (
      <>
        <ActionContainer initWebsite={data!.Website} reg={user?.Registered} url={url} refetch={refetch} />
      </>
    );
  }
  const reply = (
    <ReplyUI
      postComment={postComment}
      setComment={setComment}
      comment={comment}
      showForm={showForm}
      setShowForm={setShowForm}
      showCaptcha={showCaptcha}
      captchaRef={captchaRef}
      setCaptchaToken={setCaptchaToken}
    />
  );
  return (
    <Box>
      <div>
        {website}
        {actionBox}
        {reply}
        {trees}
      </div>
    </Box>
  );
};
export default Discussion;
