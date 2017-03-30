var path = require("path")
var webpack = require("webpack")
var config = require("../src/config/config")
var CleanWebpackPlugin = require('clean-webpack-plugin')

const srcPath    = path.resolve(__dirname, "../src")
const assetsPath = path.resolve(__dirname, "../dist")

module.exports = {
  entry: {
    "main": [
      "./src/client.js"
    ],
  },
  target: "web",
  output: {
    path: assetsPath,
    publicPath: "//" + config.STATIC_HOST + "/static/",
    filename: "app.min.js",
    chunkFilename: "[chunkhash].js"
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules', srcPath],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
    }
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ["style", "css"]
      },{
        test: /\.less$/,
        loaders: [
          'style-loader', 'css-loader', 'less-loader'
        ]
      },{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },{
        test: /\.vue$/,
        loader: 'vue',
      },{
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?{progressive: true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
        ]
      },
    ]
  },
  vue: {
    loaders: {
      js: 'babel'
    }
  },
  plugins: [
    new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin({
      "__DEV__" : JSON.stringify(process.env.NODE_ENV === "development"),
      "__PROD__": JSON.stringify(process.env.NODE_ENV === "production")
    }),

    new CleanWebpackPlugin(['dist'], {
        root: __dirname,
        verbose: true,
        dry: false,
        exclude: ['favicon.*']
    }),
  ]
}
