
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'rpg-pwa',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A progressive web app for RPG character combat tracking' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
    ],
  },
  plugins: ['~/plugins/vuetify.js'],
  modules: ['@nuxtjs/pwa', '@nuxtjs/font-awesome'],
  css: [
    '~/assets/style/app.styl',
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Generate configuration
  */
  // TODO cannot generate dynamics params if said params are in user storage (i.e. char name)
  generate: {
    dir: 'dist',
    routes: [
      '/character/barry',
      'about',
    ],
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      '~/plugins/vuetify.js',
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
};
