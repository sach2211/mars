const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: path.join(__dirname + '/client/index.js')
  },

  output: {
    path: path.join(__dirname + '/public/'),
    filename: 'chunk-[name].js'
  },
  
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: path.join(__dirname + '/node_modules/'),
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: path.join(__dirname + '/node_modules/'),
        use: [
          'style-loader', 
          'css-loader'
        ]
      }
    ]
  },

  plugins: [
    // Generate a seperate HTML and bundle for each part.
    new HtmlWebpackPlugin({
      template: './client/index.html'
    }),
  ],

  mode: process.env.NODE_ENV || 'development'
};