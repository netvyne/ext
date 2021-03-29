/*global chrome*/
/* src/content.js */
import * as React from "react";
import * as ReactDOM from "react-dom";
import Frame, { FrameContextConsumer } from "react-frame-component";
import App from "./App";
import WrappedJssComponent from "./wrap";
import { QueryClient, QueryClientProvider } from "react-query";
import { fetchResource } from "./utils";
const defaultQueryFn = async ({ queryKey }) => {
  var url = new URL(`${process.env.PUBLIC_API}${queryKey[0]}`);
  const res = await fetchResource(url);
  return res.json();
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn
    }
  }
});
class Main extends React.Component<{}, {}> {
  render() {
    return (
      <Frame>
        <FrameContextConsumer>
          {({ document, window }) => {
            document.body.style.margin = "0 0 0 0";
            return (
              <WrappedJssComponent>
                <QueryClientProvider client={queryClient}>
                  <App document={document} window={window}/>
                </QueryClientProvider>
              </WrappedJssComponent>
            );
          }}
        </FrameContextConsumer>
      </Frame>
    );
  }
}
const app = document.createElement("div");
app.id = "my-extension-root";
document.body.appendChild(app);
ReactDOM.render(<Main />, app);
app.style.display = "none";
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request);
  if (request.message === "clicked_browser_action") {
    toggle();
  }
  sendResponse([]);
});
function toggle() {
  if (app.style.display === "none") {
    // update sidebarOpen state
    app.style.display = "block";
    chrome.storage.local.set({ sidebarOpen: true }, function() {
      console.log("Sidebar is open");
    });
  } else {
    // update sidebarOpen state
    app.style.display = "none";
    chrome.storage.local.set({ sidebarOpen: false }, function() {
      console.log("Sidebar is closed");
    });
  }
}
// maintain sidebar state across pages (runs every time page is loaded)
chrome.storage.local.get(["sidebarOpen"], function(result) {
  if (result.sidebarOpen) {
    app.style.display = "block";
  } else {
    app.style.display = "none";
  }
});
