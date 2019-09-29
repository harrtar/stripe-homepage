'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css'); 
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();

function style() {
	  return gulp.src('./rawstyles/*.css')
	    .pipe(sourcemaps.init())
        .pipe(autoprefixer())
	    .pipe(concat('styles.css'))
	    .pipe(sourcemaps.write('.'))
	    .pipe(browserSync.stream())
	    .pipe(gulp.dest('./css'));
}

function watch() {
	  browserSync.init({
		      server: {
			            baseDir: './'
			          }
		    });
	  gulp.watch('./rawstyles/*.css', style);
	  gulp.watch('./img/**/*', minimg);
      gulp.watch('./css/*.css',mincss);
      gulp.watch('./*.html', minhtml);
	  gulp.watch('./*.html').on('change', browserSync.reload);
}

function minimg() {
	  return gulp.src('./img/*')
	    .pipe(imagemin())
	    .pipe(gulp.dest('./dist/img'));
}

function mincss() {
    return gulp.src('./css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/css'));
} 

function minhtml() {
    return gulp.src('./*.html')
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
        }))
        .pipe(gulp.dest('./dist'));
}

exports.style = style;
exports.watch = watch;
exports.minimg = minimg;
exports.mincss = mincss;
exports.minhtml = minhtml;

