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
			},
			// https://github.com/gowravshekar/bootstrap-webpack
			{ test: /\.css$/, loader: 'style-loader!css-loader' },
			{ test: /\.woff$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
			{ test: /\.woff2$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff2' },
			{ test: /\.ttf$/, loader: 'file-loader' },
			{ test: /\.eot$/, loader: 'file-loader' },
			{ test: /\.svg$/, loader: 'file-loader' }
		]
	},
	// This is to load polyfills (http://mts.io/2015/04/08/webpack-shims-polyfills/)
	plugins: [
		new webpack.ProvidePlugin({
			fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
			'es6-promise': 'es6-promise'
		})
	]
};