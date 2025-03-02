const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
    const isDevelopment = argv.mode === 'development';

    return {
        entry: './src/client/index.js',
        mode: isDevelopment ? 'development' : 'production',
        devtool: isDevelopment ? 'source-map' : false, 
        stats: 'verbose', 

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                },
                {
                    test: /\.scss$/,
                    use: isDevelopment
                        ? ['style-loader', 'css-loader', 'sass-loader'] 
                        : [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] 
                }
            ]
        },

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isDevelopment ? 'index.js' : '[name].[contenthash].js',  
        },

        optimization: {
            minimize: !isDevelopment, 
            minimizer: !isDevelopment ? [
                new CssMinimizerPlugin(),
                new TerserPlugin()
            ] : []
        },

        plugins: [
            new HtmlWebPackPlugin({
                template: "./src/client/views/index.html",
                filename: "./index.html",
            }),
            new CleanWebpackPlugin({
                dry: true,
                verbose: true,
                cleanStaleWebpackAssets: true,
                protectWebpackAssets: false
            }),
            ...(isDevelopment ? [] : [
                new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
                new WorkboxPlugin.GenerateSW({
                    clientsClaim: true,
                    skipWaiting: true,
                })
            ])  
        ],

        devServer: {
            port: 3000,
            allowedHosts: 'all',
            static: {
                directory: path.join(__dirname, 'dist'),
                publicPath: '/',
            },
            headers: {
                'Service-Worker-Allowed': '/',  
            }
        }
    };
};
