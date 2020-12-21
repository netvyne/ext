// Called when the user clicks on the browser action
chrome.browserAction.onClicked.addListener(function(tab) {
   // Send a message to the active tab
   chrome.tabs.query({active: true, currentWindow:true},function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
   });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.screenshot == 'take') {
    // use background script to take screenshot, move sidebar out of the way
    chrome.tabs.query({active: true, currentWindow:true}, (tabs) => {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"}, () => {
        chrome.tabs.captureVisibleTab({format:"png"}, src => {
          chrome.storage.local.set({"screenshot": src}, () => {
            console.log('Stored screenshot!')
            chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"}, () => {
              sendResponse([])
            });
          });
        });
      });      
    });
  } else if (request.screenshot == 'clear') {
    // clear screenshot from storage
    chrome.storage.local.remove("screenshot", () => {
      sendResponse([])
    });
  } else {
    // this message is a request, use background script to make request
    fetch(request.url, request.init).then(function(response) {
      resp = response.text()
      return resp.then(function(text) {
        sendResponse([{
          body: text,
          status: response.status,
          statusText: response.statusText,
        }, null]);
      });
    }, function(error) {
      sendResponse([null, error]);
    });
  }
   return true;
 });

 // sharing context menu
 var id = chrome.contextMenus.create({
  "title": "Share...",
  "contexts": ["all"],
  "onclick": mycallback
});

function mycallback(info, tab) {
  chrome.tabs.sendMessage(tab.id, "getClickedEl", function(response) {});
}