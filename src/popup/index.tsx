import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { browser } from 'webextension-polyfill-ts';
import * as Sentry from '@sentry/react';
import { QueryClientProvider, useQuery } from 'react-query';
import { Integrations } from '@sentry/tracing';
import { Popup } from './component';
import { Error } from '../components/error';
import { queryClient } from '../query';

import '../scss/app.scss';

// // // //

Sentry.init({
  dsn: 'https://53854b70b3ef4bcfbbca31001b73fcc1@o746986.ingest.sentry.io/5796177',
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  release: process.env.VERSION,
  environment: process.env.NODE_ENV,
});

browser.tabs.query({ active: true, currentWindow: true }).then(() => {
  // ReactDOM.render(<Popup />, document.getElementById('popup'));
  ReactDOM.render(
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <Sentry.ErrorBoundary fallback={({ error }) => <Error />}>
          <Popup />
        </Sentry.ErrorBoundary>
      </React.StrictMode>
    </QueryClientProvider>,
    document.getElementById('popup'),
  );
});
