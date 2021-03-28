import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App isExt={false} />, document.getElementById("root"));
registerServiceWorker();
