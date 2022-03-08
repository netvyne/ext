/* eslint-disable linebreak-style */
import ReplyIcon from '@mui/icons-material/Reply';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import MDEditor from '@uiw/react-md-editor';
import React from 'react';
import HCaptcha from '../common/hcaptcha';

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
    themeColors: any;
    showFullEditor: boolean;
  }

const ReplyUI = ({
  postComment, setComment, comment, showForm, setShowForm, showCaptcha,
  captchaRef, setCaptchaToken, themeColors, showFullEditor
}: Props) => {
  const commentForm = (
    <form onSubmit={postComment}>
      <MDEditor
        textareaProps={{
          placeholder: 'Leave a reply...',
          style: {
            color: themeColors.commentText
          }
        }}
        height={100}
        value={comment}
        preview="edit"
        hideToolbar={!showFullEditor}
        onChange={(value: string | undefined) => value !== undefined && setComment(value)}
      />
      <Box my={1}>
        <Button
          type="submit"
          size="small"
          endIcon={<SendIcon />}
          fullWidth
          style={{ color: 'white', backgroundColor: '#54dc3c' }}
          disabled={comment.trim().length === 0}
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
  return <Box>{content}</Box>;
};

export default ReplyUI;
