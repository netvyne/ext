/* eslint-disable linebreak-style */
// import HCaptcha from '@hcaptcha/react-hcaptcha';
import ReplyIcon from '@mui/icons-material/Reply';
import SendIcon from '@mui/icons-material/Send';
import {
  Box, Button
} from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import React from 'react';
import HCaptcha from '../common/@hcaptcha/react-hcaptcha';

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
      <Box my={1}>
        <Button
          type="submit"
          size="small"
          endIcon={<SendIcon />}
          fullWidth
          style={{ color: 'white', backgroundColor: '#54dc3c' }}
        >
          {' '}
          Submit
          {' '}
        </Button>
        {showCaptcha
        && (
          <div style={{ position: 'absolute' }}>
            <HCaptcha
              sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY || ''}
              onVerify={(token) => setCaptchaToken(token)}
              ref={captchaRef}
            />
          </div>
        )}
      </Box>
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
  return <Box bgcolor="white">{content}</Box>;
};

export default ReplyUI;
