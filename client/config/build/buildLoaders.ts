import ReactRefreshTypeScript from 'react-refresh-typescript'
import webpack from 'webpack'

import {buildFileLoader} from './loaders/FileLoader'
import {buildSassLoader} from './loaders/SassLoader'
import {buildSvgLoader, buildSvgUrlLoader} from './loaders/SvgLoader'
import {BuildOptions} from './types/config'

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
        buildSvgLoader(),
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
        }

    ]
}