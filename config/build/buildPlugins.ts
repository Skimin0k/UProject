import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import Dotenv from 'dotenv-webpack';
import {BuildOptions} from "./types/config";

export function buildPlugins(options: BuildOptions): webpack.WebpackPluginInstance[]{
    return [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: options.paths.html
        }),
        new Dotenv({
            path: options.paths.env,
            safe: true,
            defaults: true,
        })
    ]
}