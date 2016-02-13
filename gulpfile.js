var gulp       = require('gulp');
var mocha      = require('gulp-mocha');
var uglify     = require('gulp-uglifyjs');
var concat     = require('gulp-concat');
var exit       = require('gulp-exit');
var minifyCss  = require('gulp-cssnano');
var ejsmin     = require('gulp-ejsmin');

gulp.task('default', ['testEnv'], function () {
  return gulp.src('spec/randomuserTests.js', {read: false})
    .pipe(mocha({require: ['mocha-clean'], reporter: 'nyan'}))
    .pipe(exit());
});

gulp.task('spec', ['testEnv'], function () {
  return gulp.src('spec/randomuserTests.js', {read: false})
    .pipe(mocha({require: ['mocha-clean'], reporter: 'spec'}))
    .pipe(exit());
});

gulp.task('compress', function() {
  return gulp.src(['public/js/jquery.js', 'public/js/*.js'])
    .pipe(uglify('all.js'))
    .pipe(gulp.dest('public/dist/'));
});

gulp.task('css', function() {
  return gulp.src('public/css/*.css')
    .pipe(concat('style.css'))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('public/dist/'));
});

gulp.task('minify-ejs-pages', function() {
  return gulp.src('views/pages/*.ejs')
    .pipe(ejsmin())
    .pipe(gulp.dest('.viewsMin/pages'))
});

gulp.task('minify-ejs-snippets', function() {
  return gulp.src('views/snippets/*.ejs')
    .pipe(ejsmin())
    .pipe(gulp.dest('.viewsMin/snippets'))
});

gulp.task('testEnv', function() {
    return process.env.spec = true;
});

gulp.task('build', ['compress', 'css', 'minify-ejs-pages', 'minify-ejs-snippets']);

gulp.task('start', ['compress', 'css', 'minify-ejs-pages', 'minify-ejs-snippets'], function() {
  require('./server');
});
