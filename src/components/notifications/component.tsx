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
  const [notificationsCount, setNotificationsCount] = React.useState<number>(0);
  const { data, status } = useQuery<GetUserNotifsQuery, string>('/get_user_notifications');

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
  if (status === 'error') {
    notifications = <div>Error</div>;
  } else if (status === 'loading') {
    notifications = <div>Loading</div>;
  } else {
    notifications = data?.Notifications.map((notification : any) => (
      <NotificationBox notification={notification} />
    ));
  }
  return (
    <Box m={2}>

      <Button
        type="button"
        onClick={(e) => { handleClickedNotif(e, 0, true); }}
      >
        Mark All as Viewed

      </Button>

      {notifications}
    </Box>
  );
};
