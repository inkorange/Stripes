
/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var gulp   = require('gulp');
var config = require('../config');

module.exports = function() {
  gulp.watch(config.markup.src, ['markup']);
  gulp.watch('./src/**/*.js', ['browserify']);
  gulp.watch('./www/app.jsx', ['build']);
};
