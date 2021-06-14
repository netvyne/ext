import React, { FunctionComponent } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { browser } from "webextension-polyfill-ts";
import { Sharing } from "@src/components/sharing";
import { Profile } from "@src/components/profile";
import { Discussion } from "@src/components/discussion";
// import { Capture } from "@src/components/capture";
import { Notifications } from "@src/components/notifications";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useQuery } from "react-query";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import {Row, Col, Button, Nav} from 'react-bootstrap';
import { QueryClientProvider } from "react-query";
import { queryClient } from "../query";

import "./styles.scss";

// // // //

function TabPanel(props : any) {
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
    dir: PropTypes.any.isRequired,
  };
  
  function a11yProps(index : any) {
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

export const Popup: FunctionComponent = () => {
    // Sends the `popupMounted` event
    React.useEffect(() => {
        browser.runtime.sendMessage({ popupMounted: true });
    }, []);


    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    // const { data, status } = useQuery<any, string>("/get_user");
    // let user;
    // if (status === "error") {
    // user = <div>Error</div>;
    // } else if (status === "loading") {
    // user = <div>Loading</div>;
    // } else {
    // user = data.username;
    // }
    const handleChange = (event : any, newValue : any) => {
    setValue(newValue);
    };

    const handleChangeIndex = (index : any) => {
    setValue(index);
    };


    // Renders the component tree
    return (
      <QueryClientProvider client={queryClient}>
        <div className="popup-container">
            <div className="container mx-4 my-4">
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

                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Discussion />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  {/* <Hello /> */}
                  <Sharing />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <Notifications />
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                    <Profile />
                </TabPanel>
                {/* <hr />
                <Scroller /> */}
            </div>
        </div>
      </QueryClientProvider>  
    );
};
