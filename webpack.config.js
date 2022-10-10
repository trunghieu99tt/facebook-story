import { resolve as _resolve } from 'path';

export const mode = 'development';
export const entry = './src/index.ts';
export const output = {
  path: _resolve(__dirname, 'dist'),
  filename: 'bundle.js',
};
export const module = {
  rules: [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: true,
          },
        },
      ],
      include: /\.module\.css$/,
    },
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
};
export const resolve = {
  extensions: ['.tsx', '.ts', '.js'],
};
