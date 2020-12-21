/* global chrome */

export function fetchResource(url, init) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({url, init}, messageResponse => {
      const [response, error] = messageResponse;
      if (response === null) {
        reject(error);
      } else {
        resolve(new Response(new Blob([response.body]), {
          status: response.status,
          statusText: response.statusText,
        }));
      }
    });
  });
}

export function screenShot(action, callback) {
  // action is either clear or take
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({screenshot: action}, messageResponse => {
      const [response, error] = messageResponse;
      if (response === null) {
        reject(error);
      } else {
        callback();
      }
    });
  });
}