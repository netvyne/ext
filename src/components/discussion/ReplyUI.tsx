/* eslint-disable linebreak-style */
import HCaptcha from '@hcaptcha/react-hcaptcha';
import ReplyIcon from '@mui/icons-material/Reply';
import SendIcon from '@mui/icons-material/Send';
import {
  Box, Button
} from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import React from 'react';

interface Props {
    // eslint-disable-next-line react/require-default-props
    postComment: any;
    setComment: any;
    comment: string;
    setShowForm: any;
    showForm: boolean;
    showCaptcha: any;
    captchaRef: any;
    setCaptchaToken: any;
  }

const ReplyUI = ({
  postComment, setComment, comment, showForm, setShowForm, showCaptcha,
  captchaRef, setCaptchaToken
}: Props) => {
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

export default ReplyUI;
