/* eslint-disable linebreak-style */
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { TextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ReplyIcon from '@material-ui/icons/Reply';
import SendIcon from '@material-ui/icons/Send';
import React from 'react';

interface Props {
    // eslint-disable-next-line react/require-default-props
    postComment: any;
    setComment: any;
    comment: string;
    setShowForm: any;
    showForm: boolean;
    showCaptcha: boolean;
    setCaptchaToken: any;
    captchaRef: any;
  }

const ReplyUI = ({
  postComment, setComment, comment, showForm, setShowForm, showCaptcha, setCaptchaToken, captchaRef
}: Props) => {
  const commentForm = (
    <form onSubmit={postComment}>
      <div className="reply-form">
        <TextField
          value={comment}
          onInput={(e : any) => setComment(e.target.value)}
          multiline
          variant="outlined"
          placeholder={showForm ? 'Leave a public comment...' : 'Leave a public reply...'}
          fullWidth
          className="reply-form-textfield"
        />
        <Button type="submit" size="large" color="primary" endIcon={<SendIcon />} className="reply-form-button" />
      </div>
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
