var dest = './build',
    src = './src',
    minify = false;

module.exports = {

  markup: {
    src: src + "/www/index.html",
    dest: dest
  },
  version: {
      src: src + '/www/version.json',
      dest: dest + '/version.json'
  },
  vendor: {
    src: src + "/app/vendor/**",
    dest: dest + '/js'
  },
  ico: {
    src: src + "/app/assets/**/*.ico",
    dest: dest
  },
  resources: {
    src: src + "/app/assets/**/*.pdf",
    dest: dest + '/resources'
  },
  model: {
    src: src + "/app/models/mock/**",
    dest: dest + '/mock'
  },
  browserify: {
    debug: true,
    minify: minify,
    bundleConfigs: [{
      entries: src + '/app/app.jsx',
      dest: dest + '/js',
      outputName: 'app.js'
    }]
  },
  sass: {
      errLogToConsole: true,
      outputStyle: minify ? 'compressed' : null
  },
    svg: {
        src: src + '/app/images/sprites/**/*.svg',
        dest: dest + '/css/svg',
        injectSrc: dest + '/index.html'
    },
    images: {
        src: [src + '/app/images/**/*.png',src + '/app/images/**/*.jpg',src + '/app/images/**/*.gif',src + '/app/images/**/*.svg','!' + src + '/app/images/sprites/*.svg'],
        dest: dest + '/images'
    },
    server: {
      // basic local server configuration for development.
      // some server-side routing needs to handle static assets
      // as the React Router doesn't work well with paths beyond '/'
      // ie: https://github.com/rackt/react-router/blob/master/docs/guides/basics/Histories.md
      dest: dest,
      resources: {
          root: '/resources',
          dest: dest + "/resources"
      },
      css: {
          root: '/css',
          dest: dest + "/css"
      },
      js: {
          root: '/js',
          dest: dest + "/js"
      },
      model: {
          root: '/mock',
          dest: dest + "/mock"
      }
    },
};
