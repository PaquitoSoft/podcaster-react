var webpack = require('webpack'),
	ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './app/js/app.js',
	output: {
		path: './dist',
		filename: 'podcaster-app.js'
	},
	resolveLoader: {
		// I need this to allow using locally linked npm modules
		root: require('path').join(__dirname, 'node_modules')
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel'
			},

			{
				test: /\.html$/,
				loader: 'raw'
			},

			// http://webpack.github.io/docs/stylesheets.html
			{ test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },

			// https://github.com/gowravshekar/bootstrap-webpack
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
		}),
		// http://webpack.github.io/docs/stylesheets.html
		new ExtractTextPlugin('podcaster-styles.css', {
			allChunks: true
		})
	]
};