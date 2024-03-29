const fs = require('fs');
const path = require('path');
const paths = require('./paths');

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('./paths')];

const { NODE_ENV } = process.env;
if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.',
  );
}

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
  `${paths.dotenv}.${NODE_ENV}.local`,
  `${paths.dotenv}.${NODE_ENV}`,
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  NODE_ENV !== 'test' && `${paths.dotenv}.local`,
  paths.dotenv,
].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
dotenvFiles.forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    // eslint-disable-next-line global-require
    require('dotenv-expand')(
      // eslint-disable-next-line global-require
      require('dotenv').config({
        path: dotenvFile,
      }),
    );
  }
});

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebookincubator/create-react-app/issues/253.
// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders
// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of Webpack shims.
// https://github.com/facebookincubator/create-react-app/issues/1023#issuecomment-265344421
// We also resolve them to make sure all tools using them work consistently.
const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter((folder) => folder && !path.isAbsolute(folder))
  .map((folder) => path.resolve(appDirectory, folder))
  .join(path.delimiter);

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.
const REACT_APP = /^REACT_APP_/i;

function getClientEnvironment(publicUrl) {
  process.env.PUBLIC_URL = publicUrl;
  if (process.env.NODE_ENV === 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
    // process.env.PUBLIC_API = "http://localhost:5000/api";
    process.env.PUBLIC_WEB = 'http://localhost:3000';
    process.env.REACT_APP_PUBLIC_API = 'http://localhost:5000/api';
    process.env.REACT_APP_VERSION = '2.0.0';
  } else if (process.env.NODE_ENV === 'staging') {
    process.env.REACT_APP_PUBLIC_API = 'https://staging-api.netvyne.com/api';
    process.env.PUBLIC_WEB = 'https://staging.netvyne.com';
  } else {
    process.env.REACT_APP_PUBLIC_API = 'https://api.netvyne.com/api';
    process.env.PUBLIC_WEB = 'https://www.netvyne.com';
  }
  const raw = Object.keys(process.env)
    .filter((key) => REACT_APP.test(key))
    .reduce((env, key) => {
      // eslint-disable-next-line no-param-reassign
      env[key] = process.env[key];
      return env;
    }, process.env);
  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      // eslint-disable-next-line no-param-reassign
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };
  return { raw, stringified };
}

module.exports = getClientEnvironment;
