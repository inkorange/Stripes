var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var input = ['./src/app/elements/**/*.scss'];
var output = './build/css';
var sassOptions = require('../config').sass;
var rename = require("gulp-rename");

module.exports = function(assetVersion) {
  return gulp
    .src(input)
    // Run Sass on those files
    .pipe(sass(sassOptions))
    .pipe(concat('elementStyles.css'))
    // updating filename to asset Version
    .pipe(rename(function (path) {
      path.basename += "-" + assetVersion;
    }))
    // Write the resulting CSS in the output folder
    .pipe(gulp.dest(output));  
};