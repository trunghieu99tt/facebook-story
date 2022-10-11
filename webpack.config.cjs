const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.(tsx|ts)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    // copy all css modules to dist
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src'),
          to: path.resolve(__dirname, 'dist'),
          globOptions: {
            ignore: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
          },
        },
        {
          from: path.resolve(__dirname, 'src'),
          to: path.resolve(__dirname, 'dist/cjs'),
          globOptions: {
            ignore: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
          },
        },
      ],
    }),
  ],
  performance: {
    hints: false,
  },
  optimization: {
    splitChunks: {
      minSize: 10000,
      maxSize: 250000,
    },
  },
  externals: {
    react: 'commonjs react',
    'react-dom': 'commonjs react-dom',
  },
};
