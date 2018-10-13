const path = require("path");

const resolve = dir => {
  return path.join(__dirname, dir);
};

const BASE_URL = process.env.NODE_ENV === "production" ? "/iview-admin/" : "/";

module.exports = {
  baseUrl: BASE_URL,
  devServer: {
    port: 8021, // 端口号
    host: "localhost",
    open: true, //配置自动启动浏览器
    proxy: {
      "/api": {
        target: "http://test.xp.yumc.pw/api/", // # 询盘小程序 测试空间
        // "target":"http://dev.xp.yumc.pw/api/",// # 询盘小程序 开发环境
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set("_c", resolve("src/components"));
  }
};
