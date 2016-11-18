var gulp = require('gulp');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');
var inject = require('gulp-inject');
var svgOptions = require('../config').svg;

module.exports = function() {

    var svgs = gulp
        .src(svgOptions.src)
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore({ inlineSvg: true }));

    function fileContents (filePath, file) {
        return file.contents.toString();
    }

    return gulp
        .src(svgOptions.injectSrc)
        .pipe(inject(svgs, { transform: fileContents }))
        .pipe(gulp.dest('./build'));
};
