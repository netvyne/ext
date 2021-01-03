/*global chrome*/
import { Discussion } from "./discussion";
import { Sharing } from "./sharing";
import { Notifications } from "./notifications";
import { Profile } from "./profile";
import "fontsource-roboto";
import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useQuery } from "react-query";

function TabPanel(props) {
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
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "auto",
  },
}));

export default function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const { data, status } = useQuery("/get_user");
  let user;
  if (status == "error") {
    user = <div>Error</div>;
  } else if (status == "loading") {
    user = <div>Loading</div>;
  } else {
    user = data.username;
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div id="netvyne-app" className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Discussion" {...a11yProps(0)} />
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
          <Notifications selected={2 == value} />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <Profile user={user} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
