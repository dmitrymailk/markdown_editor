module.exports = {
  productionSourceMap: false,
  runtimeCompiler: true,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV !== "production") {
      config.devtool = "source-map";
    }
  },
};
