import webpack from 'webpack'
import {BuildOptions} from './types/config'
import ReactRefreshTypeScript from 'react-refresh-typescript'
import {buildSassLoader} from './loaders/SassLoader'
import {buildFileLoader} from './loaders/FileLoader'
import {buildSvgLoader, buildSvgUrlLoader} from './loaders/SvgLoader'

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const typescriptLoader = {
        test: /\.tsx?$/,
        use: [
            {
                loader: require.resolve('ts-loader'),
                options: {
                    getCustomTransformers: () => ({
                        before: [options.isDev && ReactRefreshTypeScript()].filter(Boolean),
                    }),
                    transpileOnly: options.isDev,
                },
            },
        ],
        exclude: /node_modules/,
    }

    return [
        typescriptLoader,
        buildSassLoader(options.isDev),
        buildFileLoader(),
        buildSvgUrlLoader(),
        buildSvgLoader()
    ]
}