const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        // Workbox Plugin to generate Service Worker
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,  // Ensures that the Service Worker takes control of the page immediately
            skipWaiting: true,   // Forces the Service Worker to activate immediately without waiting
            // You can customize more settings such as cache and offline support
        }),
    ],
    devServer: {
        port: 3000,
        allowedHosts: 'all'
    }
}
