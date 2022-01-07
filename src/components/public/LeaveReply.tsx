import ReplyIcon from '@mui/icons-material/Reply';
import SendIcon from '@mui/icons-material/Send';
import {
  Box, Button
} from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import { AxiosError } from 'axios';
import React from 'react';
import { useMutation } from 'react-query';
import { Shout, Website } from '../../../types/common/types';
import HCaptcha from '../common/hcaptcha';

interface Props {
  parent?: Shout;
  website: Website
  setChildren: React.Dispatch<React.SetStateAction<Shout[]>>;
}

interface SuccessResponse {
  Shout: Shout;
}

const LeaveReply = ({
  parent, website, setChildren
}: Props) => {
  const [comment, setComment] = React.useState('');
  const [showForm, setShowForm] = React.useState(false);
  const [showCaptcha, setShowCaptcha] = React.useState(false);
  const [captchaToken, setCaptchaToken] = React.useState('');
  const captchaRef = React.createRef<HCaptcha>();
  const mutation = useMutation<SuccessResponse, AxiosError>(
    {
      onSuccess: (data) => {
        setComment('');
        setShowForm(false);
        setShowCaptcha(false);
        setCaptchaToken('');
        setChildren((c) => [data.Shout, ...c]);
      },
      onError: (err: AxiosError) => {
        if (err.response?.status === 402) {
          setShowCaptcha(true);
        }
      }
    }
  );
  const postComment = async (event: any) => {
    event.preventDefault();
    const mutateData = {
      WebsiteID: website.ID,
      ParentShoutID: parent?.ID,
      Comment: comment,
      CaptchaToken: captchaToken
    };
    // @ts-ignore
    const res = mutation.mutate({ route: '/post_shout', data: mutateData });
    return res;
  };
  const commentForm = (
    <form onSubmit={postComment}>
      <MDEditor
        textareaProps={{
          placeholder: 'Leave a reply...',
        }}
        height={100}
        value={comment}
        preview="edit"
        onChange={(value: string | undefined) => value !== undefined && setComment(value)}
      />
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
      {showCaptcha
        && (
          <HCaptcha
            sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY || ''}
            onVerify={(token) => setCaptchaToken(token)}
            ref={captchaRef}
          />
        )}
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

LeaveReply.defaultProps = { parent: null };
export default LeaveReply;
