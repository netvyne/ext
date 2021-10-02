import HCaptcha from '@hcaptcha/react-hcaptcha';
import { DialogContent, DialogContentText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import { AxiosError } from 'axios';
import React from 'react';
import { useMutation } from 'react-query';
import { Shout, Website } from '../../../types/common/types';

interface Props {
  open: any;
  handleClose: ()=> any;
  website: Website;
  setWebsite: React.Dispatch<React.SetStateAction<Website>>
}

interface SuccessResponse {
    Shout: Shout;
  }

function PublishWebsite({
  open, handleClose, website, setWebsite
} : Props) {
  const [showCaptcha, setShowCaptcha] = React.useState(false);
  const [url, setUrl] = React.useState<any>(website?.URL);
  const [tag, setTag] = React.useState('');
  const [captchaToken, setCaptchaToken] = React.useState('');
  const captchaRef = React.createRef<HCaptcha>();
  const mutation = useMutation<SuccessResponse, AxiosError>(
    {
      onSuccess: () => {
        setTag('');
        setShowCaptcha(false);
        setCaptchaToken('');
        const updatedWebsite = website!;
        updatedWebsite.Public = true;
        setWebsite(updatedWebsite);
        handleClose();
      },
      onError: (err : AxiosError) => {
        if (err.response?.status === 402) {
          setShowCaptcha(true);
        }
      }
    }
  );
  const postSharePublic = async (event: any) => {
    event.preventDefault();
    const formatedUrl = new URL(url);
    const mutateData = {
      URL: {
        Host: formatedUrl.host,
        Pathname: formatedUrl.pathname,
        Search: formatedUrl.search,
      },
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
      <DialogTitle id="simple-dialog-title">{website.Public ? 'Add Another Tag' : 'Make Website Public'}</DialogTitle>
      <DialogContent>
        <DialogContentText>Once processed, this action cannot be undone.</DialogContentText>
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
                onVerify={(token) => setCaptchaToken(token)}
                ref={captchaRef}
              />
            )}
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default PublishWebsite;