import Discussion  from "./discussion";
import Sharing from "./sharing";
import Notifications from "./notifications";
import Profile from "./profile";
import "fontsource-roboto";
import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useQuery } from "react-query";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
type TabPanelProps = {
  index: any,
  value: any
};
const TabPanel: React.SFC<TabPanelProps> = props => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};
function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "auto"
  }
}));
export default function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const { data, status } = useQuery("/get_user");
  let user;
  if (status === "error") {
    user = <div>Error</div>;
  } else if (status === "loading") {
    user = <div>Loading</div>;
  } else {
    user = data.username;
  }
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index: any) => {
    setValue(index);
  };
  return (
    <div id="netvyne-app" className={classes.root}>
      <AppBar position="static" color="default" elevation={1}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab icon={<ChatBubbleOutlineIcon />} {...a11yProps(0)} />
          <Tab label="Sharing" {...a11yProps(1)} />
          <Tab label="Notifs" {...a11yProps(2)} />
          <Tab label="Profile" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Discussion />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Sharing />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Notifications selected={2 === value} />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <Profile user={user} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}