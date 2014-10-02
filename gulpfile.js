var exec = require('child_process').exec,
    gulp = require('gulp'),
    watch = require('gulp-watch'),
    webserver = require('gulp-webserver'),
    plumber = require('gulp-plumber'),
    connect = require('gulp-connect');


gulp.task('serve', function() {
  return gulp.src('./exports')
  .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('all',function(){
    gulp.src(['html/**/*.html'], {read : true})
    .pipe(plumber())
    .pipe(gulp.dest('exports/'))

    gulp.run("js-task");

    gulp.src(['css/**/*.css'], {read : true})
    .pipe(plumber())
    .pipe(gulp.dest('exports/css'))

    gulp.src(['script/**/*.js'], {read : true})
    .pipe(plumber())
    .pipe(gulp.dest('exports/script'))

    gulp.src(['plugin/**/*.js'], {read : true})
    .pipe(plumber())
    .pipe(gulp.dest('exports/plugin'))

    gulp.src(['data/**/*.jpg'], {read : true})
    .pipe(plumber())
    .pipe(gulp.dest('exports/data'))

    gulp.src(['data/**/*.png'], {read : true})
    .pipe(plumber())
    .pipe(gulp.dest('exports/data'))

});


gulp.task('js-task',function(){
    gulp.src(['js/**/*.js'], {read : true})
    .pipe(plumber())
    .pipe(gulp.dest('exports/js'))
});

gulp.task('watch',function(){
  gulp.watch('js/**/*.js',["js-task"]);
});


gulp.task('default', ['all', 'serve', 'watch']);

