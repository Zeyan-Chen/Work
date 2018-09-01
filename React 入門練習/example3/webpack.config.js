const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		preview: './preview.js'
	},
	output: {
		path: path.resolve(__dirname, './'),
	},
	module: {
		rules: [
			{
	            test: /\.css$|\.scss$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[local]'
						}
					},
					{
						loader: 'sass-loader'
					}
				]
	        },
			{
				test: /\.js?$|\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
				        loader: 'babel-loader',
				        options: {
							presets: ['env', 'react']
				        }
				    }
				]
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, './'),
		compress: true,
		port: 9000
	},
	devtool: 'source-map',
	plugins: [
		new HtmlWebpackPlugin({
      		inject: true,
      		template: './preview.html'
    	}),
		new webpack.HotModuleReplacementPlugin()
	]
};