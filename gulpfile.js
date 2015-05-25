var gulp        = require('gulp')
  , plugins     = require('gulp-load-plugins')()
  , utils       = plugins.loadUtils(['log', 'colors'])
  , paths       = require('./gulp.config.json')
  , jeet        = require('jeet')
  , rupture     = require('rupture')
  , browserSync = require('browser-sync')
  , reload      = browserSync.reload;

gulp.task('nodemon', function(cb) {
  var called = false;

  plugins.nodemon({
    script: './build/backend/app.js'
  }).on('start', function () {
    if (!called) { cb(); }
    called = true;
  });
});

gulp.task('stylus', function() {
  gulp.src(paths.src.stylus)
  .pipe(plugins.stylus({
    use: [jeet(), rupture()],
    compress: true
  }))
  .pipe(plugins.autoprefixer('last 5 version'))
  .pipe(gulp.dest(paths.build.stylus))
  .pipe(browserSync.reload({stream: true}));
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

gulp.task('root', function() {
  utils.log(utils.colors.black.bgGreen('Root'));

  gulp.src(paths.src.root)
    .pipe(gulp.dest(paths.build.root));
});

gulp.task('b-s', ['nodemon'], function() {
  browserSync({
    files: ['./build/frontend/**/*'],
    proxy: 'http://localhost:3000',
    open: false,
    ghostMode: false
  });

  gulp.watch(paths.src.vendorjs, ['vendorjs']);
  gulp.watch(paths.src.app, ['app']);
  gulp.watch(paths.src.appjs, ['appjs']);
  gulp.watch(paths.src.backend, ['backend']);
});

gulp.task('build', ['backend', 'vendorjs', 'stylus', 'app', 'root'])

gulp.task('default', ['backend', 'vendorjs', 'stylus', 'app', 'appjs', 'root', 'b-s']);