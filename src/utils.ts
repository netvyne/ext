export function fetchResource(url : any, init : any) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ url, init }, (messageResponse) => {
      const [response, error] = messageResponse;
      if (response === null) {
        reject(error);
      } else {
        resolve(
          new Response(new Blob([response.body]), {
            status: response.status,
            statusText: response.statusText,
          }),
        );
      }
    });
  });
}

export function screenShot(action : any, callback : any) {
  // action is either clear or take
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ screenshot: action }, (messageResponse) => {
      if (!messageResponse) {
        console.log('Last error :: ', chrome.runtime.lastError);
      }
      const [response, error] = messageResponse;
      if (response === null) {
        reject(error);
      } else {
        callback();
      }
    });
  });
}

export function clearNotificationBadge() {
  // send notification count to background script
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { clear_notifications: true },
      (messageResponse) => {
        const [response, error] = messageResponse;
        if (response === null) {
          reject(error);
        } else {
          // callback();
        }
      },
    );
  });
}

export function isValidURL(url : any) {
  console.log(url);
  try {
    return new URL(url);
  } catch (err) {
    return false;
  }
}

export function createDiv(action : any) {
  // action is either clear or take
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs : any) => {
      chrome.runtime.sendMessage({ screenshot: 'createDiv' }, (response) => {
        if (response.confirmation) {
          chrome.tabs.sendMessage(tabs[0].id, 'toggle');
          chrome.tabs.executeScript(tabs[0].id, { file: 'content-crop.js' }, (res: any) => {
            if (chrome.runtime.lastError) {
              console.log(`Script injection failed: ${chrome.runtime.lastError.message}`);
            }
          });
        }
      });
    });
  });
}
