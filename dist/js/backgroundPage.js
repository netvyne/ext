/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/backgroundPage.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/backgroundPage.ts":
/*!*******************************!*\
  !*** ./src/backgroundPage.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
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
chrome.browserAction.onClicked.addListener(function (tab) {
    // Send a message to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {
            message: 'clicked_browser_action',
        });
    });
});
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   console.log('here line 26 page');
//   if (request.screenshot === 'take') {
//     // use background script to take screenshot, move sidebar out of the way
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       const activeTab : any = tabs[0];
//       chrome.tabs.sendMessage(
//         activeTab.id,
//         { message: 'clicked_browser_action' },
//         () => {
//           chrome.tabs.captureVisibleTab({ format: 'png' }, (src) => {
//             chrome.storage.local.set({ screenshot: src }, () => {
//               console.log('Stored screenshot!');
//               chrome.tabs.sendMessage(
//                 activeTab.id,
//                 { message: 'clicked_browser_action' },
//                 () => {
//                   sendResponse([]);
//                 },
//               );
//             });
//           });
//         },
//       );
//     });
//   } else if (request.screenshot === 'clear') {
//     // clear screenshot from storage
//     chrome.storage.local.remove('screenshot', () => {
//       sendResponse([]);
//     });
//   } else if (request.screenshot === 'createDiv') {
//     // eslint-disable-next-line no-alert
//     console.log('Line 55 here ------');
//     sendResponse({ confirmation: 'Successfully created div' });
//   } else if (request.clear_notifications) {
//     chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 0, 0] });
//     chrome.browserAction.setBadgeText({ text: '' });
//   } else {
//     // this message is a request, use background script to make request
//     fetch(request.url, request.init).then(
//       (response) => {
//         const resp = response.text();
//         return resp.then((text) => {
//           sendResponse([
//             {
//               body: text,
//               status: response.status,
//               statusText: response.statusText,
//             },
//             null,
//           ]);
//         });
//       },
//       (error) => {
//         sendResponse([null, error]);
//       },
//     );
//   }
//   return true;
// });
// notification polling
function getNotifications() {
    return __awaiter(this, void 0, void 0, function () {
        var url, fetched, res, notificationCount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = new URL('https://api.netvyne.com/get_notifications');
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    fetched = _a.sent();
                    return [4 /*yield*/, fetched.json()];
                case 2:
                    res = _a.sent();
                    notificationCount = res.notifications.filter(function (x) { return !x.read; }).length;
                    if (notificationCount > 0) {
                        chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
                        chrome.browserAction.setBadgeText({ text: notificationCount.toString() });
                    }
                    // poll every 5 seconds
                    setTimeout(getNotifications, 5000);
                    return [2 /*return*/];
            }
        });
    });
}
getNotifications();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmRQYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9FQSxnRUFBZ0U7QUFDaEUsa0ZBQWtGO0FBQ2xGLHVEQUF1RDtBQUN2RCw2REFBNkQ7QUFDN0Qsa0NBQWtDO0FBQ2xDLDhFQUE4RTtBQUM5RSxRQUFRO0FBQ1IsTUFBTTtBQUVOLG9EQUFvRDtBQUNwRCwwQ0FBMEM7QUFDMUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFVBQUMsR0FBRztJQUM3QyxtQ0FBbUM7SUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsRUFBRSxVQUFDLElBQUk7UUFDNUQsSUFBTSxTQUFTLEdBQVMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsT0FBTyxFQUFFLHdCQUF3QjtTQUNsQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsNEVBQTRFO0FBQzVFLHNDQUFzQztBQUN0Qyx5Q0FBeUM7QUFDekMsK0VBQStFO0FBQy9FLDJFQUEyRTtBQUMzRSx5Q0FBeUM7QUFDekMsaUNBQWlDO0FBQ2pDLHdCQUF3QjtBQUN4QixpREFBaUQ7QUFDakQsa0JBQWtCO0FBQ2xCLHdFQUF3RTtBQUN4RSxvRUFBb0U7QUFDcEUsbURBQW1EO0FBQ25ELHlDQUF5QztBQUN6QyxnQ0FBZ0M7QUFDaEMseURBQXlEO0FBQ3pELDBCQUEwQjtBQUMxQixzQ0FBc0M7QUFDdEMscUJBQXFCO0FBQ3JCLG1CQUFtQjtBQUNuQixrQkFBa0I7QUFDbEIsZ0JBQWdCO0FBQ2hCLGFBQWE7QUFDYixXQUFXO0FBQ1gsVUFBVTtBQUNWLGlEQUFpRDtBQUNqRCx1Q0FBdUM7QUFDdkMsd0RBQXdEO0FBQ3hELDBCQUEwQjtBQUMxQixVQUFVO0FBQ1YscURBQXFEO0FBQ3JELDJDQUEyQztBQUMzQywwQ0FBMEM7QUFDMUMsa0VBQWtFO0FBQ2xFLDhDQUE4QztBQUM5Qyw2RUFBNkU7QUFDN0UsdURBQXVEO0FBQ3ZELGFBQWE7QUFDYiwwRUFBMEU7QUFDMUUsNkNBQTZDO0FBQzdDLHdCQUF3QjtBQUN4Qix3Q0FBd0M7QUFDeEMsdUNBQXVDO0FBQ3ZDLDJCQUEyQjtBQUMzQixnQkFBZ0I7QUFDaEIsNEJBQTRCO0FBQzVCLHlDQUF5QztBQUN6QyxpREFBaUQ7QUFDakQsaUJBQWlCO0FBQ2pCLG9CQUFvQjtBQUNwQixnQkFBZ0I7QUFDaEIsY0FBYztBQUNkLFdBQVc7QUFDWCxxQkFBcUI7QUFDckIsdUNBQXVDO0FBQ3ZDLFdBQVc7QUFDWCxTQUFTO0FBQ1QsTUFBTTtBQUNOLGlCQUFpQjtBQUNqQixNQUFNO0FBRU4sdUJBQXVCO0FBQ3ZCLFNBQWUsZ0JBQWdCOzs7Ozs7b0JBQ3ZCLEdBQUcsR0FBUyxJQUFJLEdBQUcsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO29CQUN2RCxxQkFBTSxLQUFLLENBQUMsR0FBRyxDQUFDOztvQkFBMUIsT0FBTyxHQUFHLFNBQWdCO29CQUNwQixxQkFBTSxPQUFPLENBQUMsSUFBSSxFQUFFOztvQkFBMUIsR0FBRyxHQUFHLFNBQW9CO29CQUMxQixpQkFBaUIsR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQU8sSUFBSyxRQUFDLENBQUMsQ0FBQyxJQUFJLEVBQVAsQ0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDO29CQUNoRixJQUFJLGlCQUFpQixHQUFHLENBQUMsRUFBRTt3QkFDekIsTUFBTSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDMUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO3FCQUMzRTtvQkFFRCx1QkFBdUI7b0JBQ3ZCLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQzs7Ozs7Q0FDcEM7QUFDRCxnQkFBZ0IsRUFBRSxDQUFDIiwiZmlsZSI6ImJhY2tncm91bmRQYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYmFja2dyb3VuZFBhZ2UudHNcIik7XG4iLCIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbmltcG9ydCB7IGJyb3dzZXIgfSBmcm9tICd3ZWJleHRlbnNpb24tcG9seWZpbGwtdHMnO1xuXG4vLyAvLyBMaXN0ZW4gZm9yIG1lc3NhZ2VzIHNlbnQgZnJvbSBvdGhlciBwYXJ0cyBvZiB0aGUgZXh0ZW5zaW9uXG4vLyBicm93c2VyLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChyZXF1ZXN0OiB7IHBvcHVwTW91bnRlZDogYm9vbGVhbiB9KSA9PiB7XG4vLyAgICAgLy8gTG9nIHN0YXRlbWVudCBpZiByZXF1ZXN0LnBvcHVwTW91bnRlZCBpcyB0cnVlXG4vLyAgICAgLy8gTk9URTogdGhpcyByZXF1ZXN0IGlzIHNlbnQgaW4gYHBvcHVwL2NvbXBvbmVudC50c3hgXG4vLyAgICAgaWYgKHJlcXVlc3QucG9wdXBNb3VudGVkKSB7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwiYmFja2dyb3VuZFBhZ2Ugbm90aWZpZWQgdGhhdCBQb3B1cC50c3ggaGFzIG1vdW50ZWQuXCIpO1xuLy8gICAgIH1cbi8vIH0pO1xuXG4vLyBDYWxsZWQgd2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIGJyb3dzZXIgYWN0aW9uXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbmNocm9tZS5icm93c2VyQWN0aW9uLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcigodGFiKSA9PiB7XG4gIC8vIFNlbmQgYSBtZXNzYWdlIHRvIHRoZSBhY3RpdmUgdGFiXG4gIGNocm9tZS50YWJzLnF1ZXJ5KHsgYWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlIH0sICh0YWJzKSA9PiB7XG4gICAgY29uc3QgYWN0aXZlVGFiIDogYW55ID0gdGFic1swXTtcbiAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShhY3RpdmVUYWIuaWQsIHtcbiAgICAgIG1lc3NhZ2U6ICdjbGlja2VkX2Jyb3dzZXJfYWN0aW9uJyxcbiAgICB9KTtcbiAgfSk7XG59KTtcblxuLy8gY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xuLy8gICBjb25zb2xlLmxvZygnaGVyZSBsaW5lIDI2IHBhZ2UnKTtcbi8vICAgaWYgKHJlcXVlc3Quc2NyZWVuc2hvdCA9PT0gJ3Rha2UnKSB7XG4vLyAgICAgLy8gdXNlIGJhY2tncm91bmQgc2NyaXB0IHRvIHRha2Ugc2NyZWVuc2hvdCwgbW92ZSBzaWRlYmFyIG91dCBvZiB0aGUgd2F5XG4vLyAgICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgKHRhYnMpID0+IHtcbi8vICAgICAgIGNvbnN0IGFjdGl2ZVRhYiA6IGFueSA9IHRhYnNbMF07XG4vLyAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShcbi8vICAgICAgICAgYWN0aXZlVGFiLmlkLFxuLy8gICAgICAgICB7IG1lc3NhZ2U6ICdjbGlja2VkX2Jyb3dzZXJfYWN0aW9uJyB9LFxuLy8gICAgICAgICAoKSA9PiB7XG4vLyAgICAgICAgICAgY2hyb21lLnRhYnMuY2FwdHVyZVZpc2libGVUYWIoeyBmb3JtYXQ6ICdwbmcnIH0sIChzcmMpID0+IHtcbi8vICAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IHNjcmVlbnNob3Q6IHNyYyB9LCAoKSA9PiB7XG4vLyAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTdG9yZWQgc2NyZWVuc2hvdCEnKTtcbi8vICAgICAgICAgICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoXG4vLyAgICAgICAgICAgICAgICAgYWN0aXZlVGFiLmlkLFxuLy8gICAgICAgICAgICAgICAgIHsgbWVzc2FnZTogJ2NsaWNrZWRfYnJvd3Nlcl9hY3Rpb24nIH0sXG4vLyAgICAgICAgICAgICAgICAgKCkgPT4ge1xuLy8gICAgICAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKFtdKTtcbi8vICAgICAgICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICAgICApO1xuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH0sXG4vLyAgICAgICApO1xuLy8gICAgIH0pO1xuLy8gICB9IGVsc2UgaWYgKHJlcXVlc3Quc2NyZWVuc2hvdCA9PT0gJ2NsZWFyJykge1xuLy8gICAgIC8vIGNsZWFyIHNjcmVlbnNob3QgZnJvbSBzdG9yYWdlXG4vLyAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwucmVtb3ZlKCdzY3JlZW5zaG90JywgKCkgPT4ge1xuLy8gICAgICAgc2VuZFJlc3BvbnNlKFtdKTtcbi8vICAgICB9KTtcbi8vICAgfSBlbHNlIGlmIChyZXF1ZXN0LnNjcmVlbnNob3QgPT09ICdjcmVhdGVEaXYnKSB7XG4vLyAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWFsZXJ0XG4vLyAgICAgY29uc29sZS5sb2coJ0xpbmUgNTUgaGVyZSAtLS0tLS0nKTtcbi8vICAgICBzZW5kUmVzcG9uc2UoeyBjb25maXJtYXRpb246ICdTdWNjZXNzZnVsbHkgY3JlYXRlZCBkaXYnIH0pO1xuLy8gICB9IGVsc2UgaWYgKHJlcXVlc3QuY2xlYXJfbm90aWZpY2F0aW9ucykge1xuLy8gICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlQmFja2dyb3VuZENvbG9yKHsgY29sb3I6IFswLCAwLCAwLCAwXSB9KTtcbi8vICAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRCYWRnZVRleHQoeyB0ZXh0OiAnJyB9KTtcbi8vICAgfSBlbHNlIHtcbi8vICAgICAvLyB0aGlzIG1lc3NhZ2UgaXMgYSByZXF1ZXN0LCB1c2UgYmFja2dyb3VuZCBzY3JpcHQgdG8gbWFrZSByZXF1ZXN0XG4vLyAgICAgZmV0Y2gocmVxdWVzdC51cmwsIHJlcXVlc3QuaW5pdCkudGhlbihcbi8vICAgICAgIChyZXNwb25zZSkgPT4ge1xuLy8gICAgICAgICBjb25zdCByZXNwID0gcmVzcG9uc2UudGV4dCgpO1xuLy8gICAgICAgICByZXR1cm4gcmVzcC50aGVuKCh0ZXh0KSA9PiB7XG4vLyAgICAgICAgICAgc2VuZFJlc3BvbnNlKFtcbi8vICAgICAgICAgICAgIHtcbi8vICAgICAgICAgICAgICAgYm9keTogdGV4dCxcbi8vICAgICAgICAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4vLyAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6IHJlc3BvbnNlLnN0YXR1c1RleHQsXG4vLyAgICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICAgbnVsbCxcbi8vICAgICAgICAgICBdKTtcbi8vICAgICAgICAgfSk7XG4vLyAgICAgICB9LFxuLy8gICAgICAgKGVycm9yKSA9PiB7XG4vLyAgICAgICAgIHNlbmRSZXNwb25zZShbbnVsbCwgZXJyb3JdKTtcbi8vICAgICAgIH0sXG4vLyAgICAgKTtcbi8vICAgfVxuLy8gICByZXR1cm4gdHJ1ZTtcbi8vIH0pO1xuXG4vLyBub3RpZmljYXRpb24gcG9sbGluZ1xuYXN5bmMgZnVuY3Rpb24gZ2V0Tm90aWZpY2F0aW9ucygpIHtcbiAgY29uc3QgdXJsIDogYW55ID0gbmV3IFVSTCgnaHR0cHM6Ly9hcGkubmV0dnluZS5jb20vZ2V0X25vdGlmaWNhdGlvbnMnKTtcbiAgY29uc3QgZmV0Y2hlZCA9IGF3YWl0IGZldGNoKHVybCk7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoZWQuanNvbigpO1xuICBjb25zdCBub3RpZmljYXRpb25Db3VudCA9IHJlcy5ub3RpZmljYXRpb25zLmZpbHRlcigoeCA6IGFueSkgPT4gIXgucmVhZCkubGVuZ3RoO1xuICBpZiAobm90aWZpY2F0aW9uQ291bnQgPiAwKSB7XG4gICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VCYWNrZ3JvdW5kQ29sb3IoeyBjb2xvcjogWzI1NSwgMCwgMCwgMjU1XSB9KTtcbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRCYWRnZVRleHQoeyB0ZXh0OiBub3RpZmljYXRpb25Db3VudC50b1N0cmluZygpIH0pO1xuICB9XG5cbiAgLy8gcG9sbCBldmVyeSA1IHNlY29uZHNcbiAgc2V0VGltZW91dChnZXROb3RpZmljYXRpb25zLCA1MDAwKTtcbn1cbmdldE5vdGlmaWNhdGlvbnMoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=