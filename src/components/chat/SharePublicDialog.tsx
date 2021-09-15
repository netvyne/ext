import HCaptcha from '@hcaptcha/react-hcaptcha';
import { DialogContent, DialogContentText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import React from 'react';
import { useMutation } from 'react-query';
import { Shout, Website } from '../../../types/common/types';
import { CustomError } from '../../query';

interface Props {
  open: any;
  handleClose: ()=> any;
  website?: Website;
}

interface SuccessResponse {
    Shout: Shout;
  }

function SharePublicDialog({ open, handleClose, website } : Props) {
  console.log('website :::: ', website);
  const [showCaptcha, setShowCaptcha] = React.useState(false);
  const [url, setUrl] = React.useState(website?.URL);
  const [tag, setTag] = React.useState('');
  const [captchaToken, setCaptchaToken] = React.useState('');
  const captchaRef = React.createRef<HCaptcha>();
  const mutation = useMutation<SuccessResponse, CustomError>(
    {
      onSuccess: () => {
        setTag('');
        setShowCaptcha(false);
        setCaptchaToken('');
        handleClose();
      },
      onError: (err : CustomError) => {
        if (err.res.status === 402) {
          setShowCaptcha(true);
        }
      }
    }
  );
  const postSharePublic = async (event: any) => {
    event.preventDefault();
    const mutateData = {
      URL: url,
      LabelName: tag,
      CaptchaToken: captchaToken
    };
    // @ts-ignore
    const res = mutation.mutate({ route: '/post_website_public', data: mutateData });
    // refetch();
    return res;
  };
  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={handleClose}>
      <DialogTitle id="simple-dialog-title">Make Website Public</DialogTitle>
      <DialogContent>
        <DialogContentText>Default Tag: Any</DialogContentText>
        <form onSubmit={postSharePublic}>
          <TextField
            disabled={!!website}
            value={url}
            onInput={(e: any) => setUrl(e.target.value)}
            autoFocus={!website}
            margin="dense"
            label="URL"
            fullWidth
          />
          <TextField
            value={tag}
            onInput={(e: any) => setTag(e.target.value)}
            autoFocus={!!website}
            margin="dense"
            label="Tag"
            fullWidth
          />
          <Button
            type="submit"
            size="small"
            color="primary"
            endIcon={<SendIcon />}
            disabled={!url}
          >
            {' '}
            Submit
            {' '}
          </Button>
          {showCaptcha
            && (
              <HCaptcha
                sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY || ''}
                onVerify={(token : any) => setCaptchaToken(token)}
                ref={captchaRef}
              />
            )}
        </form>
      </DialogContent>
    </Dialog>
  );
}

SharePublicDialog.defaultProps = {
  website: undefined,
};

export default SharePublicDialog;
