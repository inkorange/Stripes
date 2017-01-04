var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('babel', () => {
    return gulp.src('./src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('lib'));
});
/*
gulp.task('webpack', ['test'], function(callback) {
    var myConfig = Object.create(webpackConfig);
    myConfig.plugins = [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ];

    // run webpack
    webpack(myConfig, function(err, stats) {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            colors: true,
            progress: true
        }));
        callback();
    });
});
    */