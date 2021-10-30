import { IconButton } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { Emoji, Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import React from 'react';
import { useMutation } from 'react-query';
import { Talk, User } from '../../../types/common/types';

interface Props {
  initTalk: Talk;
  defUser: User;
}

const useStyles = makeStyles(() => ({
  emojisContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  emojiIcon: {
    border: 'solid 1px #000000',
    borderRadius: '10px',
    width: '40px',
    height: '22px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '5px',
  },
  tooltipContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

const BlackTooltip = withStyles({
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
})(Tooltip);
export default function TalkVoteButtons({ initTalk, defUser }: Props) {
  const classes = useStyles();
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
    return `${reactionString.replace(/,([^,]*)$/, ' and $1')} reacted with :${emoji}:`;
  }

  const voteMutation = useMutation({});

  const postEmoji = async (emoji: any) => {
    // console.log(emoji);
    setShow(false);
    const mutateData = {
      Status: emoji.id,
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
    <Grid component={Box} container direction="row" className={classes.emojisContainer}>
      {show ? (
        <Picker
          set="apple"
          onSelect={postEmoji}
          title=""
          style={{
            position: 'absolute', zIndex: 10
          }}
        />
      )
        : <IconButton size="small" onClick={() => setShow(true)}><InsertEmoticonIcon /></IconButton>}
      {uniqueReactions.map((vote: any) => (
        <div className={classes.emojiIcon}>
          <BlackTooltip
            title={(
              <div className={classes.tooltipContainer}>
                <Emoji
                  emoji={vote}
                  set="apple"
                  size={20}
                  onClick={postEmoji}
                />
                {getReactors(vote)}
              </div>
            )}
            arrow
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Emoji
                emoji={vote}
                set="apple"
                size={16}
                onClick={postEmoji}
              />
              {getCount(vote)}
            </div>
          </BlackTooltip>
        </div>
      ))}
    </Grid>
  );
}
