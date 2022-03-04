const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const getClientEnvironment = require('./config/env');
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = '';
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

function modify(buffer) {
  const manifest = JSON.parse(buffer.toString());
  if (process.env.REACT_APP_VERSION) manifest.version = process.env.REACT_APP_VERSION.replace('v', '');
  const manifestJSON = JSON.stringify(manifest, null, 2);
  return manifestJSON;
}

module.exports = {
  entry: {
    backgroundPage: path.join(__dirname, 'src/backgroundPage.ts'),
    popup: path.join(__dirname, 'src/popup/index.tsx'),
  },
  output: {
    path: path.join(__dirname, 'extension/js'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', // Creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // Translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // Compiles Sass to CSS
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@src': path.resolve(__dirname, 'src/'),
    },
  },
  plugins: [
    new webpack.DefinePlugin(env.stringified),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './extension/manifest.json',
          to: '../manifest.json',
          transform(content) {
            return modify(content);
          },
        },
      ],
    }),
  ],
};
