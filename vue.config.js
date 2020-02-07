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
        "@SM": "@/store/modules"
      }
    }
  }
}