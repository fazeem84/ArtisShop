var gulp = require('gulp'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass')
uglify = require('gulp-uglify');

/**
 *   file list
 **/
var htmlList = ['index.html', 'modules/*/*.html', 'modules/*/*/*.html'],

    vendorJs = ['node_modules/angular/angular.min.js', 'node_modules/angular-ui-router/release/angular-ui-router.min.js', 'js/jquery.min.js', 'js/jquery.scrolly.min.js', 'js/jquery.poptrox.min.js', 'js/skel.min.js', 'js/util.min.js', 'js/respond.min.js'],

    appJs = ['app-main.js', 'app-route.js', 'modules/*.js', 'modules/*/*.js', 'modules/*/*/*.js'],

    cssFiles = ['css/*.css'],

    sassFiles = ['sass/*.scss'];

/**
 * task to compile all HTML files in the project folder
 **/
gulp.task('compile-html', function () {
    gulp.src(htmlList)
        .pipe(connect.reload())
});

/**
 * task to compile all JS files in the project folder
 * outputs the concatinated files to build/script.js
 **/
gulp.task('compile-js', function () {
    gulp.src(vendorJs)
        //.pipe(uglify())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('build'));
    gulp.src(appJs)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('build'))
        .pipe(connect.reload());
});

/**
 * task to compile all CSS files in the project folder
 * outputs the concatinated files to build/style.js
 **/
gulp.task('compile-css', function () {
    gulp.src(sassFiles.concat(cssFiles))
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('build'))
        .pipe(connect.reload())
});

/**
 * task to WATCH all registered files
 **/
gulp.task('watch', function () {
    gulp.watch(htmlList, ['compile-html']);
    gulp.watch(appJs, ['compile-js']);
    gulp.watch(sassFiles, ['compile-css']);
    gulp.watch(cssFiles, ['compile-css']);
});

/**
 * task to start server
 **/
gulp.task('connect', function () {
    connect.server({
        root: '.',
        livereload: true
    })
});

/**
 * default gulp task
 **/
gulp.task('build', ['compile-html', 'compile-js', 'compile-css', 'connect', 'watch']);