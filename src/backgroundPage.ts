// eslint-disable-next-line no-unused-vars
import { browser } from 'webextension-polyfill-ts';

// // Listen for messages sent from other parts of the extension
// browser.runtime.onMessage.addListener((request: { popupMounted: boolean }) => {
//     // Log statement if request.popupMounted is true
//     // NOTE: this request is sent in `popup/component.tsx`
//     if (request.popupMounted) {
//         console.log("backgroundPage notified that Popup.tsx has mounted.");
//     }
// });

// Called when the user clicks on the browser action
// eslint-disable-next-line no-unused-vars
chrome.browserAction.onClicked.addListener((tab) => {
  // Send a message to the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab : any = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      message: 'clicked_browser_action',
    });
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.screenshot === 'take') {
    // use background script to take screenshot, move sidebar out of the way
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab : any = tabs[0];
      chrome.tabs.sendMessage(
        activeTab.id,
        { message: 'clicked_browser_action' },
        () => {
          chrome.tabs.captureVisibleTab({ format: 'png' }, (src) => {
            chrome.storage.local.set({ screenshot: src }, () => {
              console.log('Stored screenshot!');
              chrome.tabs.sendMessage(
                activeTab.id,
                { message: 'clicked_browser_action' },
                () => {
                  sendResponse([]);
                },
              );
            });
          });
        },
      );
    });
  } else if (request.screenshot === 'clear') {
    // clear screenshot from storage
    chrome.storage.local.remove('screenshot', () => {
      sendResponse([]);
    });
  } else if (request.clear_notifications) {
    chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 0, 0] });
    chrome.browserAction.setBadgeText({ text: '' });
  } else {
    // this message is a request, use background script to make request
    fetch(request.url, request.init).then(
      (response) => {
        const resp = response.text();
        return resp.then((text) => {
          sendResponse([
            {
              body: text,
              status: response.status,
              statusText: response.statusText,
            },
            null,
          ]);
        });
      },
      (error) => {
        sendResponse([null, error]);
      },
    );
  }
  return true;
});

// notification polling
async function getNotifications() {
  const url : any = new URL('https://api.netvyne.com/get_notifications');
  const fetched = await fetch(url);
  const res = await fetched.json();
  const notificationCount = res.notifications.filter((x : any) => !x.read).length;
  if (notificationCount > 0) {
    chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
    chrome.browserAction.setBadgeText({ text: notificationCount.toString() });
  }

  // poll every 5 seconds
  setTimeout(getNotifications, 5000);
}

getNotifications();
