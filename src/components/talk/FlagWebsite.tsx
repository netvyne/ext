import HCaptcha from '@hcaptcha/react-hcaptcha';
import SendIcon from '@mui/icons-material/Send';
import {
  Button, Dialog, DialogContent, DialogContentText,
  DialogTitle, FormControlLabel, Radio, RadioGroup,
  TextField
} from '@mui/material';
import { AxiosError } from 'axios';
import React from 'react';
import { useMutation } from 'react-query';
import { Shout, Website } from '../../../types/common/types';

interface Props {
  open: any;
  handleClose: () => any;
  website: Website
}

interface SuccessResponse {
  Shout: Shout;
}

function FlagWebsite({
  open, handleClose, website
}: Props) {
  const [showCaptcha, setShowCaptcha] = React.useState(false);
  const [value, setValue] = React.useState('');
  const handleChange = (event: any) => {
    setValue(event.target.value);
  };
  const [reason, setReason] = React.useState('');
  const [captchaToken, setCaptchaToken] = React.useState('');
  const captchaRef = React.createRef<HCaptcha>();
  const mutation = useMutation<SuccessResponse, AxiosError>(
    {
      onSuccess: () => {
        setReason('');
        setShowCaptcha(false);
        setCaptchaToken('');
        handleClose();
      },
      onError: (err: AxiosError) => {
        if (err.response?.status === 402) {
          setShowCaptcha(true);
        }
      }
    }
  );
  const postFlagWebsite = async (event: any) => {
    event.preventDefault();
    const mutateData = {
      WebsiteID: website.ID,
      [value]: true,
      Reason: reason,
      CaptchaToken: captchaToken
    };
    // @ts-ignore
    const res = mutation.mutate({ route: '/post_flag_website', data: mutateData });
    // refetch();
    return res;
  };
  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={handleClose}>
      <DialogTitle id="simple-dialog-title">Flag Website</DialogTitle>
      <DialogContent>
        <DialogContentText>Please select the best possible reason for flagging.</DialogContentText>
        <form onSubmit={postFlagWebsite}>
          <RadioGroup aria-label="category" name="category" value={value} onChange={handleChange}>
            <FormControlLabel value="Paywall" control={<Radio />} label="Paywall" />
            <FormControlLabel value="Gore" control={<Radio />} label="Gore" />
            <FormControlLabel value="Nudity" control={<Radio />} label="Nudity" />
            <FormControlLabel value="Violence" control={<Radio />} label="Violence" />
            <FormControlLabel value="Misinformation" control={<Radio />} label="Misinformation" />
            <FormControlLabel value="Obscene" control={<Radio />} label="Obscene" />
            <FormControlLabel value="Spam" control={<Radio />} label="Spam" />
            <FormControlLabel value="Invalid" control={<Radio />} label="Invalid" />
            <FormControlLabel value="Abuse" control={<Radio />} label="Abuse" />
            <FormControlLabel value="Illegal" control={<Radio />} label="Illegal" />
            <FormControlLabel value="Other" control={<Radio />} label="Other" />
          </RadioGroup>
          <TextField
            value={reason}
            onInput={(e: any) => setReason(e.target.value)}
            margin="dense"
            label="Reason"
            fullWidth
          />
          <Button
            type="submit"
            size="small"
            color="primary"
            endIcon={<SendIcon />}
            disabled={!value || !reason}
          >
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
      </DialogContent>
    </Dialog>
  );
}

FlagWebsite.defaultProps = {
};

export default FlagWebsite;
