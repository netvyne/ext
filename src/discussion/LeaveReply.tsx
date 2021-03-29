import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import { fetchResource } from "../utils";
import SendIcon from "@material-ui/icons/Send";
import { useQueryClient } from "react-query";
const LeaveReply = props => {
  let parent_id;
  if (props.parent) {
    parent_id = props.parent.id;
  } else {
    parent_id = null;
  }
  const queryCache = useQueryClient();
  const [comment, setComment] = React.useState("");
  const postComment = async event => {
    event.preventDefault();
    var url = new URL(`${process.env.PUBLIC_API}/post_webcomment`);
    var init = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        host: document.location.host,
        pathname: document.location.pathname,
        search: document.location.search,
        parent_id: parent_id,
        comment: comment
      })
    };
    const res = await fetchResource(url, init);
    // invalidate query cache
    queryCache.invalidateQueries(
      `/get_webcomments?host=${document.location.host}&pathname=${document.location.pathname}&search=${document.location.search}&parent_id=${parent_id}`
    );
    return res.json();
  };
  var commentForm = (
    <form onSubmit={postComment}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div>
            <Typography>Leave a public reply... </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <TextField value={comment} onInput={e => setComment(e.target.value)} />
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small">Cancel</Button>
          <Button type="submit" size="small" color="primary" endIcon={<SendIcon />}>
            {" "}
            Submit{" "}
          </Button>
        </AccordionActions>
      </Accordion>
    </form>
  );
  return (
    <CssBaseline>
      <Box>{commentForm}</Box>
    </CssBaseline>
  );
};
export default LeaveReply;
