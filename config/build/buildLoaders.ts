import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/config";
import ReactRefreshTypeScript from 'react-refresh-typescript'

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
    const sassLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            options.isDev? 'style-loader': MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            {
                loader: "css-loader",
                options: {
                    modules: {
                        localIdentName: options.isDev? '[path][name]__[local]--[hash:base64:5]' : "[hash:base64:5]",
                        auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                    },
                },
            },
            // Compiles Sass to CSS
            "sass-loader",
        ]
    }
    const svgLoader = [
            {
                test: /\.svg$/i,
                type: 'asset',
                resourceQuery: /url/, // *.svg?url
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
                use: ['@svgr/webpack'],
            },
        ]
    const fileLoader = {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext][query]',
                    },
                },
            ],
    }

    return [
        typescriptLoader,
        sassLoader,
        fileLoader,
        ...svgLoader
    ]
}