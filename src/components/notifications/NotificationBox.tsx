import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { DateTime } from 'luxon';
import React from 'react';
import { useMutation } from 'react-query';
import { Notification } from '../../../types/common/types';
import './styles.scss';

interface Props {
  notification: Notification;
  refetch: any;
  themeColors: any;
}

const NotificationBox = ({ notification, refetch, themeColors } : Props) => {
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
      color={themeColors.commentText}
      border={0}
      m={1}
      padding={1}
      className="notificationBox"
      bgcolor={themeColors.divBackground}
      width="100%"
      onClick={() => {
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
