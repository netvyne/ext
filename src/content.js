/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer }from 'react-frame-component';
import App from "./App";
import WrappedJssComponent from "./wrap"

class Main extends React.Component {
    render() {
        return (
            <Frame> 
               <FrameContextConsumer>
               {
                  ({document, window}) => {
                    document.body.style.margin = '0 0 0 0';
                    return <WrappedJssComponent><App document={document} window={window} isExt={true}/></WrappedJssComponent>
                  }
                }
                </FrameContextConsumer>
            </Frame>
        )
    }
}

const app = document.createElement('div');
app.id = "my-extension-root";

document.body.appendChild(app);

ReactDOM.render(<Main />, app);

app.style.display = "none";


chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
      console.log(request)
      if( request.message === "clicked_browser_action") {
        toggle();
      }
      if (request == "getClickedEl") {
        console.log('clicked share')
      }
      sendResponse([]);
   }
);

function toggle(){
   if(app.style.display === "none"){
    // update sidebarOpen state
    app.style.display = "block";
    chrome.storage.local.set({sidebarOpen: true}, function() {
    	console.log('Sidebar is open');
    });
   }else{
    // update sidebarOpen state
    app.style.display = "none";
    chrome.storage.local.set({sidebarOpen: false}, function() {
    	console.log('Sidebar is closed');
    });
   }
}

// maintain sidebar state across pages (runs every time page is loaded)
chrome.storage.local.get(['sidebarOpen'], function(result) {
  if (result.sidebarOpen) {
    app.style.display = "block";
  } else {
    app.style.display = "none";
  }
});

// share context menu
var clickedEl = null;

document.addEventListener("contextmenu", function(event) {
    clickedEl = event.target;
}, true);