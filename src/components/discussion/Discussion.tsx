/* eslint-disable max-len */
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Box } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { AxiosError } from 'axios';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  Shout, Url, User, Website
} from '../../../types/common/types';
import { Error } from '../error';
import ActionContainer from './ActionContainer';
import ReplyUI from './ReplyUI';
// import ShoutTreeContainer from './ShoutTreeContainer';
import ShoutTree from './ShoutTree';
import WebsiteUI from './WebsiteUI';

interface Props {
  initCurrentUser: User[];
  initUrl: Url
}

interface GetShoutTreesQuery {
  Roots: Shout[];
  Website: Website;
}

interface SuccessResponse {
  Shout: Shout;
}

const Discussion = ({ initCurrentUser, initUrl } : Props) => {
  const url : any = initUrl;
  const user : any = initCurrentUser;
  const [showForm, setShowForm] = React.useState(true);
  const [showCaptcha, setShowCaptcha] = React.useState(false);
  const [captchaToken, setCaptchaToken] = React.useState('');
  const captchaRef = React.createRef<HCaptcha>();
  const [comment, setComment] = React.useState('');

  const route = `/get_shout_trees?host=${url.host}&pathname=${url.pathname}&search=${encodeURIComponent(url.search)}`;
  // const { data, status } = useQuery<GetShoutTreesQuery, string>(route);
  const { data, status, refetch } = useQuery<GetShoutTreesQuery, string>(
    route, { enabled: !!user },
  );

  // const replyMutation = useMutation({});
  const replyMutation = useMutation<SuccessResponse, AxiosError>(
    {
      onSuccess: () => {
        setComment('');
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
  const queryClient = useQueryClient();

  const postComment = async (event : any) => {
    event.preventDefault();
    const postShoutData = {
      Comment: comment,
      URL: {
        Host: url.host,
        Pathname: url.pathname,
        Search: url.search,
      },
      CaptchaToken: captchaToken
    };

    // const res: any = replyMutation.mutate(
    //   // @ts-ignore
    //   {
    //     route: '/post_shout',
    //     data: postShoutData,
    //   },
    //   {
    //     onSuccess: (response : any) => {
    //       setComment('');
    //       refetch();
    //       queryClient.invalidateQueries(`/get_shout_trees?host=${url.host}&pathname=${url.pathname}&search=${encodeURIComponent(url.search)}`);
    //       // TODO: Update cached data
    //     },
    //     onError: (err: AxiosError) => {
    //       if (err.response?.status === 402) {
    //         setShowCaptcha(true);
    //       }
    //     }
    //   },
    // );
    // @ts-ignore
    const res = replyMutation.mutate({ route: '/post_shout', data: postShoutData });
    // setShowForm(false);
    // setComment('');
    // refetch();
    return res;
    // setShowForm(false);
  };

  let children : any = '';
  let website : any = '';
  let trees : any = '';
  let actionBox;
  if (status === 'error') {
    website = <Error />;
    children = null;
  } else if (status === 'loading' || !data) {
    website = (
      <Grid
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Grid>
    );
    children = null;
  } else {
    website = (
      <>
        <WebsiteUI initWebsite={data.Website} url={url} />
      </>
    );
    actionBox = (
      <>
        <ActionContainer initWebsite={data.Website} reg={user?.Registered} url={url} />
      </>
    );
    if (data.Roots) {
      trees = '';
      if (data.Roots.length > 0) {
        trees = data.Roots.map((treeRoot : any) => (
          // <ShoutTreeContainer
          //   key={treeRoot.ID}
          //   treeRoot={treeRoot}
          //   user={user}
          //   url={url}
          //   website={data.Website}
          //   refetch={refetch}
          //   showCaptcha={showCaptcha}
          //   setShowCaptcha={setShowCaptcha}
          //   captchaRef={captchaRef}
          //   setCaptchaToken={setCaptchaToken}
          //   captchaToken={captchaToken}
          // />
          <ShoutTree
            key={treeRoot.ID}
            website={data.Website}
            treeRoot={treeRoot}
            reg={!!user.Registered}
            defUser={user}
            refetch={refetch}
          />
        ));
      } else {
        trees = (
          <Grid item component={Box}>
            No comments so far
          </Grid>
        );
      }
    } else {
      trees = (
        <Grid item component={Box}>
          No comments so far
        </Grid>
      );
    }
  }
  const reply = (
    <ReplyUI
      postComment={postComment}
      setComment={setComment}
      comment={comment}
      showForm={showForm}
      setShowForm={setShowForm}
      showCaptcha={showCaptcha}
      captchaRef={captchaRef}
      setCaptchaToken={setCaptchaToken}
    />
  );
  return (
    <Box>
      <div>
        {website}
        {actionBox}
        {reply}
        {trees}
      </div>
    </Box>
  );
};
export default Discussion;
