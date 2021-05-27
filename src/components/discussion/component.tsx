import { Box } from "@material-ui/core";
import React, { FunctionComponent, useEffect, useState  } from "react";
import { useQuery } from "react-query";
// import ChildBox from "./ChildBox";
import WebsiteBox from "./WebsiteBox";
import ActionBox from "./ActionBox";
import WebcommentTree from "./WebcommentTree";
import LeaveReply from "./LeaveReply";
import { useMutation } from "react-query";
import { User, Shout, Website } from "../../../types/common/types";
import {getCurrentUser} from "../../auth/auth"
 
interface GetWebcommentTreesQuery {
  Roots: Shout[];
  Website: Website;
}

const Discussion = (props : any) => {
  const [parentId, setParentId] = useState(0);

  const [user, setUser] = React.useState<User|any>()
  getCurrentUser().then( (currentUser:User|any) => setUser(currentUser))

  const [url, setUrl] = useState<any>('');

  useEffect(() => {
      const queryInfo = {active: true, lastFocusedWindow: true};
      chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
          let url : any = tabs[0].url;
          url = new URL(url);
          url["title"] = tabs[0].title;
          setUrl(url);
      });
  }, []);

  var route = `/get_shout_trees?host=${url.host}&pathname=${url.pathname}&search=${encodeURIComponent(url.search)}`;

  const { data, status } = useQuery<any, string>(route);
  let children;
  let website;
  let trees;
  if (status === "error") {
    website = <div>Error</div>;
    children = null;
  } else if (status === "loading") {
    website = <div>Loading</div>;
    children = null;
  } else {
    website = <>
      <WebsiteBox website={data.Website} url={url} />
      <LeaveReply website={data.Website} />
    </>;
    if(data.Roots){
      trees = data.Roots.map((treeRoot : any) => (
        <WebcommentTree
          website={data.Website}
          treeRoot={treeRoot}
          // reg={false}
          reg={!!user.Registered}
        />
      ));
    }
  }
  return (
    <Box>
      {website}
      <ActionBox  website={website} url={url} />
      {/* {children} */}
      {trees}
    </Box>
  );
};
export default Discussion;