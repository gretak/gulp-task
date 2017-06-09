'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-minify-css');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var lint = require('./config/sass.js');
const jshint = require('gulp-jshint');


// scripts task
gulp.task('scripts', function() {
  return gulp.src('./src/js/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('js-hint', function () {
  return gulp.src(['./src/js/*.js'])
    .pipe(jshint('./config/.jshintrc'))
    .pipe(jshint.reporter( 'jshint-stylish' ));
});


// styles task
gulp.task('styles', function() {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('lint', function() {
   gulp.src('./src/sass/**.s+(a|c)ss')
    .pipe(lint({
      configFile: './config/scss-lint.yml'
    }))
    .pipe(lint.format())
    .pipe(lint.failOnError())
});

// watch task
gulp.task('watch', function() {
  gulp.watch('./src/js/*.js', ['scripts']);
  gulp.watch('./src/sass/*.scss', ['styles']);
});

//compiles all the gulp tasks together
gulp.task('default', ['scripts', 'styles', 'lint', 'js-hint' ,'watch', ]);

