const flags = require("../config/flags");
const gulp = require("gulp");
const path = require("path");
const paths = require("../../package.json").paths;
const webpack = require("webpack");
const webpackStream = require("webpack-stream");

const entries = require('../config/scripts')

function jsTranspile() {
  const webpackConfig = {
    mode: flags.minify ? "production" : "development",
    entry: entries.entries,
    devtool: flags.maps ? "inline-source-map" : 'none',
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                [require('babel-plugin-transform-imports'), {
                  "Helpers": {
                    "transform": "../Helpers/${member}",
                    "preventFullImport": true
                  },
                  "Components": {
                    "transform": "../Components/${member}",
                    "preventFullImport": true
                  }
                }]
              ]
            }
          }
        }    
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    output: {
      path: path.resolve(__dirname, paths.js.webpackOutput.path),
      filename: "scripts/[name].js",
      publicPath: paths.js.webpackOutput.publicPath,
    },
  };

  return gulp
    .src(paths.js.src + "*.ts")
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(flags.proxy ? paths.js.proxyDest : paths.js.staticDest));
}

exports.jsTranspile = jsTranspile;
