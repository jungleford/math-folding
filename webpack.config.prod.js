import path from 'path';
import webpack from 'webpack';

const root = path.resolve(__dirname);

export default {
  mode: 'production',
  entry: [path.join(root, 'lib', 'js', 'index.js')],
  output: {
    path: path.join(root, 'dist', 'js'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash',
      assert: 'assert',
      utils: ['@jungleford/simple-utils', 'default']
    })
  ]
};