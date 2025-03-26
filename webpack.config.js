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
        test: /\.module\.scss$/, // SCSS Modules файлы (.module.scss)
        use: [
          'style-loader', // Вставляем стили в DOM
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]', // Имена классов для CSS Modules
              },
              sourceMap: true,
              importLoaders: 2,
            },
          },
          'postcss-loader', // Для Autoprefixer
          'sass-loader', // Компилируем SCSS в CSS
        ],
      },
      {
        test: /\.scss$/, // Обычные SCSS файлы (без CSS Modules)
        exclude: /\.module\.scss$/,
        use: [
          'style-loader', // Вставляем стили в DOM
          {
            loader: 'css-loader',
            options: {
              sourceMap: true, // Включаем Source Maps
              importLoaders: 2, //  Чтобы Sass Loader обработал @import
            },
          },
          'postcss-loader', // Для Autoprefixer
          'sass-loader', // Компилируем SCSS в CSS
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]', 
              outputPath: 'assets',
              publicPath: 'assets',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ // Плагин для генерации HTML-файла
      template: './public/index.html', // Путь к вашему HTML-шаблону
    }),
  ],
};