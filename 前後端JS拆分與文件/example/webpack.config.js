const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
	entry: {
		'index': './index.entry.js',
	},
	output: {
		filename: '[name]',
		path: path.resolve(__dirname, ( (env = 'develop') => {
			let assignRoot = {
				'production': './publish/_shared/LightSpeed/',
				'release': './release/_shared/LightSpeed/',
				'develop': './develop/_shared/LightSpeed/'
			};
			return assignRoot[env];
		} )( process.env.NODE_ENV )),
		publicPath: './_shared/LightSpeed/',
	},
    plugins: ( (env = 'develop') => {
    	let defaultPlugins = [
    		new CopyWebpackPlugin([
				{ from: './js/backend', to: './SubSiteBundles/Flights/Backend', transform: (content) => { 
					return new Buffer(content.toString().replace(/\/\*\*[^\0]*? \*\//gm, '')); 
				}}
			], {
				copyUnmodified: true,
				ignore: [
					'*.scss', '*.ejs', '*.git'
				]
			})
    	];
    	let envPlugins = {
    		'production': [],
			'release': [],
			'develop': []
    	};
    	return defaultPlugins.concat(envPlugins[env]);
	} )( process.env.NODE_ENV )
};