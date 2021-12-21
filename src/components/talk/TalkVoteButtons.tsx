import CancelIcon from '@mui/icons-material/Cancel';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { Button, IconButton } from '@mui/material';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { Emoji, Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import React from 'react';
import { useMutation } from 'react-query';
import { Talk, User } from '../../../types/common/types';

interface Props {
  initTalk: Talk;
  defUser: User;
}
const EmojisContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));
const EmojiIcon = styled('div')(() => ({
  border: 'solid 1px #000000',
  borderRadius: '10px',
  width: '40px',
  height: '22px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '5px',
  padding: '5px'
}));
const TooltipContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'auto',
}));
// const defaultTheme = createTheme();
const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'black',
          borderRadius: '5px',
          color: 'white',
          padding: '4px 8px',
          fontSize: '14px',
          maxWidth: 150,
          wordWrap: 'break-word',
          fontWeight: 'normal',
        },
        arrow: {
          color: 'black',
        },
      }
    }
  }
});
const BlackTooltip = styled(Tooltip)(() => ({
  tooltip: {
    backgroundColor: 'black',
    borderRadius: '5px',
    color: 'white',
    padding: '4px 8px',
    fontSize: '14px',
    maxWidth: 150,
    wordWrap: 'break-word',
    fontWeight: 'normal',
  },
  arrow: {
    color: 'black',
  },
}));
export default function TalkVoteButtons({ initTalk, defUser }: Props) {
  const [talk, setTalk] = React.useState(initTalk);
  const [show, setShow] = React.useState(false);

  const uniqueReactions: any = [];
  talk.VoteStatus.map((msg: any) => {
    if (uniqueReactions.indexOf(msg.Status) === -1) {
      uniqueReactions.push(msg.Status);
    }
    return uniqueReactions;
  });

  function getCount(emoji: any) {
    const emojis = talk.VoteStatus.filter((obj: any) => (obj.Status === emoji));
    return emojis.length;
  }

  function getReactors(emoji: any) {
    const reactionString = talk.VoteStatus
      .filter((t: any) => t.Status === emoji)
      .map((t: any) => ((defUser.Handle === t.User.Handle) ? 'you' : t.User.FirstName)).join(', ');
    return `${reactionString.replace(/,([^,]*)$/, ' and $1')} reacted with ${emoji}`;
  }

  const voteMutation = useMutation({});

  const postEmoji = async (emoji: any) => {
    // console.log(emoji);
    setShow(false);
    const mutateData = {
      Status: (emoji.native) ? emoji.native : emoji,
      TalkID: talk.ID,
    };
    const res: any = voteMutation.mutate(
      // @ts-ignore
      {
        route: '/post_vote_talk',
        data: mutateData,
      },
      {
        onSuccess: (data: any) => {
          setTalk(data.Talk);
        },
      },
    );
    return res;
  };

  return (
    // @ts-ignore
    // <Grid component={Box} container direction="row" className={classes.emojisContainer}>
    <ThemeProvider theme={theme}>
      <EmojisContainer>
        {show ? (
          <div style={{ display: 'flex', position: 'absolute' }}>
            <Picker
              set="apple"
              onSelect={postEmoji}
              title=""
              style={{
                position: 'relative', zIndex: 10
              }}
            />
            <CancelIcon
              onClick={() => setShow(false)}
              sx={{
                position: 'absolute',
                zIndex: '99',
                bottom: '443px',
                backgroundColor: '#ffffff',
                border: 'solid 1px #d9d9d9',
                color: '#858585',
                borderRadius: '50%',
                width: '25px',
                height: '25px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                right: '-13px',
                cursor: 'pointer',
                top: '-13px',
              }}
            >
              X

            </CancelIcon>
          </div>
        )
          : <IconButton size="small" onClick={() => setShow(true)}><InsertEmoticonIcon /></IconButton>}
        <div style={{
          display: 'flex', overflowX: 'scroll', overflowY: 'hidden', maxWidth: '272px'
        }}
        >
          {uniqueReactions.map((vote: any) => (
            <EmojiIcon>
              <BlackTooltip
                title={(
                  <TooltipContainer>
                    <Emoji
                      emoji={vote}
                      set="apple"
                      size={20}
                      onClick={postEmoji}
                    />
                    {getReactors(vote)}
                  </TooltipContainer>
            )}
                arrow
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Button onClick={() => postEmoji(vote)}>
                    {`${vote} ${getCount(vote)}`}
                  </Button>
                </div>
              </BlackTooltip>
            </EmojiIcon>
          ))}
        </div>
      </EmojisContainer>
    </ThemeProvider>
  );
}
