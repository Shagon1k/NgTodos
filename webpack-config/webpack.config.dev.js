const common = require('./webpack.config.common.js');
const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = merge(common, {
	devtool: 'inline-source-map',
	output: {
        publicPath: '/dist/'
    },
	devServer: {
		hot: true,
		host: 'localhost',
		disableHostCheck: true,
		compress: true,
		open: true,
		historyApiFallback: true
	},
	plugins: [
		new webpack.NamedModulesPlugin()
	],
	watchOptions: {
  		aggregateTimeout: 300,
  		poll: 2000
	}
});