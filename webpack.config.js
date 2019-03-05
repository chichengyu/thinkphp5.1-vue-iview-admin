const path = require('path')
const webpack = require("webpack")
// const uglify = require('uglifyjs-webpack-plugin') // 压缩 js
const htmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin") // 分离 css
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

// html的title标题
const htmlTitle = 'admin后台系统'
// 网站标题icon
const iconPath = 'src/assets/admin/icon/favicon.ico'


// 设置打包后台
const m = 'admin'

function resolve(src=''){
    return path.join(__dirname, 'public/static/'+src);
}

module.exports = {
    entry: resolve('src/main.js'), // 入口文件
    output: {
        path: resolve(m),
        // filename: 'bundle.js',
        chunkFilename: 'js/[name].js',
        filename: 'js/[name].js',
        publicPath: '/static/'+ m +'/' // tp5.1的框架根目录是public
    },
    devServer: {
        contentBase: resolve(m),
        // 提供给外部访问
        host: '127.0.0.1',
        port: 3000,
        // 允许开发服务器访问本地服务器的包JSON文件，防止跨域
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        // 设置热替换
        hot: true,
        // 设置页面引入
        inline: true,
        //服务端压缩是否开启
        compress:true,
    },
    module: {
        rules: [{
            test: /\.css$/,
            // use: ['style-loader', 'css-loader']
            // use:ExtractTextPlugin.extract({use: [{loader:'css-loader',options:{minimize:true}}],fallback: 'style-loader'})
            use:ExtractTextPlugin.extract({
                use: [{loader:'happypack/loader?id=happybabelCss'}],
                fallback: 'style-loader'
            })
        }, {
            test: /\.less$/,
            // use: ['style-loader', 'css-loader', 'less-loader']
            use: ExtractTextPlugin.extract({
                use:[{loader:'happypack/loader?id=happybabelCss'},{loader:'less-loader'}],
                fallback: 'style-loader',
            })
        }, {
            test: /\.(scss|sass)$/,
            // use: ['style-loader','css-loader', 'fast-sass-loader']
            use: ExtractTextPlugin.extract({
                use:[{loader:'happypack/loader?id=happybabelCss'},{loader:'sass-loader'}],
                fallback: 'style-loader',
            })
        }, {
            test: /\.styl$/,
            use: ['style-loader', 'happypack/loader?id=happybabelCss', 'stylus-loader']
        }, {
            test: /\.(jpg|png|gif|bmp|jpeg)$/i,
            use: ['url-loader?limit=7631&name=images/[hash:8]-[name].[ext]','image-webpack-loader']
        }, {
            test: /\.(ttf|eot|svg|woff|woff2)$/,
            use: 'url-loader'
        }, {
            test: /\.js$/,
            // use: 'babel-loader?cacheDirectory=true',
            use: 'happypack/loader?id=happybabelJs',
            include: [resolve('src')],
            exclude: '/node_modules/'
        }, {
            test: /\.vue$/,
            use: 'vue-loader'
        }]
    },
    plugins: [ // 所有webpack  插件的配置节点
        // new uglify({
        //     compress: {
        //         warnings: false
        //     },
        //     cache:true
        // }),
        // WebpackParallelUglifyPlugin 的打包速度比自带的 uglify 快,而且体积更小
        new WebpackParallelUglifyPlugin({
            cacheDir: resolve('src/.Runtime/.cache'),
            uglifyJS:{
                output: {
                    comments: false
                },
                compress: {
                    warnings: false
                }
            }
        }),
        new ExtractTextPlugin('css/[name].css'),
        new htmlWebpackPlugin({
            template: resolve('src/index.html'), // 指定模板文件路径
            filename: 'index.html', // 设置生成的内存页面的名称
            title:htmlTitle,// title标题
            favicon:resolve(iconPath),// 网站标题icon
            minify:{
                collapseWhitespace: true,// 去掉空格
                removeComments: true,// 去掉注释
            },
            inject:true
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks(module) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, 'node_modules')
                    ) === 0
                )
            }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'app',
            async: 'vendor-async',
            children: true,
            minChunks: 3
        }),
        // 添加DllReferencePlugin插件 优化打包速度
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, '..'),
            manifest: require('./vendor_dll_manifest.json')
        }),
        // 优化打包速度
        new HappyPack({// js
            id: 'happybabelJs',
            loaders: [{loader:'babel-loader',options:{cacheDirectory:true}}],
            threadPool: happyThreadPool,
            cache: true,
            verbose: true
        }),
        new HappyPack({// css
            id: 'happybabelCss',
            loaders: [
                {loader:'css-loader',options:{minimize:true,cacheDirectory:true}}
            ],
            threadPool: happyThreadPool,
            cache: true,
            verbose: true
        })
    ],
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.js",
            "@": resolve('src')
        }
    }
}