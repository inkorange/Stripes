var gulp = require('gulp');
var replace = require('gulp-token-replace');
var sass = require('gulp-sass');
var git = require('git-rev');
var del = require('del');
var svgmin = require('gulp-svgmin');
var path = require('path');
var inject = require('gulp-inject');
var BUILD_ENV = require('../config').defaultEnv;
var BUILD_CLIENT = require('../config').defaultClient;
var markupconfig = require('../config').markup;
var vendorconfig = require('../config').vendor;
var modelconfig = require('../config').model;
var icoconfig =  require('../config').ico;
var resourcesconfig = require('../config').resources;
var imgconfig =  require('../config').images;
var versionconfig =  require('../config').version;
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

            gulp.src(icoconfig.src)
                .pipe(gulp.dest(icoconfig.dest)),

            gulp.src(resourcesconfig.src)
                .pipe(gulp.dest(resourcesconfig.dest))
        ];
    },

    vendor: function () {
        console.log('vendor', vendorconfig.src, vendorconfig.dest);
        return gulp.src(vendorconfig.src)
            .pipe(gulp.dest(vendorconfig.dest));
    },
    images: function () {
        console.log('images', imgconfig.src, imgconfig.dest);
        return gulp.src(imgconfig.src)
            .pipe(gulp.dest(imgconfig.dest));
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

