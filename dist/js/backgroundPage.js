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
/*global chrome*/
// Called when the user clicks on the browser action
chrome.browserAction.onClicked.addListener(function (tab) {
    // Send a message to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {
            message: "clicked_browser_action",
        });
    });
});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.screenshot == "take") {
        // use background script to take screenshot, move sidebar out of the way
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { message: "clicked_browser_action" }, function () {
                chrome.tabs.captureVisibleTab({ format: "png" }, function (src) {
                    chrome.storage.local.set({ screenshot: src }, function () {
                        console.log("Stored screenshot!");
                        chrome.tabs.sendMessage(activeTab.id, { message: "clicked_browser_action" }, function () {
                            sendResponse([]);
                        });
                    });
                });
            });
        });
    }
    else if (request.screenshot == "clear") {
        // clear screenshot from storage
        chrome.storage.local.remove("screenshot", function () {
            sendResponse([]);
        });
    }
    else if (request.clear_notifications) {
        chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 0, 0] });
        chrome.browserAction.setBadgeText({ text: "" });
    }
    else {
        // this message is a request, use background script to make request
        fetch(request.url, request.init).then(function (response) {
            var resp = response.text();
            return resp.then(function (text) {
                sendResponse([
                    {
                        body: text,
                        status: response.status,
                        statusText: response.statusText,
                    },
                    null,
                ]);
            });
        }, function (error) {
            sendResponse([null, error]);
        });
    }
    return true;
});
// notification polling
function getNotifications() {
    return __awaiter(this, void 0, void 0, function () {
        var url, fetched, res, notification_count;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = new URL("https://api.netvyne.com/get_notifications");
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    fetched = _a.sent();
                    return [4 /*yield*/, fetched.json()];
                case 2:
                    res = _a.sent();
                    notification_count = res.notifications.filter(function (x) { return !x.read; }).length;
                    if (notification_count > 0) {
                        chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
                        chrome.browserAction.setBadgeText({ text: notification_count.toString() });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmRQYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hGQSxnRUFBZ0U7QUFDaEUsa0ZBQWtGO0FBQ2xGLHVEQUF1RDtBQUN2RCw2REFBNkQ7QUFDN0Qsa0NBQWtDO0FBQ2xDLDhFQUE4RTtBQUM5RSxRQUFRO0FBQ1IsTUFBTTtBQUlOLGlCQUFpQjtBQUVqQixvREFBb0Q7QUFDcEQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFVBQVUsR0FBRztJQUNwRCxtQ0FBbUM7SUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLGFB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Q0FBQyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUNGLENBQUM7S0FDSDtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyxDQUFDLENBQUM7QUFFSCx1QkFBdUI7QUFDdkIsU0FBZSxnQkFBZ0I7Ozs7OztvQkFDekIsR0FBRyxHQUFTLElBQUksR0FBRyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7b0JBQ3JELHFCQUFNLEtBQUssQ0FBQyxHQUFHLENBQUM7O29CQUExQixPQUFPLEdBQUcsU0FBZ0I7b0JBQ3BCLHFCQUFNLE9BQU8sQ0FBQyxJQUFJLEVBQUU7O29CQUExQixHQUFHLEdBQUcsU0FBb0I7b0JBQzVCLGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBTyxJQUFLLFFBQUMsQ0FBQyxDQUFDLElBQUksRUFBUCxDQUFPLENBQUMsQ0FBQyxNQUFNLENBQUM7b0JBQy9FLElBQUksa0JBQWtCLEdBQUcsQ0FBQyxFQUFFO3dCQUMxQixNQUFNLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUMxRSxNQUFNLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7cUJBQzVFO29CQUVELHVCQUF1QjtvQkFDdkIsVUFBVSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDOzs7OztDQUNwQztBQUVELGdCQUFnQixFQUFFLENBQUMiLCJmaWxlIjoiYmFja2dyb3VuZFBhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9iYWNrZ3JvdW5kUGFnZS50c1wiKTtcbiIsImltcG9ydCB7IGJyb3dzZXIgfSBmcm9tIFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsLXRzXCI7XG5cbi8vIC8vIExpc3RlbiBmb3IgbWVzc2FnZXMgc2VudCBmcm9tIG90aGVyIHBhcnRzIG9mIHRoZSBleHRlbnNpb25cbi8vIGJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKHJlcXVlc3Q6IHsgcG9wdXBNb3VudGVkOiBib29sZWFuIH0pID0+IHtcbi8vICAgICAvLyBMb2cgc3RhdGVtZW50IGlmIHJlcXVlc3QucG9wdXBNb3VudGVkIGlzIHRydWVcbi8vICAgICAvLyBOT1RFOiB0aGlzIHJlcXVlc3QgaXMgc2VudCBpbiBgcG9wdXAvY29tcG9uZW50LnRzeGBcbi8vICAgICBpZiAocmVxdWVzdC5wb3B1cE1vdW50ZWQpIHtcbi8vICAgICAgICAgY29uc29sZS5sb2coXCJiYWNrZ3JvdW5kUGFnZSBub3RpZmllZCB0aGF0IFBvcHVwLnRzeCBoYXMgbW91bnRlZC5cIik7XG4vLyAgICAgfVxuLy8gfSk7XG5cblxuXG4vKmdsb2JhbCBjaHJvbWUqL1xuXG4vLyBDYWxsZWQgd2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIGJyb3dzZXIgYWN0aW9uXG5jaHJvbWUuYnJvd3NlckFjdGlvbi5vbkNsaWNrZWQuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKHRhYikge1xuICAgIC8vIFNlbmQgYSBtZXNzYWdlIHRvIHRoZSBhY3RpdmUgdGFiXG4gICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgZnVuY3Rpb24gKHRhYnMpIHtcbiAgICAgIHZhciBhY3RpdmVUYWIgOiBhbnkgPSB0YWJzWzBdO1xuICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoYWN0aXZlVGFiLmlkLCB7XG4gICAgICAgIG1lc3NhZ2U6IFwiY2xpY2tlZF9icm93c2VyX2FjdGlvblwiLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICBcbiAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xuICAgIGlmIChyZXF1ZXN0LnNjcmVlbnNob3QgPT0gXCJ0YWtlXCIpIHtcbiAgICAgIC8vIHVzZSBiYWNrZ3JvdW5kIHNjcmlwdCB0byB0YWtlIHNjcmVlbnNob3QsIG1vdmUgc2lkZWJhciBvdXQgb2YgdGhlIHdheVxuICAgICAgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSwgKHRhYnMpID0+IHtcbiAgICAgICAgdmFyIGFjdGl2ZVRhYiA6IGFueSA9IHRhYnNbMF07XG4gICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKFxuICAgICAgICAgIGFjdGl2ZVRhYi5pZCxcbiAgICAgICAgICB7IG1lc3NhZ2U6IFwiY2xpY2tlZF9icm93c2VyX2FjdGlvblwiIH0sXG4gICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgY2hyb21lLnRhYnMuY2FwdHVyZVZpc2libGVUYWIoeyBmb3JtYXQ6IFwicG5nXCIgfSwgKHNyYykgPT4ge1xuICAgICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyBzY3JlZW5zaG90OiBzcmMgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3RvcmVkIHNjcmVlbnNob3QhXCIpO1xuICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKFxuICAgICAgICAgICAgICAgICAgYWN0aXZlVGFiLmlkLFxuICAgICAgICAgICAgICAgICAgeyBtZXNzYWdlOiBcImNsaWNrZWRfYnJvd3Nlcl9hY3Rpb25cIiB9LFxuICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZW5kUmVzcG9uc2UoW10pO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChyZXF1ZXN0LnNjcmVlbnNob3QgPT0gXCJjbGVhclwiKSB7XG4gICAgICAvLyBjbGVhciBzY3JlZW5zaG90IGZyb20gc3RvcmFnZVxuICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwucmVtb3ZlKFwic2NyZWVuc2hvdFwiLCAoKSA9PiB7XG4gICAgICAgIHNlbmRSZXNwb25zZShbXSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHJlcXVlc3QuY2xlYXJfbm90aWZpY2F0aW9ucykge1xuICAgICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VCYWNrZ3JvdW5kQ29sb3IoeyBjb2xvcjogWzAsIDAsIDAsIDBdIH0pO1xuICAgICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VUZXh0KHsgdGV4dCA6IFwiXCIgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRoaXMgbWVzc2FnZSBpcyBhIHJlcXVlc3QsIHVzZSBiYWNrZ3JvdW5kIHNjcmlwdCB0byBtYWtlIHJlcXVlc3RcbiAgICAgIGZldGNoKHJlcXVlc3QudXJsLCByZXF1ZXN0LmluaXQpLnRoZW4oXG4gICAgICAgIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgIGxldCByZXNwID0gcmVzcG9uc2UudGV4dCgpO1xuICAgICAgICAgIHJldHVybiByZXNwLnRoZW4oZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgICAgIHNlbmRSZXNwb25zZShbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBib2R5OiB0ZXh0LFxuICAgICAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6IHJlc3BvbnNlLnN0YXR1c1RleHQsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgc2VuZFJlc3BvbnNlKFtudWxsLCBlcnJvcl0pO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSk7XG4gIFxuICAvLyBub3RpZmljYXRpb24gcG9sbGluZ1xuICBhc3luYyBmdW5jdGlvbiBnZXROb3RpZmljYXRpb25zKCkge1xuICAgIHZhciB1cmwgOiBhbnkgPSBuZXcgVVJMKGBodHRwczovL2FwaS5uZXR2eW5lLmNvbS9nZXRfbm90aWZpY2F0aW9uc2ApO1xuICAgIGNvbnN0IGZldGNoZWQgPSBhd2FpdCBmZXRjaCh1cmwpO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoZWQuanNvbigpO1xuICAgIGxldCBub3RpZmljYXRpb25fY291bnQgPSByZXMubm90aWZpY2F0aW9ucy5maWx0ZXIoKHggOiBhbnkpID0+ICF4LnJlYWQpLmxlbmd0aDtcbiAgICBpZiAobm90aWZpY2F0aW9uX2NvdW50ID4gMCkge1xuICAgICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0QmFkZ2VCYWNrZ3JvdW5kQ29sb3IoeyBjb2xvcjogWzI1NSwgMCwgMCwgMjU1XSB9KTtcbiAgICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlVGV4dCh7IHRleHQ6IG5vdGlmaWNhdGlvbl9jb3VudC50b1N0cmluZygpIH0pO1xuICAgIH1cbiAgXG4gICAgLy8gcG9sbCBldmVyeSA1IHNlY29uZHNcbiAgICBzZXRUaW1lb3V0KGdldE5vdGlmaWNhdGlvbnMsIDUwMDApO1xuICB9XG4gIFxuICBnZXROb3RpZmljYXRpb25zKCk7XG4gIFxuIl0sInNvdXJjZVJvb3QiOiIifQ==