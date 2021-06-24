// import React from "react";
import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ReplyIcon from '@material-ui/icons/Reply';
import SendIcon from '@material-ui/icons/Send';
import { useMutation } from 'react-query';
import { Shout, Website } from '../../../types/common/types';

interface Props {
  // eslint-disable-next-line react/require-default-props
  parent?: Shout;
  website: Website;
  url: URL;
}

const LeaveReply = ({ parent, website, url }: Props) => {
  const [comment, setComment] = React.useState('');
  const [showForm, setShowForm] = React.useState(false);

  // const [url, setUrl] = useState<any>('');
  /**
   * Get current URL
   */
  // useEffect(() => {
  //   const queryInfo = { active: true, lastFocusedWindow: true };
  //   // eslint-disable-next-line no-unused-expressions
  //   chrome.tabs && chrome.tabs.query(queryInfo, (tabs) => {
  //     let { newurl } : any = tabs[0];
  //     newurl = new URL(newurl);
  //     setUrl(newurl);
  //   });
  // }, []);

  const mutation = useMutation({});
  const postComment = async (event : any) => {
    event.preventDefault();
    console.log('url :::: ', url);
    const data = {
      ParentShoutID: parent?.ID,
      Comment: comment,
      URL: {
        Host: url.host,
        Pathname: url.pathname,
        Search: url.search,
      },
    };
    // @ts-ignore
    const res = mutation.mutate({ route: '/post_shout', data });
    setComment('');
    return res;
  };

  const commentForm = (
    <form onSubmit={postComment}>
      <TextField value={comment} onInput={(e : any) => setComment(e.target.value)} />
      <Button
        size="small"
        onClick={() => {
          setShowForm(false);
        }}
      >
        Cancel
      </Button>
      <Button type="submit" size="small" color="primary" endIcon={<SendIcon />}>
        {' '}
        Submit
        {' '}
      </Button>
    </form>
  );

  const content = showForm ? (
    commentForm
  ) : (
    <Button size="small" onClick={() => setShowForm(!showForm)}>
      Reply
      <ReplyIcon />
    </Button>
  );
  return <Box>{content}</Box>;
};

export default LeaveReply;
