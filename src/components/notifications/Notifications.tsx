import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React from 'react';
import { useMutation, useQuery } from 'react-query';
import NotificationBox from './NotificationBox';

interface Props {
  refetch: any;
  mode: string;
  setMode: any;
  themeColors: any;
}
interface GetUserNotifsQuery {
  Notifications: Notification[];
  ContainsUnread: boolean;
}
const Notifications = ({
  refetch, mode, setMode, themeColors
} : Props) => {
// export const Notifications : FunctionComponent = ({ refetch }: Props) => {
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
          refetch();
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
      <NotificationBox notification={notification} refetch={refetch} themeColors={themeColors} />
    ));
  }

  function changeMode(extMode: string) {
    chrome.storage.local.set({ mode: extMode });
    setMode(extMode);
  }

  function moreOptionClick(action : string, link : string) {
    let href = link;
    if (action !== 'feedback') {
      href = `${process.env.PUBLIC_WEB}/${link}`;
    }
    window.open(href, '_blank', 'noopener,noreferrer');
    return false;
  }
  return (
    <Box m={2}>
      <Box sx={{
        display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center'
      }}
      >
        <Box sx={{
          backgroundColor: 'gray',
          height: '40px',
          width: '200px',
          borderRadius: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '10px',
          cursor: 'pointer'
        }}
        >
          {mode === 'light' && (
          <Box onClick={() => { changeMode('dark'); console.log('clicked light'); }}>
            Toggle Dark Mode
            {/* <LightModeIcon /> */}
            <DarkModeIcon sx={{ '&:hover': { color: 'white' } }} />
          </Box>
          )}
          {mode === 'dark' && (
          <Box onClick={() => { changeMode('light'); console.log('clicked light'); }}>
            Toggle Light Mode
            {/* <LightModeIcon /> */}
            <LightModeIcon sx={{ '&:hover': { color: 'yellow' } }} />
          </Box>
          )}
        </Box>
      </Box>

      {allNotifications.length > 0 && (
      <Box width="100%" justifyContent="center" display="flex" flexDirection="column" alignItems="center" mt={1}>
        <Button
          type="button"
          variant="outlined"
          color="primary"
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
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
      >
        <Button onClick={() => moreOptionClick('feedback', 'https://forms.gle/LUzvrWqhtWnKwAxX6')}>Feedback</Button>
        <Button onClick={() => moreOptionClick('logout', 'profile')}>Profile</Button>
      </Box>
    </Box>
  );
};
export default Notifications;
