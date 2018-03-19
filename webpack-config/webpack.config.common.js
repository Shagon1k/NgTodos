const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

 module.exports = {
	entry: ["./src/app"],
	output: {
		path: path.resolve(__dirname, '../dist/'),
		publicPath: '../dist/',
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				/*loader: 'babel-loader'*/
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					use: [{
						loader: "css-loader"
					}, {
						loader: "sass-loader"
					}],
					fallback: "style-loader"
				})
			}
		]
	},
	plugins: [
		new ngAnnotatePlugin({
			add: true,
			// other ng-annotate options here 
		}),
		new ExtractTextPlugin("style.css")
	]
 }