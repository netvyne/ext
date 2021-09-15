// import React from "react";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Shout, Website } from '../../../types/common/types';

interface Props {
  // eslint-disable-next-line react/require-default-props
  parent?: Shout;
  website: Website;
  url: URL;
}

const LeaveReply = ({ parent, website, url }: Props) => {
  const queryClient = useQueryClient();
  const [comment, setComment] = React.useState('');
  const [showForm, setShowForm] = React.useState(false);
  const replyMutation = useMutation({});
  const postComment = async (event : any) => {
    event.preventDefault();
    const data = {
      ParentShoutID: parent?.ID,
      Comment: comment,
      URL: {
        Host: url.host,
        Pathname: url.pathname,
        Search: url.search,
      },
    };

    const res: any = replyMutation.mutate(
      // @ts-ignore
      {
        route: '/post_shout',
        data,
      },
      {
        onSuccess: (response : any) => {
          setComment('');
          queryClient.invalidateQueries(`/get_shout_trees?host=${url.host}&pathname=${url.pathname}&search=${encodeURIComponent(url.search)}`);
        },
      },
    );
    return res;
  };

  // queryClient.invalidateQueries('/get_website_feed');

  const commentForm = (
    <Grid className="website-comment">
      <form onSubmit={postComment}>
        <TextField value={comment} onInput={(e : any) => setComment(e.target.value)} />
        <Button type="submit" size="small" color="primary">
          Submit
        </Button>
      </form>
    </Grid>
  );
  return <Box className="leave-reply">{commentForm}</Box>;
};

export default LeaveReply;
