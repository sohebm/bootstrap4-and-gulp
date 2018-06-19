'use strict';
let gulp = require('gulp');
let browserSync =  require('browser-sync').create();
let htmlmin = require('gulp-htmlmin');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');

gulp.task('browser-sync', ['styles', 'scripts', 'html'], () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/css/*.scss', ['styles']);
    gulp.watch('src/js/*.js', ['scripts']);
});

gulp.task('html', () => {
    return gulp.src('./src/*.html')
    .pipe(htmlmin({
        collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('styles', () => {
    return gulp.src('./src/css/*.scss')
    .pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', () => {
    return gulp.src([
        './node_modules/jquery/dist/jquery.js', 
        './node_modules/bootstrap/dist/js/bootstrap.js',
        './src/js/main.js'
    ])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['browser-sync']);
