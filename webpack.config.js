const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs',
  },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'high-order-components'),
        ],
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  target: 'web',
  externals: [nodeExternals()],
  resolve: {
    alias: {
      'high-order-components': path.resolve(__dirname, 'high-order-components'),
      'test-utils': path.resolve(__dirname, 'test-utils'),
    },
  },
};
