const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractSCSS = new ExtractTextPlugin({
	filename: function(getPath) {
		return getPath('[name].css');
	},
	allChunks: false
});
module.exports = {
	entry: {
		'core': './core.entry.js',
	},
	output: {
		filename: ( (env = 'develop') => {
			let assignFilename = {
				'production': '[name].min.js',
				'develop': '[name].js'
			};
			return assignFilename[env];
		} )( process.env.NODE_ENV ),
		path: path.resolve(__dirname, './'),
	},
	module: {
        rules: [
        	{
        		test: /\.js$/,
        		exclude: /(node_modules|bower_components)/,
        		use: [
	        		{
				        loader: 'babel-loader',
				        options: {
							presets: ['env']
				        }
				    }
			    ]
        	},
	        {
	            test: /\.css$|\.scss$/,
	            use: ExtractSCSS.extract({
	                use: [
		                {
		                	loader: 'css-loader',
		                	options: {
		                		minimize: true
		                	}
		                },
		                {
		                	loader: 'sass-loader'
		                }
	                ],
	            })
	        }
        ]
    },
    plugins: ( (env = 'develop') => {
    	let defaultPlugins = [
    		ExtractSCSS,
     		new WebpackShellPlugin({
				onBuildStart:[
			 		(env === 'develop') ? 'node sass.compiler.js' : ''
			 	]
			})
    	];
    	let envPlugins = {
    		'production': [
    			new UglifyJSPlugin({
					compress: {
						drop_console: true
					}
				})
    		],
			'develop': []
    	};

    	return defaultPlugins.concat(envPlugins[env]);
	} )( process.env.NODE_ENV )
};