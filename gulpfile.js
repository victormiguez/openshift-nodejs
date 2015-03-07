var gulp        = require('gulp')
  , plugins     = require('gulp-load-plugins')()
  , utils       = plugins.loadUtils(['log', 'colors'])
  , paths       = require('./gulp.config.json')
  , browserSync = require('browser-sync')
  , reload      = browserSync.reload;

gulp.task('vendorjs', function() {
  utils.log(utils.colors.black.bgGreen('Vendor JavaScript'));

  gulp.src(paths.src.vendorjs)
    .pipe(plugins.changed(paths.build.vendorjs))
    .pipe(gulp.dest(paths.build.vendorjs))
    .pipe(reload({stream: true}));
});

gulp.task('app', function() {
  utils.log(utils.colors.black.bgGreen('App'));

  gulp.src(paths.src.app)
    .pipe(plugins.changed(paths.build.app))
    .pipe(plugins.ngAnnotate({
      add: true,
      single_quotes: true
    }))
    .pipe(gulp.dest(paths.build.app))
    .pipe(reload({stream: true}));
});

gulp.task('default', ['vendorjs', 'app', 'b-s']);