import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import Dotenv from 'dotenv-webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'

import {BuildOptions} from './types/config'

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
        new BundleAnalyzerPlugin({
            openAnalyzer: false,
            // analyzerMode: 'disabled'
        })
    ]
    if (options.isDev){
        plugins.push(
            new ReactRefreshWebpackPlugin()
        )
    }
    return plugins
}