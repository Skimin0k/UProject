import path from 'path';
import webpack from 'webpack';
import 'webpack-dev-server';
import {buildWebpackConfig} from "./config/build/buildWebpackConfig";
import {BuildEnv, BuildPaths} from "./config/build/types/config";

const config: (env: BuildEnv) => webpack.Configuration =
    env => {
        const paths: BuildPaths = {
            entry: path.resolve(__dirname, 'src', 'index.tsx'),
            html: path.resolve(__dirname, 'public', 'index.html'),
            build: path.resolve(__dirname, 'build'),
            env: path.resolve(__dirname, '.env')
        }
        return buildWebpackConfig({
            paths: paths,
            isDev: env.mode === 'development',
            mode: env.mode || 'development',
            port: env.port || 3000
        });
    }


export default config;