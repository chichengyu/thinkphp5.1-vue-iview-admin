const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        // 预编译包
        vendor: [
            'iview',
            'vuex',
            'vue-ls',
            'vue-router',
            'vue/dist/vue.js',
            'axios',
            'echarts',
            'mavon-editor',
            'clipboard'
            // ...其它库
        ],
    },
    output: {
        // 将会生成./ddl/vendor.js文件
        path: path.resolve(__dirname, 'public/static/src/.Runtime/dll'),
        filename: '[name].dll.js',
        library: '[name]_library',// vendor.dll.js中暴露出的全局变量名
    },
    plugins: [
        new webpack.DllPlugin({
            // 生成的映射关系文件
            path: path.join(__dirname,'[name]_dll_manifest.json'),
            name: '[name]_library',
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        })
    ],
};