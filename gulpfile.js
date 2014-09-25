var exec = require('child_process').exec,
    gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    connect = require('gulp-connect');

gulp.task('serve', function() {
  return gulp.src("./")
  .pipe(webserver({
      livereload: true
  }));
});

gulp.task('watch',function(){
  gulp.watch('./',function(){
    gulp.pipe(connect.reload());
  });
});

gulp.task('default',
  ['serve',
  'watch']);

