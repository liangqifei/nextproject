// const withTypescript = require("@zeit/next-typescript");
// const withCSS = require("@zeit/next-css");
// const withSass = require("@zeit/next-sass");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const devMode = process.env.NODE_ENV !== "production";
function assetsPath(_path) {
  assetsSubDirectory =
    process.env.NODE_ENV === "production" ? "static" : "static";
  return path.posix.join(assetsSubDirectory, _path);
}
function resolve(dir) {
  return path.join(__dirname, "..", dir);
}
function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}

const theme = require("./package.json").theme;
const publicPath = "/";
const cssSourceMap = true;
module.exports = {
  assetPrefix: "/",
  webpack: config => {
    config.output.publicPath = `${publicPath}${config.output.publicPath}`;
    return config;
  },
  webpack(config, options) {
    // Further custom configuration here
    // config.optimization = {
    //   splitChunks: {
    //     cacheGroups: {
    //       fooStyles: {
    //         name: "foo",
    //         test: (m, c, entry = "foo") =>
    //           m.constructor.name === "CssModule" &&
    //           recursiveIssuer(m) === entry,
    //         chunks: "all",
    //         enforce: true
    //       },
    //       barStyles: {
    //         name: "bar",
    //         test: (m, c, entry = "bar") =>
    //           m.constructor.name === "CssModule" &&
    //           recursiveIssuer(m) === entry,
    //         chunks: "all",
    //         enforce: true
    //       }
    //     }
    //   }
    // };
    config.optimization = {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({})
      ],
      splitChunks: {
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.css$/,
            chunks: "all",
            enforce: true
          }
        }
      }
    };
    config.resolve.extensions = [".web.js", ".js", ".json"];
    config.resolve.alias = {
      "@pages": resolve("pages"),
      "@static": resolve("static")
    };
    config.module.rules.push(
      {
        test: /\.txt$/,
        use: "raw-loader"
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "[name].[hash:7].[ext]"
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "[name].[hash:7].[ext]"
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "[name].[hash:7].[ext]"
        }
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          { loader: "less-loader", options: { modifyVars: theme } }
        ],
        include: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    );
    config.plugins.push(
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: assetsPath("css/[name].css"),
        chunkFilename: assetsPath("css/[id].css"),
        allChunks: true
      })
    );
    return config;
  }
};
