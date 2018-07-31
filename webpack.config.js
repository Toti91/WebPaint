const path = require('path');
const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncWebpackPlugin = require('browser-sync-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
    filename: 'main.css'
});


const config = {
    entry: `${SRC_DIR}/index.js`,
    output: {
        path: DIST_DIR,
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        port: 3000,
        contentBase: './src',
        watchContentBase: true
    },
    module: {
        rules: [
            {
                test: /\.js?/,
                include: SRC_DIR,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ["es2015", "stage-2"]
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.css$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.css$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'public/images/',
                    publicPath: '/public/images/',
                }
            },
            {
                test: /\.(pdf)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'public/files/',
                    publicPath: '/public/files/',
                }
            }            
        ]
    },
    plugins: [
        extractPlugin,
        new HtmlWebpackPlugin({
            template: `${SRC_DIR}/index.html`,
            title: 'Bingo Dingo'
        })
        
    ]
}

module.exports = config;
