/* eslint-disable indent */
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Typography } from '@material-ui/core';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import {
    Shout, Url, User, Website
} from '../../../types/common/types';
import { CustomError } from '../../query';
import ActionContainer from './ActionContainer';
import ReplyUI from './ReplyUI';
import ShoutUI from './ShoutUI';

interface GetUserQuery {
    initCurrentUser: User[];
    initUrl: Url;
}

interface GetShout {
    LatestShout: Shout,
    Roots: Shout[],
    Website: Website,
}

interface SuccessResponse {
    Shout: Shout;
  }

const ShoutContainer = ({ initCurrentUser, initUrl }: GetUserQuery) => {
  const url : any = initUrl;
  const [showCommentField, setShowCommentField] = React.useState<boolean>(true);
  const [comment, setComment] = React.useState('');
  const [showForm, setShowForm] = React.useState(true);
  const [latestShout, setLatestShout] = React.useState<any>();
  const [website, setWebsite] = React.useState<any>();
  const [showCaptcha, setShowCaptcha] = React.useState(false);
  const [captchaToken, setCaptchaToken] = React.useState('');
  const captchaRef = React.createRef<HCaptcha>();
  const route = `/get_shout_trees?host=${url.host}&pathname=${url.pathname}&search=${encodeURIComponent(url.search)}`;

  const { data, status } = useQuery<GetShout, string>(route, {
    onSuccess: (res) => {
        setLatestShout(res.LatestShout);
        setWebsite(res.Website);
    }
  });

  function clickHandler(e : any, websiteId: number) {
    e.preventDefault();
    window.open(`${process.env.PUBLIC_WEB}/w/${websiteId}`, '_blank', 'noopener,noreferrer');
    return false;
  }

  const mutation = useMutation<SuccessResponse, CustomError>(
    {
      onSuccess: () => {
        setComment('');
        setShowCaptcha(false);
        setCaptchaToken('');
      },
      onError: (err : CustomError) => {
          console.log(' ------- ', err.res.status);
        if (err.res.status === 402) {
          setShowCaptcha(true);
        }
      }
    }
  );

  const postComment = async (event : any) => {
    event.preventDefault();
    const commentData = {
      Comment: comment,
      URL: {
        Host: url.host,
        Pathname: url.pathname,
        Search: url.search,
      },
      CaptchaToken: captchaToken
    };

    const res: any = mutation.mutate(
      // @ts-ignore
      {
        route: '/post_shout',
        data: commentData,
      },
      {
        onSuccess: (response : any) => {
          setComment('');
          // latestShout = response.Shout;
          setLatestShout(response.Shout);
          website.Public = true;
          setWebsite(website);
          // TODO: Update cached data
        },
      },
    );
    setShowForm(true);
    return res;
  };

  let actionBox : any = '';
  if (website) {
    actionBox = (
      <>
        <ActionContainer initWebsite={website} reg url={url} />
      </>
    );
  }
  let shout: any = '';
  if (latestShout && latestShout.Comment) {
    shout = (
      <ShoutUI
        initLatestShout={latestShout}
        clickHandler={clickHandler}
      />
    );
  } else {
    shout = (
      <>
        <Typography className="first-comment-title">Be the first to comment on this page</Typography>
        <ReplyUI
          postComment={postComment}
          setComment={setComment}
          comment={comment}
          showForm={showForm}
          setShowForm={setShowForm}
          showCaptcha={showCaptcha}
          setCaptchaToken={setCaptchaToken}
          captchaRef={captchaRef}
        />
      </>
    );
  }

  return (
    <>
      {actionBox}
      {shout}
    </>
  );
};

export default ShoutContainer;
