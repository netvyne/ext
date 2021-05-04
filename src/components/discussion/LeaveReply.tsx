import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ReplyIcon from "@material-ui/icons/Reply";
import SendIcon from "@material-ui/icons/Send";
import { Shout, Website } from "../../../types/common/types";

interface Props {
  parent?: Shout;
  website: Website;
}

const LeaveReply = (props : Props) => {
  const [comment, setComment] = React.useState("");
  const [showForm, setShowForm] = React.useState(false);
  const postComment = async (event : any) => {
    event.preventDefault();
    var url = new URL(`${process.env.REACT_APP_PUBLIC_API}/post_shout`);
    var init = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        WebsiteID: props.website.ID,
		    ParentShoutID: props.parent?.ID,
		    Comment: comment,
      }),
    };
    //@ts-ignore
    const res = await fetch(url, init);
    setComment("");
    return res.json();
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
