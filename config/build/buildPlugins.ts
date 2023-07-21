import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import Dotenv from 'dotenv-webpack'
import {BuildOptions} from './types/config'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'


export function buildPlugins(options: BuildOptions): webpack.WebpackPluginInstance[]{

    const plugins = [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: options.paths.html
        }),
        new Dotenv({
            path: options.paths.env,
            safe: true,
            defaults: true,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }),

    ]
    if (options.isDev){
        plugins.push(
            new ReactRefreshWebpackPlugin(),
            new BundleAnalyzerPlugin({
                openAnalyzer: false,
                analyzerMode: 'disabled'
            }))
    }
    return plugins
}