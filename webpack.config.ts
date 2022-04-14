import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import * as webpack from 'webpack';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';

import config from './config';

const isDevelopment = config.IS_DEV_MODE;

console.log('[Webpack] development: ', isDevelopment, process.env.NODE_ENV);

export default {
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  entry: [__dirname + '/src/index.tsx', 'webpack/hot/dev-server.js'],
  output: {
    path: __dirname + '/build',
    filename: '[name].[contenthash:8].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/react'],
              plugins: [isDevelopment && 'react-refresh/babel'].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.(jsx|ts|tsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                '@babel/preset-typescript',
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: 3,
                    targets: {
                      browsers: ['last 2 versions', '>= 5% in KR'],
                    },
                    // debug: true,
                  },
                ],
                '@babel/react',
              ],
              plugins: [
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                'babel-plugin-styless',
              ].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: [
          // ?name=[name].[ext] is only necessary to preserve the original file name
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              fallback: 'file-loader',
              name: '[path][name].[ext]',
              publicPath: '/',
              // name: 'static/images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(html)$ /,
        exclude: /node_modules/,
        use: ['html-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.json', '.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '~apis': __dirname + '/src/apis',
      '~assets': __dirname + '/public',
      '~components': __dirname + '/src/components',
      '~config': __dirname + '/config',
      '~constants': __dirname + '/src/constants',
      '~hooks': __dirname + '/src/hooks',
      '~models': __dirname + '/src/models',
      '~stores': __dirname + '/src/stores',
      '~styles': __dirname + '/src/styles',
      '~utils': __dirname + '/src/utils',
      process: 'process/browser',
    },
    modules: ['node_modules'],
  },
  devServer: {
    compress: true,
    historyApiFallback: {
      index: '/',
    },
    port: 3000,
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: isDevelopment ? 'development' : 'production',
    }),
    new WebpackManifestPlugin({
      fileName: 'manifest.json',
      basePath: 'build/',
    }),
    !isDevelopment
      ? new CleanWebpackPlugin({
          cleanAfterEveryBuildPatterns: ['build'],
        })
      : () => ({}),
    new HtmlWebpackPlugin({
      template: __dirname + '/public/index.html',
      filename: 'index.html',
      favicon: 'public/favicon.ico',
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    isDevelopment ? new ReactRefreshWebpackPlugin() : () => ({}),
    new ForkTsCheckerWebpackPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimize: !isDevelopment,
    minimizer: [
      !config.ENABLE_CONSOLE_LOG
        ? new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true,
              },
            },
          })
        : () => ({}),
    ],
  },
};
