import {buildLoaders} from './buildLoaders'
import {buildResolvers} from './buildResolvers'
import {buildPlugins} from './buildPlugins'
import webpack from 'webpack'
import {BuildOptions} from './types/config'
import {buildDevServer} from './buildDevServer'

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
        },
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        plugins: buildPlugins(options),
        devtool: mode === 'development'? 'inline-source-map': undefined,
        devServer: buildDevServer(options)
    }
}