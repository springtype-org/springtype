const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDevelopment = process.env.NODE_ENV === 'development';
const webpack = require('webpack');

export const getDefaultConfig = (port: number) => ({
    devtool: 'eval',
    mode: isDevelopment ? 'development' : 'production',
    entry: './src/index.tsx',
    plugins: [
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['dist']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        publicPath: `http://localhost:${port}/`,
        path: __dirname + '/dist',
        filename: '[name].[hash].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.scss']
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ],
    }
});