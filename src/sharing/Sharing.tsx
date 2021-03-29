import React from "react";
import { fetchResource } from "../utils";
import Button from "@material-ui/core/Button";
import Dropdown from "./Dropdown";
import Screenshot from "./Screenshot";
import TextField from "@material-ui/core/TextField";
import { Box } from "@material-ui/core";
import { useMutation } from "react-query";
import CircularProgress from "@material-ui/core/CircularProgress";
const Sharing = props => {
  const [friendIds, setFriendIds] = React.useState([]);
  const [comment, setComment] = React.useState("");
  const [dataURL, setDataURL] = React.useState("");
  const [rect, setRect] = React.useState({ startX: 0, startY: 0 });
  const postShare = async () => {
    var url = new URL(`${process.env.PUBLIC_API}/send_share`);
    var args = {
      host: document.location.host,
      pathname: document.location.pathname,
      search: document.location.search,
      dataURL: dataURL,
      rect: rect,
      receiver_ids: friendIds,
      comment: comment
    };
    var init = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(args)
    };
    const res = await fetchResource(url, init);
    return res.json();
  };
  const mutation = useMutation(postShare);
  const onPostShare = async e => {
    // Prevent the form from refreshing the page
    e.preventDefault();
    try {
      await mutation.mutate();
      // reset form state
      setFriendIds([]);
      setComment("");
    } catch (error) {
      // Uh oh, something went wrong
    }
  };
  let bottom;
  if (mutation.isLoading) {
    bottom = (
      <Box>
        <Button type="submit">
          {" "}
          <CircularProgress color="inherit" size={20} />
        </Button>
      </Box>
    );
  } else if (mutation.isError) {
    bottom = (
      <Box>
        Error!<Button type="submit"> Share Site</Button>
      </Box>
    );
  } else if (mutation.isSuccess) {
    bottom = (
      <Box>
        Success!<Button type="submit"> Share Site</Button>
      </Box>
    );
  } else {
    bottom = (
      <Box>
        <Button type="submit"> Share Site</Button>
      </Box>
    );
  }
  let bbox = <Box />;
  return (
    <Box m={1}>
      <form onSubmit={onPostShare}>
        <Dropdown setFriendIds={setFriendIds} key={mutation.isLoading} />
        {bbox}
        <Screenshot
          modalContainer={bbox}
          dataURL={dataURL}
          setDataURL={setDataURL}
          rect={rect}
          setRect={setRect}
        />
        <Box m={1}>
          <TextField
            value={comment}
            onInput={e => setComment(e.target.value)}
            id="nv-message"
            label="Message"
            placeholder="Lookit!"
            fullWidth
            multiline
            rows={3}
          />
        </Box>
        {bottom}
      </form>
    </Box>
  );
};
export default Sharing;
