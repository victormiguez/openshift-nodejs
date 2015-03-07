var gulp        = require('gulp')
  , plugins     = require('gulp-load-plugins')()
  , utils       = plugins.loadUtils(['log', 'colors'])
  , paths       = require('./gulp.config.json')
  , browserSync = require('browser-sync')
  , reload      = browserSync.reload;

gulp.task('nodemon', function(cb) {
  return plugins.nodemon({
    script: './build/backend/app.js'
  }).on('start', function () {
    cb();
  });
});

gulp.task('backend', function() {
  utils.log(utils.colors.black.bgGreen('Backend'));

  gulp.src(paths.src.backend)
    .pipe(plugins.changed(paths.build.backend))
    .pipe(gulp.dest(paths.build.backend));
});

gulp.task('vendorjs', function() {
  utils.log(utils.colors.black.bgGreen('Vendor JavaScript'));

  gulp.src(paths.src.vendorjs)
    .pipe(plugins.changed(paths.build.vendorjs))
    .pipe(gulp.dest(paths.build.vendorjs))
    .pipe(reload({stream: true}));
});

gulp.task('appjs', function() {
  utils.log(utils.colors.black.bgGreen('App - JS'));

  gulp.src(paths.src.appjs)
    .pipe(plugins.changed(paths.build.app))
    .pipe(plugins.ngAnnotate({
      add: true,
      single_quotes: true
    }))
    .pipe(gulp.dest(paths.build.app))
    .pipe(reload({stream: true}));
});

gulp.task('app', function() {
  utils.log(utils.colors.black.bgGreen('App'));

  gulp.src(paths.src.app)
    .pipe(plugins.changed(paths.build.app))
    .pipe(gulp.dest(paths.build.app))
    .pipe(reload({stream: true}));
});

gulp.task('b-s', ['nodemon'], function() {
  browserSync.init(null, {
    files: ['./build/frontend/**/*'],
    port: 3000,
    open: false
  });

  gulp.watch(paths.src.vendorjs, ['vendorjs']);
  gulp.watch(paths.src.app, ['app']);
  gulp.watch(paths.src.appjs, ['appjs']);
});

gulp.task('default', ['backend', 'vendorjs', 'app', 'appjs', 'b-s']);