/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */

const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const { VuetifyPlugin } = require('webpack-plugin-vuetify');

module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      new VuetifyPlugin({
        autoImport: true
      })
    ]
  },
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  publicPath: '/',

  devServer: {
    hot: true,
    open: process.platform === 'darwin',
    host: 'localhost',
    port: 8000,
    https: true,
    compress: true
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('~app', path.resolve('./src/app'));

    if (process.argv.some((arg) => arg.includes('report'))) {
      config.optimization.concatenateModules(false);
    }

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        return {
          ...options,
          compilerOptions: {
            compatConfig: {
              MODE: 2
            }
          }
        };
      });
  },
  lintOnSave: false,
  transpileDependencies: ['vuetify']
});
