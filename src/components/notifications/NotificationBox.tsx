import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import { DateTime } from 'luxon';
import React from 'react';
import { useMutation } from 'react-query';
import { Notification } from '../../../types/common/types';

interface Props {
  notification: Notification
}

const NotificationBox = ({ notification } : Props) => {
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
  const notif = (
    <Box
      color="text.primary"
      border={1}
      m={1}
      padding={1}
      onClick={(e) => {
        if (!notification.Viewed) {
          handleClickedNotif(e, notification.ID, false);
        }
      }}
    >
      <Box>
        {DateTime.fromISO(notification.CreatedAt.toString(), {
          zone: 'utc',
        }).toRelative()}
        {notification.Viewed ? <CheckCircleIcon /> : <ErrorIcon />}
      </Box>
      <Box>
        {`${notification.Text}`}
      </Box>
    </Box>
  );

  return <CssBaseline>{notif}</CssBaseline>;
};

export default NotificationBox;
