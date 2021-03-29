import { Box } from "@material-ui/core";
import { useState } from "react";
import * as React from "react";
import { useQuery } from "react-query";
import ChildBox from "./ChildBox";
import WebsiteBox from "./WebsiteBox";
import ActionBox from "./ActionBox";
const Discussion = props => {
  const [parentId, setParentId] = useState(0);
  let location = document.location;
  var route = `/get_webcomment_trees?host=${location.host}&pathname=${location.pathname}&search=${location.search}`;
  if (parentId) {
    route += `&root_ids=${parentId}`;
  }
  const { data, status } = useQuery(route);
  let children;
  let website;
  if (status === "error") {
    website = <div>Error</div>;
    children = null;
  } else if (status === "loading") {
    website = <div>Loading</div>;
    children = null;
  } else {
    website = <WebsiteBox website={data.website} />;
    if (data.children) {
      children = data.children.map(comment => <ChildBox comment={comment} setParentId={setParentId} />);
    }
  }
  return (
    <Box>
      {website}
      <ActionBox />
      {children}
    </Box>
  );
};
export default Discussion;
