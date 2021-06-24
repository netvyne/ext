import React, { FunctionComponent } from 'react';
// import { useQuery } from 'react-query';
import Box from '@material-ui/core/Box';
// import { fetchResource, clearNotificationBadge } from '../../utils';
import NotificationBox from './NotificationBox';

// const clearNotifications = async () => {
//   const url = new URL(`${process.env.PUBLIC_API}/mark_all_read`);
//   const init = {
//     method: 'POST',
//     mode: 'cors',
//     credentials: 'include',
//     cache: 'no-cache',
//     headers: { 'Content-Type': 'application/json' },
//     referrerPolicy: 'no-referrer',
//     body: JSON.stringify({}),
//   };
//   const res : any = await fetchResource(url, init);
//   clearNotificationBadge();
//   return res.json();
// };

export const Notifications : FunctionComponent = () => {
  // function getNotifications() {
  //   return async () => {
  //     const url : any = new URL(`${process.env.PUBLIC_API}/get_notifications`);
  //     const res : any = await fetchResource(url, '');
  //     const notificationCount = res.notifications.filter((x : any) => !x.read).length;
  //     console.log(notificationCount, 'notification_count');

  //     if (props.selected) {
  //       clearNotifications();
  //     }
  //     return res;
  //   };
  // }\
  // const { data, status } = useQuery(`notifications`, getNotifications(), {
  //   refetchInterval: 10000,
  //   refetchIntervalInBackground: true,
  // });

  const data: any = {
    notifications: [{
      created_date: '2021-04-16 00:00:00',
      updated_date: '2021-04-16 00:00:00',
      creation_ip: '225.225.225.225',
      id: 12,
      receiver_id: 12,
      webcomment_id: 12,
      sharecomment_id: 12,
      read_date: '2021-04-16 00:00:00',
      author: 12,
      is_reply: 'Reply',
      comment: {
        author: {
          username: 'USER NAME',
        },
      },
      read: 'Read',
    }],
  };
  const status : any = 'Done';
  let notifications;
  if (status === 'error') {
    notifications = <div>Error</div>;
  } else if (status === 'loading') {
    notifications = <div>Loading</div>;
  } else {
    notifications = data.notifications.map((notification : any) => (
      <NotificationBox notification={notification} />
    ));
  }
  return <Box m={2}>{notifications}</Box>;
};

// export default Notifications;
