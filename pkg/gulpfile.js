var gulp = require('gulp');
var git = require('git-rev');
var babel = require('gulp-babel');

var sass = require('./gulp/tasks/sass.js');
var browserify = require('./gulp/tasks/browserify.js');
var markup = require('./gulp/tasks/markup.js');
var webserver = require('./gulp/tasks/server.js');
var watch = require('./gulp/tasks/watch.js');
var del = require('del');

var markupconfig = require('./gulp/config.js').markup;

gulp.task('babel', () => {
    return gulp.src('./src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('lib'));
});
gulp.task('movepackage', () => {
    return gulp.src('./package.json')
        .pipe(gulp.dest('lib'));
});

/* ************************************************* */

var getAssetVersion = function(cb) {
    git.short(function (short) {
        console.log('running getAssetVersion callback........');
        cb(short);
    });
};

gulp.task('sass', () => { getAssetVersion(sass) });
gulp.task('browserify', browserify);
gulp.task('markup', markup.markup);
gulp.task('vendor', markup.vendor);
gulp.task('webserver', webserver);
gulp.task('watch', watch);


gulp.task('clean', function(cb) {
    del([markupconfig.dest + '/*']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
        cb(null);
    });
});

gulp.task('buildaction', ['clean'], (cb) => {
    getAssetVersion(markup.markup);
    getAssetVersion(sass);
    getAssetVersion(browserify);
    cb();
});

gulp.task('build', ['clean', 'buildaction']);
gulp.task('default', ['webserver', 'watch']);
gulp.task('buildandrun', ['build', 'default']);
gulp.task('buildpack', ['babel', 'movepackage']);
