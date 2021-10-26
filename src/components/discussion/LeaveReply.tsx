import HCaptcha from '@hcaptcha/react-hcaptcha';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ReplyIcon from '@material-ui/icons/Reply';
import SendIcon from '@material-ui/icons/Send';
import { AxiosError } from 'axios';
import React from 'react';
import { useMutation } from 'react-query';
// import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Shout, Website } from '../../../types/common/types';

interface Props {
  parent?: Shout;
  website: Website;
  refetch: () => any;
}

interface SuccessResponse {
  Shout: Shout;
}

const LeaveReply = ({ parent, website, refetch }: Props) => {
  const [comment, setComment] = React.useState('');
  const [showForm, setShowForm] = React.useState(false);
  const [showCaptcha, setShowCaptcha] = React.useState(false);
  const [captchaToken, setCaptchaToken] = React.useState('');
  const captchaRef = React.createRef<HCaptcha>();
  const mutation = useMutation<SuccessResponse, AxiosError>(
    {
      onSuccess: () => {
        setComment('');
        setShowForm(false);
        setShowCaptcha(false);
        setCaptchaToken('');
        refetch();
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
    // setShowForm(false);
    // setComment('');
    // refetch();
    return res;
  };
  const commentForm = (
    <form onSubmit={postComment}>
      <TextField value={comment} onInput={(e: any) => setComment(e.target.value)} />
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
