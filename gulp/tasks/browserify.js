/* browserify task
   ---------------
   Bundle javascripty things with browserify!
   This task is set up to generate multiple separate bundles, from
   different sources, and to use Watchify when run from the default task.
   See browserify.bundleConfigs in gulp/config.js
*/

var browserify   = require('browserify');
var watchify     = require('watchify');
var uglify       = require('gulp-uglify');
var streamify    = require('gulp-streamify');
var bundleLogger = require('../util/bundleLogger');
var gulp         = require('gulp');
var handleErrors = require('../util/handleErrors');
var source       = require('vinyl-source-stream');
var configfile   = require('../config');
var config       = configfile.browserify;
var babelify     = require('babelify');
var rename = require("gulp-rename");


module.exports = function(assetVersion) {

  console.log("Building (browserify) codebase per '" + configfile.environment + "' environment.");
  console.log("NOTE: All external API calls wil point to: " + configfile.apiEndpoint);
  console.log("To get a visualization, use: discify app.js > disc.html");

  var bundleQueue = config.bundleConfigs.length;

  var browserifyThis = function(bundleConfig) {

    var bundler = browserify({
      // Required watchify args
      cache: {},
      packageCache: {},
      fullPaths: true,
      // Specify the entry point of your app
      entries: bundleConfig.entries,
      // Add file extentions to make optional in your requires
      extensions: config.extensions,
      // Enable source maps!
      debug: !config.minify
    });

    var bundle = function() {
      // Log when bundling starts
      bundleLogger.start(bundleConfig.outputName);
        var bundlerObj = bundler
            .bundle()
            // Report compile errors
            .on('error', handleErrors)
            // Use vinyl-source-stream to make the
            // stream gulp compatible. Specifiy the
            // desired output filename here.
            .pipe(source(bundleConfig.outputName));

        if(config.minify) {
          bundlerObj.pipe(streamify(uglify({compress: true})));
        }

        // updating filename to asset Version
        bundlerObj.pipe(rename(function (path) {
          path.basename += "-" + assetVersion;
        }))
        bundlerObj.pipe(gulp.dest(bundleConfig.dest))
            .on('end', reportFinished);

        return bundlerObj;
    };

    bundler.transform(babelify.configure({stage: 1}));

    if (global.isWatching) {
      // Wrap with watchify and rebundle on changes
      bundler = watchify(bundler);
      // Rebundle on update
      bundler.on('update', bundle);
    }

    var reportFinished = function() {
      // Log when bundling completes
      bundleLogger.end(bundleConfig.outputName);

      if (bundleQueue) {
        bundleQueue--;
        if (bundleQueue === 0) {
          // If queue is empty, tell gulp the task is complete.
          // https://github.com/gulpjs/gulp/blob/master/docs/API.md#accept-a-callback
          //callback();
        }
      }
    };

    return bundle();
  };

  // Start bundling with Browserify for each bundleConfig specified
  config.bundleConfigs.forEach(browserifyThis);
};
