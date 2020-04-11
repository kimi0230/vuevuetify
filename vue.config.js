// const cdn = {
//   css: ["https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900", "https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css"],
//   js: []
// };

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  // publicPath: "/",
  indexPath: "index.html",
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
    resolve: {
      alias: {
        "@SM": "@/store/modules",
        "@UTILS": "@/utils",
        "@LANG": "@/lang",
        "@VIEW": "@/views",
        "@LAYOUT": "@/layout"
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        options.hotReload = true;
        return options;
      });
    config.module
      .rule("fonts")
      .test(/\.(woff2?|eot|ttf|otf|woff)(\?.*)?$/)
      .use("url-loader")
      .loader("url-loader")
      .tap(options => Object.assign(options, {
        limit: 10240
      }));
  },
  css: {
    // 如果想在 JavaScript 中作為 CSS Modules 導入 CSS 或其它預處理文件， 該文件應該以.module.(css | less | sass | scss | styl) 結尾：
    // requireModuleExtension: false,
    loaderOptions: {
      // 给 sass-loader 傳遞選項
      sass: {
        // @/ 是 src/ 的別名
        // 所以這裡假設你有 `src/variables.sass` 這個文件
        // 注意：在 sass-loader v7 中，這個選項名是 "data"
        prependData: `@import "~@/sass/helpers/_variables.scss"`
      },
      // 默認情況下 `sass` 選項會同時對 `sass` 和 `scss` 語法同時生效
      // 因為 `scss` 語法在內部也是由 sass-loader 處理的
      // 但是在配置 `data` 選項的時候
      // `scss` 語法會要求語句結尾必須有分號，`sass` 則要求必須沒有分號
      // 在這種情況下，我們可以使用 `scss` 選項，對 `scss` 語法進行單獨配置
      scss: {
        prependData: `@import "~@/sass/helpers/_variables.scss";`
      },
      // 給 less-loader 傳遞 Less.js 相關選項
      less: {
        // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
        // `primary` is global variables fields name
        globalVars: {
          primary: '#fff'
        }
      },
    }
  }
}