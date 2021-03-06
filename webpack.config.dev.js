import path from 'path';
import webpack from 'webpack';

const root = path.resolve(__dirname);

const clientInclude = [
  path.join(root, 'src', 'js')
];

const babelQuery = {
  presets: [
    'babel-preset-es2015',
    'babel-preset-stage-0'
  ]
};

export default {
  mode: 'development',
  devtool: 'source-map',
  entry: ['babel-polyfill', path.join(root, 'src', 'js', 'index.js')],
  output: {
    path: path.join(root, 'dist', 'js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: babelQuery,
        include: clientInclude,
        exclude: /node_modules/
      }
    ]
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash',
      assert: 'assert',
      utils: ['@jungleford/simple-utils', 'default']
    })
  ]
};