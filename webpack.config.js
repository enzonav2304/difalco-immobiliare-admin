const path = require('path')
const webpack = require('webpack')
var dotenv = require('dotenv').config({path: __dirname + '/.env'})
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const extractStyles = new ExtractTextPlugin({
    filename: "assets/css/[name].css"
})

module.exports = {

    entry: {
        'uploadconfigure': path.resolve(__dirname, 'src/js/uploadconfigure'),
        'customer': path.resolve(__dirname, 'src/js/customer'),
        'customer-login': path.resolve(__dirname, 'src/js/customer-login'),
        'customer-signup': path.resolve(__dirname, 'src/js/customer-signup'),
        'manage': path.resolve(__dirname, 'src/js/manage'),
        'hd-styles': path.resolve(__dirname, 'src/js/hd-styles'),
        // 'polyfill': 'babel-polyfill',
        'vendor': [
            'axios',
            'vue',
            'vue-router',
            'bootstrap-vue',
        ]
    },

    output: {
        path: path.resolve(__dirname, 'public/hd-assets'),
        filename: 'js/[name].bundle.js',
        publicPath: path.resolve(__dirname, 'public')
    },

    resolve: {
        modules: [
            "node_modules",
        ],

        alias: {
            // 'vue$': 'vue/dist/vue.esm.js', // development build with compiler
            //'vue$': 'vue/dist/vue.runtime.esm.js', // product runtime without compiler
            // 'bootstrap-vue$': 'bootstrap-vue/dist/bootstrap-vue.esm.js',
            'bootstrap-vue$': 'bootstrap-vue/lib/', // from source
            'vuex$': 'vuex/dist/vuex.esm.js',
            'vue-router$': 'vue-router/dist/vue-router.esm.js',
            'moment$': 'moment/min/moment.min.js',
        },
    },

    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                    // the "scss" and "sass" values for the lang attribute to the right configs here.
                    // other preprocessors should work out of the box, no loader config like this necessary.
                    'scss': 'vue-style-loader!css-loader!sass-loader',
                    'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                }
                // other vue-loader options go here
            }
        },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)(\?v=[0-9]+\.[0-9]+\.[0-9]+)?$/,
                loader: 'file-loader',
                options: {
                    name: 'images/bundled/[name].[ext]?[hash]'
                }
            },
            {
                test: /\.scss$/,
                use: extractStyles.extract({
                    // use: [ 'css-loader?-autoprefixer!postcss-loader', 'sass-loader' ]
                    use: [{
                        loader: 'css-loader',
                        options: {
                            autoprefixer: false,
                            importLoaders: 2
                        },
                    }, 'postcss-loader', 'sass-loader']
                })
            },
            {
                test: /\.css$/,
                use: extractStyles.extract(['css-loader'])
            },
            {
                test: /\.styl$/,
                loader: ['style', 'css', 'stylus']
            },
            // the url-loader uses DataUrls.
            // the file-loader emits files.
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                // loader: "url-loader?limit=10000&mimetype=application/font-woff",
                loader: "url-loader",
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff',
                    name: 'fonts/[name].[ext]?[hash]',
                },
            },
            {
                test: /\.(ttf|eot)(\?v=[0-9]+\.[0-9]+\.[0-9]+)?$/,
                loader: "file-loader",
                options: {
                    name: 'fonts/[name].[ext]?[hash]',
                },
            }]
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env": dotenv.parsed
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: [
                'vendor',
                // 'polyfill',
            ],
        }),
        extractStyles,
        new webpack.ProvidePlugin({
            jQuery: 'jquery/dist/jquery.slim',
            $: 'jquery/dist/jquery.slim',
            Tether: 'tether',
            axios: 'axios',
            ajax: 'axios',
        }),
        // Fixes warning in moment-with-locales.min.js
        //   Module not found: Error: Can't resolve './locale' in ...
        new webpack.IgnorePlugin(/\.\/locale$/),
    ],

    devServer: {
        historyApiFallback: true,
        noInfo: true
    },

    performance: {
        hints: false
    },

    devtool: '#eval-source-map',

}

/**********************/
/* PRODUCTION OPTIONS */
/**********************/

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'

    const minification = new webpack.optimize.UglifyJsPlugin({
        sourcemap: true,
        unused: true,
        compress: {
            warnings: false,
            dead_code: true,
            unused: true,
        }
    })

    const cssMinification = new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
            discardComments: {
                removeAll: true
            }
        },
        canPrint: true
    })

    const envDefinition = new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    })

    const loaderOptions = new webpack.LoaderOptionsPlugin({
        minimize: true
    })

    const bundleAnalyzer = new BundleAnalyzerPlugin

    const productionPlugins = [
        minification, envDefinition, loaderOptions, cssMinification, bundleAnalyzer
    ]

    module.exports.plugins.push(...productionPlugins)
}
