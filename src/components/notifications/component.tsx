import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React, { FunctionComponent } from 'react';
import { useMutation, useQuery } from 'react-query';
import NotificationBox from './NotificationBox';

interface GetUserNotifsQuery {
  Notifications: Notification[];
  ContainsUnread: boolean;
}

export const Notifications : FunctionComponent = () => {
  const [allNotifications, setAllNotifications] = React.useState<any>([]);

  const notificationsQuery = useQuery<GetUserNotifsQuery, string>(
    '/get_user_notifications', { onSuccess: (data) => setAllNotifications(data.Notifications) }
  );

  const updateNotifMutation = useMutation({});
  const handleClickedNotif = async (event: any, notif: number, markAll: boolean) => {
    event.preventDefault();
    const mutateData = {
      NotifID: notif,
      Viewed: true,
      MarkAll: markAll,
    };
    const res = updateNotifMutation.mutate(
      // @ts-ignore
      {
        route: '/update_notification',
        data: mutateData,
      },
      {
        onSuccess: (response : any) => {
          console.log(response);
        },
      },
    );
    return res;
  };

  let notifications: any = '';
  if (notificationsQuery.status === 'error') {
    notifications = <div>Error</div>;
  } else if (notificationsQuery.status === 'loading') {
    notifications = <div>Loading</div>;
  } else {
    notifications = allNotifications.map((notification : any) => (
      <NotificationBox notification={notification} />
    ));
  }
  return (
    <Box m={2}>

      {allNotifications.length > 0 && (
      <Box>
        <Button
          type="button"
          onClick={(e) => { handleClickedNotif(e, 0, true); }}
        >
          Mark All as Viewed

        </Button>

        {notifications}
      </Box>
      )}
      {allNotifications.length === 0 && (
        <Box>No new notifications</Box>
      )}
    </Box>
  );
};
