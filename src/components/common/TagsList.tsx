import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';

interface Props {
  open: any;
  handleClose: () => any;
  tags: any
}

function TagsList({
  open, handleClose, tags
}: Props) {
  function clickTag(tag : string) {
    window.open(`${process.env.PUBLIC_WEB}/v/${tag}`, '_blank', 'noopener,noreferrer');
    return false;
  }
  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={handleClose}>
      <DialogTitle id="simple-dialog-title">Selected Tags</DialogTitle>
      <DialogContent style={{ minWidth: '300px' }}>
        {(tags)?.length > 0
          ? tags?.map((t: any) => (
            <Box
              onClick={() => clickTag(`${t}`)}
              style={{
                textTransform: 'uppercase', marginTop: '20px', marginBottom: '20px', cursor: 'pointer'
              }}
            >
              {t}
            </Box>
          )) : <Button size="small">No Tags</Button>}
      </DialogContent>
    </Dialog>
  );
}

TagsList.defaultProps = {
};

export default TagsList;
