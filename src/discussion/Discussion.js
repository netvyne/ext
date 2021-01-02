import { Box } from '@material-ui/core';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchResource } from '../utils';
import ChildBox from './ChildBox';
import ParentBox from './ParentBox';
import WebsiteBox from './WebsiteBox';


function getComments(parent_id) {
  return async () => {
    var url = new URL(`${process.env.PUBLIC_API}`)
    url.searchParams.append('host', document.location.host)
    url.searchParams.append('pathname', document.location.pathname)
    url.searchParams.append('search', document.location.search)
    if (parent_id) {
      url.searchParams.append('parent_id', parent_id)
    }
    const res = await fetchResource(url);
    return res.json();
  };
}

const Discussion = props => {
  const [parentId, setParentId] = useState(0);
  const { data, status } = useQuery(`/get_webcomments?host=${document.location.host}&pathname=${document.location.pathname}&search=${document.location.search}&parent_id=${parentId}`)
  let parent;
  let children;
  let website;
  if (status == 'error') {
    website = <div>Error</div>
    parent = null
    children = null
  } else if (status == 'loading') {
    website = <div>Loading</div>
    parent = null
    children = null
  } else {
    website = <WebsiteBox website={data.website} />
    parent = <ParentBox comment={data.parent} setParentId={setParentId} />
    if (data.children) {
      children = data.children.map((comment) => (<ChildBox comment={comment} setParentId={setParentId} />))
    }
  }
  return (
    <Box>
      {website}
      {parent}
      {children}
    </Box>
  );
};

export default Discussion;