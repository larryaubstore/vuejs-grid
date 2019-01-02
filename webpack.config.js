const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

var config = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname + '/dist/'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      }
    ]
  },
  externals: {
    moment: 'moment'
  },
  optimization: {
    minimize : true
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin()
  ]
};


module.exports = [
  merge(config, {
    entry: path.resolve(__dirname + '/src/plugin.js'),
    output: {
      filename: 'grid.min.js',
      libraryTarget: 'window',
      library: 'Grid',
    }
  }),
  merge(config, {
    entry: path.resolve(__dirname + '/src/components/Grid.vue'),
    output: {
      filename: 'grid.js',
      libraryTarget: 'umd',
      library: 'Grid',
      umdNamedDefine: true
    }
  })
];
