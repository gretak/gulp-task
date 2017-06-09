// required package
var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-minify-css');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var lint = require('./config/sass.js');
var jshint = require('gulp-jshint');
var webserver = require('gulp-webserver');
var inject = require('gulp-inject');


// scripts task + lint
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


// styles task + lint
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

//dev server
gulp.task('webserver', function() {
  gulp.src('dist/')
    .pipe(webserver({
      livereload: true,
      fallback: 'index.html', 
      directoryListing: {enable: true, path: '/dist/index.html'},
      open: true,
    }));
});

//copy task
gulp.task('copy', function() {
  gulp.src('index.html', {cwd: './src/'})
  .pipe(gulp.dest('./dist/'));
});

//add paths to index.html
gulp.task('index', function () {
  var target = gulp.src('./dist/index.html')
  var sources = gulp.src(['./dist/css/**.min.css', './dist/js/**.min.js'], {read: false});
  return target.pipe(inject(sources, { ignorePath: 'dist', addRootSlash: false}))
  .pipe(gulp.dest('./dist'));
});

//all gulp tasks
gulp.task('default', ['scripts', 'styles', 'copy' ]);

//testing and dev server running
gulp.task('test', ['lint','js-hint' ,'watch', 'webserver', 'index']);


