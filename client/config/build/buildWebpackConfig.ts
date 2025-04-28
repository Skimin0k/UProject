import webpack from 'webpack'

import {BuildOptions} from './types/config'
import {buildDevServer} from './buildDevServer'
import {buildLoaders} from './buildLoaders'
import {buildPlugins} from './buildPlugins'
import {buildResolvers} from './buildResolvers'

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const {paths, mode} = options
    return {
        mode: mode,
        entry: paths.entry, // стартовая точка для запуска приложения
        output: {
            filename: '[name].[contenthash].js',
            chunkFilename: '[name].[contenthash:8].bundle.js',
            path: paths.build,
            clean: true,
            publicPath: '/'
        },
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        plugins: buildPlugins(options),
        devtool: mode === 'development'? 'inline-source-map': undefined,
        devServer: options.isDev? buildDevServer(options): undefined
    }
}