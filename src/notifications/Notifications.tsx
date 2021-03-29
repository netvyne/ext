import React from "react";
import { useQuery } from "react-query";
import Box from "@material-ui/core/Box";
import { fetchResource } from "../utils";
import NotificationBox from "./NotificationBox";
import { clearNotificationBadge } from "../utils";
const clearNotifications = async () => {
  var url = new URL(`${process.env.PUBLIC_API}/mark_all_read`);
  var init = {
    method: "POST",
    mode: "cors",
    credentials: "include",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
    referrerPolicy: "no-referrer",
    body: JSON.stringify({})
  };
  const res = await fetchResource(url, init);
  clearNotificationBadge();
  return res.json();
};
const Notifications = props => {
  function getNotifications() {
    return async () => {
      var url = new URL(`${process.env.PUBLIC_API}/get_notifications`);
      const res = await (await fetchResource(url)).json();
      let notification_count = res.notifications.filter(x => !x.read).length;
      console.log(notification_count, "notification_count");
      if (props.selected) {
        clearNotifications();
      }
      return res;
    };
  }
  const { data, status } = useQuery(`notifications`, getNotifications(), {
    refetchInterval: 10000,
    refetchIntervalInBackground: true
  });
  let notifications;
  if (status === "error") {
    notifications = <div>Error</div>;
  } else if (status === "loading") {
    notifications = <div>Loading</div>;
  } else {
    notifications = data.notifications.map(notification => (
      <NotificationBox notification={notification} />
    ));
  }
  return <Box m={1}>{notifications}</Box>;
};
export default Notifications;
