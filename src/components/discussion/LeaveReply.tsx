// import React from "react";
import React, { FunctionComponent, useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ReplyIcon from "@material-ui/icons/Reply";
import SendIcon from "@material-ui/icons/Send";
import { useMutation } from "react-query";
import { Shout, Website } from "../../../types/common/types";

interface Props {
  parent?: Shout;
  website: Website;
}

const LeaveReply = (props : Props) => {
  const [comment, setComment] = React.useState("");
  const [showForm, setShowForm] = React.useState(false);

  const [url, setUrl] = useState<any>('');
  /**
   * Get current URL
   */
  useEffect(() => {
      const queryInfo = {active: true, lastFocusedWindow: true};

      chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
          let url : any = tabs[0].url;
          url = new URL(url);
          setUrl(url);
      });
  }, []);



  const mutation = useMutation({});
  const postComment = async (event : any) => {
    event.preventDefault();
    let data = {
		  ParentShoutID: props.parent?.ID,
		  Comment: comment,
      URL: {
        Host: url.host,
        Pathname: url.pathname,
        Search: url.search
      }
    };
    //@ts-ignore
    let res = mutation.mutate({ route: "/post_shout", data: data });
    setComment("");
    return res;
  };

  var commentForm = (
    <form onSubmit={postComment}>
      <TextField value={comment} onInput={(e : any) => setComment(e.target.value)} />
      <Button
        size="small"
        onClick={(e) => {
          setShowForm(false);
        }}
      >
        Cancel
      </Button>
      <Button type="submit" size="small" color="primary" endIcon={<SendIcon />}>
        {" "}
        Submit{" "}
      </Button>
    </form>
  );

  let content = showForm ? (
    commentForm
  ) : (
    <Button size="small" onClick={(e) => setShowForm(!showForm)}>
      Reply
      <ReplyIcon />
    </Button>
  );
  return <Box>{content}</Box>;
};

export default LeaveReply;
