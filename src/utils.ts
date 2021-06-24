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
  console.log('action :: ', action, 'callback :: ', callback);
  // action is either clear or take
  return new Promise((resolve, reject) => {
    console.log('Here 1');
    chrome.runtime.sendMessage({ screenshot: action }, (messageResponse) => {
      console.log('Here 2');
      console.log('messageResponse', messageResponse);
      if (!messageResponse) {
        console.log('Last error :: ', chrome.runtime.lastError);
      }
      const [response, error] = messageResponse;
      console.log('response :: ', response, 'error :: ', error);
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
