
/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var gulp   = require('gulp');
var config = require('../config');

module.exports = function() {
  gulp.watch(config.markup.src, ['markup']);
  gulp.watch('./src/**/*.js', ['build']);
  gulp.watch('./www/app.jsx', ['build']);
  gulp.watch('./www/stylesheets/**/*.scss', ['sass']);
};
