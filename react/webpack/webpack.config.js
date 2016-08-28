const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (options) => {
  const ExtractSASS = new ExtractTextPlugin(`css/${options.cssFileName}`);
  const __DEV__ = options.isProduction;

  const webpackConfig = {
    devtool: options.devtool,
    entry: [
      `webpack-dev-server/client?http://localhost:${+ options.port}`,
      'webpack/hot/dev-server',
      Path.join(__dirname, '../src/index'),
    ],
    output: {
      path: Path.join(__dirname, '../../src/main/resources/public'),
      filename: `js/${options.jsFileName}`,
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
    },
    module: {
      loaders: [{
        test: /.jsx?$/,
        include: Path.join(__dirname, '../src'),
        loader: 'babel',
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      },
        {
          test: /\.txt$/,
          loader: 'raw-loader',
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
          loader: 'url-loader',
          query: {
            name: __DEV__ ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
            limit: 10000,
          },
        },
        {
          test: /\.(eot|ttf|wav|mp3)$/,
          loader: 'file-loader',
          query: {
            name: __DEV__ ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
          },
        }],
    },
    plugins: [
      new Webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(options.isProduction ? 'production' : 'development'),
        }
      }),
      new HtmlWebpackPlugin({
        template: Path.join(__dirname, '../src/index.html'),
        favicon: Path.join(__dirname, '../src/favicon.ico')
      }),
    ],
  };

  if (options.isProduction) {
    webpackConfig.entry = [Path.join(__dirname, '../src/index')];

    webpackConfig.plugins.push(
      new Webpack.optimize.OccurenceOrderPlugin(),
      new Webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
        },
      }),
      ExtractSASS
    );

    webpackConfig.module.loaders.push({
      test: /\.scss$/,
      loader: ExtractSASS.extract(['css', 'sass']),
    });
  } else {
    webpackConfig.plugins.push(
      new Webpack.HotModuleReplacementPlugin()
    );

    webpackConfig.module.loaders.push({
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass'],
    });

    webpackConfig.devServer = {
      contentBase: Path.join(__dirname, '../'),
      hot: true,
      port: options.port,
      inline: true,
      progress: true,
      historyApiFallback: true,
    };
  }

  return webpackConfig;
};
