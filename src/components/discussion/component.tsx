import { Box } from "@material-ui/core";
import React, { FunctionComponent, useState } from "react";
import { useQuery } from "react-query";
import ChildBox from "./ChildBox";
import WebsiteBox from "./WebsiteBox";
import ActionBox from "./ActionBox";

const Discussion = (props : any) => {
// export const Discussion : FunctionComponent = (props : any) => {

  const [parentId, setParentId] = useState(0);
  let location = document.location;
  var route = `/get_webcomment_trees?host=${location.host}&pathname=${location.pathname}&search=${location.search}`;
  if (parentId) {
    route += `&root_ids=${parentId}`;
  }
  const data : any = {
    children: [],
    parent_id: 12,
    isSaved: true,
    created_date: "2021-04-20 00:00:00",
    id: 12,
    author_id: 12,
    author: {
      created_date: "2021-04-14 00:00:00",
      is_registered: false,
      id: 1,
      username: "Ali Raza",
      _passhash: "hfgfghfgfgfgh",
      role: "user",
      google_id: "",
      apple_id: "",
      given_name: "",
      family_name: "",
      email: "aliraza955@gmail.com",
      picture_url: "",
      birthday: "2021-04-14 00:00:00",
      profile_nonce: 12
    },
    website_id: 12,
    website: {
      id: 12,
      host: "host",
      pathname: "path name",
      search: "search",
      title: "Title",
      description: "Description",
      image: "Image",
      preview_processed: false,
      isSaved: true,
      url: "URL",
      created_date: "2021-04-14 00:00:00",
      webcomments: 12
    },
    comment: "COMMENT",
    level: 1,
    voted: {
      id: 12,
      user_id: 12,
      webcomment_id: 12,
      website_id: 12,
      sharecomment_id: 12,
      vote_id: 12,
      vote_type: "VOTE TYPE"
    },
    karma: 12
  };
  const status : any  = "Done";
  // const { data, status } = useQuery(route);
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
      children = data.children.map((comment : any) => (
        <ChildBox comment={comment} setParentId={setParentId} />
      ));
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
