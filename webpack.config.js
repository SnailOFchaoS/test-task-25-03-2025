const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Импортируем плагин для работы с HTML

module.exports = {
  mode: 'development', // Или 'production'
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/', // Важно! Укажите publicPath
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    historyApiFallback: true, // Важно! Добавьте historyApiFallback
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ // Плагин для генерации HTML-файла
      template: './public/index.html', // Путь к вашему HTML-шаблону
    }),
  ],
};