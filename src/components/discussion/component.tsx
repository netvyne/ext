import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
// import ChildBox from "./ChildBox";
import WebsiteBox from './WebsiteBox';
import ActionBox from './ActionBox';
import WebcommentTree from './WebcommentTree';
import LeaveReply from './LeaveReply';

import { User, Shout, Website } from '../../../types/common/types';
import { getCurrentUser } from '../../auth/auth';
import { isValidURL } from '../../utils';

interface GetWebcommentTreesQuery {
  Roots: Shout[];
  initWebsite: Website;
}

const Discussion = () => {
  const [user, setUser] = React.useState<User|any>();

  const [url, setUrl] = useState<any>({});

  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };
    if (chrome.tabs) {
      chrome.tabs.query(queryInfo, (tabs) => {
        const newUrl : any = isValidURL(tabs[0].url);
        const formatedUrl = {
          pathname: newUrl.pathname,
          host: newUrl.host,
          search: newUrl.search,
          Title: tabs[0].title,
        };
        setUrl(formatedUrl);
      });
    }
    getCurrentUser().then((currentUser:User|any) => {
      console.log('currentUser ::: ', currentUser);
      setUser(currentUser);
      console.log('currentUser after ::: ', user);
    });
  }, []);

  const route = `/get_shout_trees?host=${url.host}&pathname=${url.pathname}&search=${encodeURIComponent(url.search)}`;

  const { data, status } = useQuery<any, string>(route);
  let children;
  let website;
  let trees;
  let actionBox;
  if (status === 'error') {
    website = <div>Error</div>;
    children = null;
  } else if (status === 'loading') {
    website = <div>Loading</div>;
    children = null;
  } else {

    
    console.log('Data :::: ', data);
    console.log('User ::: ', user);
    // setCreatedWebsite(data.Website);
    // console.log("Created Website", createdWebsite);
    website = (
      <>
        <WebsiteBox initWebsite={data.Website} url={url} />
        <LeaveReply website={data.Website} url={url} />
      </>
    );
    actionBox = (
      <>
        <ActionBox initWebsite={data.Website} reg={user.Registered} url={url} />
      </>
    );
    if (data.Roots) {
      trees = data.Roots.map((treeRoot : any) => (
        <WebcommentTree
          website={data.Website}
          treeRoot={treeRoot}
          // reg={false}
          reg={!user.Registered}
          url={url}
        />
      ));
    }
  }
  return (
    <Box>
      {website}
      {actionBox}
      {/* {children} */}
      {trees}
    </Box>
  );
};
export default Discussion;
