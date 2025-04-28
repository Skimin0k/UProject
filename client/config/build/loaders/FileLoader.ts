export function buildFileLoader() {
    return {
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
}