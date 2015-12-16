var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss'],
  css: ['./src/css/**/*.css'],
  scripts: [
    './src/js/**/*.js',
    '!./src/js/lib/ng-img-crop-customized/ng-img-crop.js',   /* exclude ng-img-crop.js: handled separately */
    '!./src/js/lib/ng-img-crop-customized/ng-img-crop.min.js',   /* exclude ng-img-crop.min.js: handled separately */
    '!./src/js/config/config.js'   /* exclude config.js: handled separately */
  ],
  images: ['./src/img/**/*'],
  templates: ['./src/js/**/*.html'],
  indexTemplate: ['./src/index-template.html'],
  index: ['./src/index.html'],
  locales: [
    './src/js/locales/*.json'
  ],
  dist: ['./www']
};

var files = {
  jsbundle: 'app.bundle.min.js',
  appcss: 'app.css',
  ionicappmincss: 'ionic.app.min.css',
  ionicbundle: 'ionic.bundle.min.js'    // change to 'ionic.bundle.js' for debugging moduleErr errors
};


gulp.task('default', ['sass','watch']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch('www/js/**/*.js', ['uglify','reload'], function(event){
      console.log('event.type:'+event.type); //变化类型 added为新增,deleted为删除，changed为改变
      console.log('event.path:'+event.path); //变化的文件的路径
  });
});

gulp.task('html', function () {
  gulp.src('./www/templates/*.html')
    .pipe(connect.reload());
});

gulp.task('scripts', function() {
  return gulp.src('javascripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('all.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('assets'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('uglify',function(){
  //do something
});
gulp.task('reload',function(){
  //do something
});
//gulp.watch('js/**/*.js', ['uglify','reload']);
