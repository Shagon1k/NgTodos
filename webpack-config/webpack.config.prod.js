const common = require('./webpack.config.common.js');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
	devtool: 'source-map',
	plugins: [
	 	new webpack.optimize.ModuleConcatenationPlugin(),
	 	new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
		new UglifyJsPlugin({
			sourceMap: true
		})
	]
});