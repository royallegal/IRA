var gulp     = require('gulp');
var sequence = require('run-sequence');
var map      = require('gulp-sourcemaps');
// CSS
var sass     = require('gulp-sass');
var prefix   = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
// JS
const jqc    = require('gulp-jquery-closure');
const concat = require('gulp-concat');
const minify = require('gulp-minify');


// STAGING
gulp.task('styles', function() {
    return gulp.src('styles/index.scss')
               .pipe(map.init())
               .pipe(sass())
               .pipe(map.write())
               .pipe(gulp.dest('styles/'));
});

gulp.task('scripts', function() {
    return gulp.src('scripts/components/**/*.js')
               .pipe(map.init())
               .pipe(concat('scripts.js'))
               .pipe(map.write())
               .pipe(jqc({
                   $: true,
                   window: false,
                   document: false,
                   undefined: false
               }))
               .pipe(gulp.dest('scripts/'))
});



gulp.task('watch', function() {
    gulp.watch('styles/components/**/*.scss', ['styles']);
    gulp.watch('scripts/components/**/*.js', ['scripts']);
    gulp.watch('documentation/js/**/*.js', ['webpack'])
    gulp.watch('documentation/js/**/*.vue', ['webpack'])
});

gulp.task('default', function(cb) {
    return sequence(['styles', 'scripts','webpack'], 'watch', cb);
});


// PRODUCTION
gulp.task('build-styles', function() {
    return gulp.src('styles/*.css')
               .pipe(cleanCSS({debug: true}, function(details) {
                   console.log(details.name + ': ' + details.stats.originalSize);
                   console.log(details.name + ': ' + details.stats.minifiedSize);
               }))
               .pipe(gulp.dest('styles/'));
});

gulp.task('build-scripts', function() {
    return gulp.src('scripts/components/**/*.js')
               .pipe(concat('accounts.js'))
               .pipe(jqc({
                   $: true,
                   window: false,
                   document: false,
                   undefined: false
               }))
               .pipe(minify({
                   ext:{
                       src: '-debug.js',
                       min: '.js'
                   }
               }))
               .pipe(gulp.dest('scripts/'))
});

gulp.task('build', function(cb) {
    return sequence('build-styles', 'build-scripts', cb);
});
