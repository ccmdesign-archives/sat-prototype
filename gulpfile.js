var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

// Sass
gulp.task('sass', function () {
  return gulp.src('src/styles/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'})).on('error', sass.logError)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('src/styles'))
});

gulp.task('watch', function () {
  gulp.watch('src/styles/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['watch']);