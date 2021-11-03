import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import { DateTime } from 'luxon';
import React from 'react';
import { useMutation } from 'react-query';
import { Notification } from '../../../types/common/types';
import './styles.scss';

interface Props {
  notification: Notification;
  refetch: any;
}

const NotificationBox = ({ notification, refetch } : Props) => {
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
          refetch();
        },
      },
    );
    return res;
  };

  function notificationLink(link : string) {
    const href = `${process.env.PUBLIC_WEB}${link}`;
    window.open(href, '_blank', 'noopener,noreferrer');
    return false;
  }

  const notif = (
    <Box
      color="text.primary"
      border={0}
      m={1}
      padding={1}
      className="notificationBox"
      width="100%"
      onClick={(link) => {
        notificationLink(notification.Link);
      }}
    >
      <Box>
        <Grid item container xs={12} direction="row" spacing={1} alignItems="center" wrap="nowrap">
          <Grid item container alignItems="center">
            <AccessTimeIcon style={{ fill: 'grey', marginRight: '5px' }} fontSize="inherit" />
            {DateTime.fromISO(notification.CreatedAt.toString(), {
              zone: 'utc',
            }).toRelative()}
            {notification.Viewed ? <CheckCircleIcon /> : (
              <ErrorIcon onClick={(e) => {
                if (!notification.Viewed) {
                  handleClickedNotif(e, notification.ID, false);
                }
              }}
              />
            )}
          </Grid>
        </Grid>
      </Box>
      <Box>
        {`${notification.Text}`}
      </Box>
    </Box>
  );

  return <CssBaseline>{notif}</CssBaseline>;
};

export default NotificationBox;
