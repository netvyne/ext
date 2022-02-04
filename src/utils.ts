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
  try {
    return new URL(url);
  } catch (err) {
    return false;
  }
}

export function createDiv() {
  // action is either clear or take
  return new Promise(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs : any) => {
      chrome.runtime.sendMessage({ screenshot: 'createDiv' }, (response) => {
        if (response.confirmation) {
          chrome.tabs.sendMessage(tabs[0].id, 'toggle');
          // chrome.runtime.getURL('content-crop.js');
          // chrome.scripting.executeScript(
          //   {
          //     target: { tabId: tabs[0].id },
          //     files: ['script.js'],
          //   }, () => {
          //     if (chrome.runtime.lastError) {
          //       console.log(`Script injection failed: ${chrome.runtime.lastError.message}`);
          //     }
          //   }
          // );
          // chrome.scripting.executeScript(tabs[0].id, { file: 'content-crop.js' }, () => {
          //   if (chrome.runtime.lastError) {
          //     console.log(`Script injection failed: ${chrome.runtime.lastError.message}`);
          //   }
          // });
        }
      });
    });
  });
}

export function formatImageURL(source: any) {
  // console.log(url);
  return `${process.env.REACT_APP_IMG_URL}/nosignature/size:300:300/plain${source}`;
}
export function setBadge(data: any) {
  return new Promise(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, () => {
      chrome.runtime.sendMessage({ type: 'setBadge', text: data });
    });
  });
}

export function getThemeColors(theme: string) {
  const themes: any = {
    dark: {
      commentParent: '#424242',
      commentChild: '#616161',
      commentText: '#eeeeee',
      toggleButton: '#ffffff',
      toggleButtonHover: 'rgba(255, 255, 255, 0.08)',
      iconsButtonsColor: '#ffffff',
      iconsButtonsColorHover: '#bdbdbd',
      divBackground: '#424242'
    },
    light: {
      commentParent: '#eceff1',
      commentChild: '#fafafa',
      commentText: '#000000',
      toggleButton: '#eceff1',
      toggleButtonHover: '#fafafa',
      iconsButtonsColor: '#000000',
      iconsButtonsColorHover: '#bdbdbd',
      divBackground: '#eceff1'
    }
  };
  return themes[theme];
}
