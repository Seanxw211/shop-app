const webpack = require("webpack");
module.exports = ({
  transpileDependencies: true,
  // 打包不产生map文件
  productionSourceMap: false,
  //关闭eslint校验工具
  lintOnSave: false,
  // 代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.98.123.211'
      }
    }
  },
  // 打包后无法显示
  publicPath: "./",
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        // src下的文件夹
        assets: "@/assets",
        components: "@/components",
        views: "@/views",
      },
    },
  },
})
