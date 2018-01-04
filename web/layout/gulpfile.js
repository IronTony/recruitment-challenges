var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    header  = require('gulp-header'),
    svgmin = require('gulp-svgmin'),
    svgstore = require('gulp-svgstore'),
    package = require('./package.json');


var
  banner = [
    '/*!\n' +
    ' * <%= package.name %>\n' +
    ' * <%= package.title %>\n' +
    ' * <%= package.url %>\n' +
    ' * @author <%= package.author %>\n' +
    ' * @version <%= package.version %>\n' +
    ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
    ' */',
    '\n'
  ].join('');

gulp.task('scss', () => {
  return gulp.src('scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('public/assets/css'))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(header(banner, { package : package }))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest('public/assets/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('icons', () => {
	return gulp.src('assets/svg/*.svg')
		.pipe(svgmin())
		.pipe(svgstore({ inlineSvg: true }))
		.pipe(gulp.dest('public/assets/svg/sprite'))
});

gulp.task('browser-sync', () => {
  browserSync.init(null, {
    server: {
      baseDir: "public"
    }
  });
});

gulp.task('bs-reload', () => {
  browserSync.reload();
});

gulp.task('default', ['scss', 'icons', 'browser-sync'], () => {
  gulp.watch("scss/**/*.scss", ['scss']);
  gulp.watch("assets/**/*", ['icons']);
  gulp.watch("public/*.html", ['bs-reload']);
});
