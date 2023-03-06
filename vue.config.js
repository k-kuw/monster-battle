const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // バックエンドサーバーへの接続 CORS回避
  devServer: {
    proxy: {
      "/api/": {
        target: "http://localhost:3000",
        logLevel: 'debug'
      },
    },
  },
});
