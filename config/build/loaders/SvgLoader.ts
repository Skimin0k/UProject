export function buildSvgUrlLoader(){
    return {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/, // *.svg?url
    }
}
export function buildSvgLoader(){
    return {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
        use: require.resolve('@svgr/webpack'),
    }
}