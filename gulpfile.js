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

gulp.task('html-task',function(){
    gulp.src(['html/**/*.html'], {read : true})
    .pipe(plumber())
    .pipe(gulp.dest('exports/'))
});

gulp.task('js-task',function(){
    gulp.src(['js/**/*.js'], {read : true})
    .pipe(plumber())
    .pipe(gulp.dest('exports/js'))
});

gulp.task('css-task',function(){
    gulp.src(['css/**/*.css'], {read : true})
    .pipe(plumber())
    .pipe(gulp.dest('exports/css'))
});

gulp.task('img-task',function(){
    gulp.src(['data/**/*.png'], {read : true})
    .pipe(plumber())
    .pipe(gulp.dest('exports/data'))

    gulp.src(['data/**/*.jpg'], {read : true})
    .pipe(plumber())
    .pipe(gulp.dest('exports/data'))
});

gulp.task('lib-task',function(){
    gulp.src(['script/**/*.js'], {read : true})
    .pipe(plumber())
    .pipe(gulp.dest('exports/script'))

    gulp.src(['plugin/**/*.js'], {read : true})
    .pipe(plumber())
    .pipe(gulp.dest('exports/plugin'))
});

gulp.task('watch',function(){
  gulp.watch('html/**/*.html',["html-task"]);
  gulp.watch('js/**/*.js',["js-task"]);
  gulp.watch('ccs/**/*.css',["css-task"]);
  gulp.watch('data/**/*.png',["img-task"]);
  gulp.watch('data/**/*.jpg',["img-task"]);
  gulp.watch('script/**/*.js',["lib-task"]);
  gulp.watch('plugin/**/*.js',["lib-task"]);
});

gulp.task('default', ['all', 'serve', 'watch']);

gulp.task('all', ['html-task', 'js-task', 'css-task', 'img-task', 'lib-task']);
