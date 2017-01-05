var gulp = require('gulp');
var replace = require('gulp-token-replace');
var git = require('git-rev');
var del = require('del');
var path = require('path');
var inject = require('gulp-inject');
var markupconfig = require('../config').markup;
var vendorconfig = require('../config').vendor;
var modelconfig = require('../config').model;
var fontconfig = require('../config').font;
var staticmock =  require('../config').staticmock;

module.exports = {

    clean: () => {
        return gulp.task('clean', function(cb) {
            del([markupconfig.dest + '/*']).then(paths => {
                setTimeout(function() {
                    console.log('Deleted files and folders:\n', paths.join('\n'));
                    cb(null);
                },5000);
            });
        });
    },

    markup: (assetVersion) => {
        return [
            gulp.src(markupconfig.src)
                .pipe(replace({global: {
                    version:assetVersion
                }}))
                .pipe(gulp.dest(markupconfig.dest)),

            gulp.src(fontconfig.src)
                .pipe(gulp.dest(fontconfig.dest))
        ];
    },

    vendor: function () {
        console.log('vendor', vendorconfig.src, vendorconfig.dest);
        return gulp.src(vendorconfig.src)
            .pipe(gulp.dest(vendorconfig.dest));
    },
    model: function() {
        console.log('models', modelconfig.src, modelconfig.dest);
        return gulp.src(modelconfig.src)
            .pipe(gulp.dest(modelconfig.dest));
    },
    staticmock: function() {
        console.log('Seeding Static Assets for MOCK', staticmock.src, staticmock.dest);
        return gulp.src(staticmock.src)
            .pipe(gulp.dest(staticmock.dest));
    }
}

