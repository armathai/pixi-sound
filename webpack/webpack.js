const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = () => ({
    mode: 'production',
    entry: './howler/index.js',
    plugins: [new CleanWebpackPlugin()],
    module: {
        rules: [],
    },
    output: {
        filename: 'howler.js',
        path: path.resolve('libs'),
    },
});
