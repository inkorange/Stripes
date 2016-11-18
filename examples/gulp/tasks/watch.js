
/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var gulp   = require('gulp');
var config = require('../config');

module.exports = function() {
  gulp.watch(config.markup.src, ['markup','svgstore']);
  gulp.watch(config.model.src, ['model']);
  gulp.watch('./src/app/**/*.js', ['browserify']);
  gulp.watch('./src/app/stylesheets/**/*.scss', ['sass']);
  gulp.watch('./src/app/elements/**/*.scss', ['elementSass']);
  gulp.watch('./src/app/sprites/**/*.svg', ['svgstore']);
  gulp.watch('./src/app/images/**/*.', ['images']);
};
