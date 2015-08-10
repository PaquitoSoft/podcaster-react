var webpack = require('webpack');

module.exports = {
	entry: './app/js/app.js',
	output: {
		filename: './dist/podcaster.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel'
			}
		]
	}
};