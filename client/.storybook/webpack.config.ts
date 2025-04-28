import webpack from 'webpack'
import {BuildPaths} from "../config/build/types/config";
import path from "path";
import {buildSassLoader} from "../config/build/loaders/SassLoader";
import {buildSvgLoader, buildSvgUrlLoader} from "../config/build/loaders/SvgLoader";
export default ({config}: {config: webpack.Configuration}) => {
    const paths: BuildPaths = {
        build: "", entry: "", env: "", html: "",
        src: path.resolve(__dirname, "..", "src")
    }
    config.resolve.modules.push(paths.src)
    config.resolve.extensions.push('.ts','tsx')
    config.module.rules.push(buildSassLoader(true));


    // @ts-ignore
    const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test('.svg'));
    // @ts-ignore
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push(buildSvgUrlLoader());
    config.module.rules.push(buildSvgLoader());


    return config
}