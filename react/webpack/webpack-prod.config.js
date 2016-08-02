module.exports = require('./webpack.config.js')({
  isProduction: true,
  devtool: 'source-map',
  jsFileName: 'app.[hash].min.js',
  cssFileName: 'app.[hash].min.css',
});
