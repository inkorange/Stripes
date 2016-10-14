var gulp = require('gulp');
var sass = require('gulp-sass');
var input = './src/app/stylesheets/main.scss';
var output = './build/css';
var sassOptions = require('../config').sass;
var rename = require("gulp-rename");

module.exports = (assetVersion) => {
  console.log('I will need to append ' +  assetVersion + ' to these built assets.');
  return gulp
    // Find all `.scss` files from the `input` folder
    .src(input)
    // Run Sass on those files
    .pipe(sass(sassOptions))
    // updating filename to asset Version
    .pipe(rename(function (path) {
      path.basename += "-" + assetVersion;
    }))
    // Write the resulting CSS in the output folder
    .pipe(gulp.dest(output))
};