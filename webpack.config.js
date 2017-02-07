const webpack = require('webpack')
const prod = process.argv.indexOf('-p') !== -1;

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname + '/build',
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }, { 
      test: /\.css$/, 
      loader: "style-loader!css-loader" 
    }, { 
      test: /\.scss$/, 
      loader: "style-loader!css-loader!sass-loader" 
    }, { 
      test: /\.png$/, 
      loader: "url-loader?limit=150000" 
    }, { 
      test: /\.jpg$/,
      loader: "file-loader" 
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': prod? `"production"`: '"development"'
    })
  ]
};
