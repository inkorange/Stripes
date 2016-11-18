/*
 gulpfile.js
 ===========
 Rather than manage one giant configuration file responsible
 for creating multiple tasks, each task has been broken out into
 its own file in gulp/tasks. Any files in that directory get
 automatically required below.
 To add a new task, simply add a new task file that directory.
 gulp/tasks/default.js specifies the default set of tasks to run
 when you run `gulp`.
 */
var gulp = require('gulp');
var git = require('git-rev');

var sass = require('./gulp/tasks/sass.js');
var elementSass = require('./gulp/tasks/elementSass.js');
var browserify = require('./gulp/tasks/browserify.js');
var markup = require('./gulp/tasks/markup.js');
var svgstore = require('./gulp/tasks/svgsprite.js');
var webserver = require('./gulp/tasks/server.js');
var watch = require('./gulp/tasks/watch.js');
var markupconfig = require('./gulp/config.js').markup;
var del = require('del');


var getGitVersion = function(cb) {
    var gitVersion = "Atlas_";
    git.tag(function (tag) {
        git.short(function (short) {
            gitVersion += tag + "_" + short;
            console.log('running getGitVersion callback........');
            cb(gitVersion);
        });
    });
};

var getAssetVersion = function(cb) {
    git.short(function (short) {
        console.log('running getAssetVersion callback........');
        cb(short);
    });
};

// Require all tasks in gulp/tasks, including subfolders
//requireDir('./gulp/tasks', { recurse: true });
gulp.task('sass', () => { getAssetVersion(sass) });
gulp.task('elementSass', () => { getAssetVersion(elementSass) });
gulp.task('browserify', () => { getAssetVersion(browserify) });

gulp.task('svgstore', svgstore);
gulp.task('markup', () => { getAssetVersion(markup.markup) });


gulp.task('vendor', markup.vendor);
gulp.task('images', markup.images);
gulp.task('model', markup.model);
gulp.task('seed-demo', markup.staticmock);

gulp.task('webserver', webserver);
gulp.task('watch', watch);

gulp.task('default', ['webserver', 'watch']);

gulp.task('clean', function(cb) {
    console.log('CLEAN &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& ');
    del([markupconfig.dest + '/*']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
        cb(null);
    });
});

gulp.task('buildaction', ['clean'], (cb) => {
    console.log('BUILDING &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& ');
    getAssetVersion(markup.markup);
    getAssetVersion(sass);
    getAssetVersion(elementSass);
    getAssetVersion(browserify);
    markup.vendor();
    markup.images();
    markup.model();
    cb();
});
//gulp.task('build', ['markup', 'svgstore', 'sass', 'elementSass', 'browserify', 'vendor', 'images', 'model']);


gulp.task('build', ['clean', 'buildaction'], () => {
    console.log('SVGSTORE &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& ');
    setTimeout(() => {
        svgstore();
    },6000);
});

gulp.task('buildandrun', ['build', 'default']);