import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { QueryClientProvider } from 'react-query';
import { Error } from '../components/error';
import { queryClient } from '../query';
import '../scss/app.scss';
import { Popup } from './component';

const theme = createTheme();

Sentry.init({
  dsn: 'https://53854b70b3ef4bcfbbca31001b73fcc1@o746986.ingest.sentry.io/5796177',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 0.8,
  release: process.env.VERSION,
  environment: process.env.NODE_ENV,
});

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Sentry.ErrorBoundary fallback={({ error }) => <Error message={error.toString()} />}>
      <ThemeProvider theme={theme}>
        <Popup />
      </ThemeProvider>
    </Sentry.ErrorBoundary>
  </QueryClientProvider>,
  document.getElementById('popup'),
);
