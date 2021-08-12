chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, 'toggle');
});

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.message === 'cropped') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, 'toggle');
        chrome.runtime.sendMessage(chrome.runtime.id, { target: 'app', type: 'screenshotcropped' });
      });
      sendResponse({ message: 'goodbye cropped' });
    }
  },
);

chrome.browserAction.onClicked.addListener((tab) => {
  // Send a message to the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      message: 'clicked_browser_action',
    });
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.screenshot === 'take') {
    // use background script to take screenshot, move sidebar out of the way
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, 'toggle');
      chrome.tabs.sendMessage(
        activeTab.id,
        { message: 'clicked_browser_action' },
        () => {
          chrome.tabs.captureVisibleTab({ format: 'png' }, (src) => {
            chrome.storage.local.set({ screenshot: src }, () => {
              console.log('Stored screenshot!');
              chrome.tabs.sendMessage(activeTab.id, 'toggle');
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
  } else if (request.screenshot === 'createDiv') {
    // eslint-disable-next-line no-alert
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, 'toggle');
      chrome.tabs.sendMessage(
        activeTab.id,
        { message: 'clicked_browser_action' },
        () => {
          chrome.tabs.captureVisibleTab({ format: 'png' }, (src) => {
            chrome.storage.local.set({ screenshot: src }, () => {
              console.log('Stored screenshot!');
              chrome.tabs.sendMessage(activeTab.id, 'toggle');
              sendResponse({ confirmation: 'Successfully created div' });
            });
          });
        },
      );
    });
    // sendResponse({ confirmation: 'Successfully created div' });
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
