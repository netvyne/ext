import { Box } from "@material-ui/core";
import React, { FunctionComponent, useState } from "react";
import { useQuery } from "react-query";
import ChildBox from "./ChildBox";
import WebsiteBox from "./WebsiteBox";
import ActionBox from "./ActionBox";
import WebcommentTree from "./WebcommentTree";
import LeaveReply from "./LeaveReply";
import { User, Shout, Website } from "../../../types/common/types";

interface GetUserQuery {
  CurrentUser: User;
}

interface GetWebcommentTreesQuery {
  Roots: Shout[];
  Website: Website;
}

const Discussion = (props : any) => {
  const [parentId, setParentId] = useState(0);
  let location = document.location;
  var route = `/get_shout_trees?website_id=102`;
  // if (parentId) {
  //   route += `&root_ids=${parentId}`;
  // }
  const { data, status } = useQuery<any, string>(route);
  const userQuery : any = useQuery<GetUserQuery>("/get_user");
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
      <WebsiteBox website={data.Website} />
      <LeaveReply website={data.Website} />
    </>;
    // if (data.Roots[0].Children) {
    //   children = data.Roots[0].Children.map((Comment : any) => (
    //     <ChildBox comment={Comment} setParentId={setParentId} />
    //   ));
    // }
    trees = data.Roots.map((treeRoot : any) => (
      <WebcommentTree
        website={data.Website}
        treeRoot={treeRoot}
        // reg={true}
        reg={!!userQuery.data.CurrentUser.Provider}
      />
    ));
  }
  return (
    <Box>
      {website}
      <ActionBox />
      {/* {children} */}
      {trees}
    </Box>
  );
};
export default Discussion;