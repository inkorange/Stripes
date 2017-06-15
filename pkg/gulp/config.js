var dest = './build',
    src = './src',
    minify = false;

module.exports = {
  markup: {
    src: "./www/index.html",
    dest: dest
  },
  browserify: {
    debug: true,
    minify: minify,
    extensions: ['react', 'react-dom'],
    bundleConfigs: [{
      entries: './www/app.jsx',
      dest: dest + '/js',
      outputName: 'app.js'
    }]
  },
    sass: {
        errLogToConsole: true,
        outputStyle: minify ? 'compressed' : null
    },
    font: {
        src: ['./www/stylesheets/*.woff2', './www/stylesheets/*.woff', './www/stylesheets/*.ttf'],
        dest: dest + '/css'
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
    }
};
