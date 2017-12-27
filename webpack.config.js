var webpack = require('webpack'); 

var path = require('path'); 

var BUILD_DIR = path.resolve(__dirname, 'public'); 

var APP_DIR = path.resolve(__dirname, 'src'); 

var config = { 

  entry: APP_DIR + '/index.jsx', 

  output: { 

  path: BUILD_DIR, 

  filename: 'bundle.js' 

},
resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include : APP_DIR,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015']
        }
      },
     { test: /\.css$/, 
      loader: "style-loader!css-loader"
    }
    ]
  } 

}; 

 

module.exports = config; 