// include gulp
var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var htmlreplace = require('gulp-html-replace');
var clean = require('gulp-clean');

// JS hint task
gulp.task('jshint', function() {
  gulp.src('app/scripts/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

// minify new images
gulp.task('imagemin', function() {
  var imgSrc = 'app/images/*',
      imgDst = 'build/images';

  gulp.src(imgSrc)
      .pipe(changed(imgDst))
      .pipe(imagemin())
      .pipe(gulp.dest(imgDst));
});

// minify new or changed HTML pages
gulp.task('htmlpage', function() {
  var htmlSrc = 'app/*.html',
      htmlDst = 'build';

  
      gulp.src(htmlSrc)
      .pipe(changed(htmlDst))
      .pipe(htmlreplace({       // HTML replace to normalise build html
         'css': 'styles/main.css',
         'js': 'scripts/scripts.js'
      }))
      .pipe(minifyHTML())
      .pipe(gulp.dest(htmlDst));
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src(['app/scripts/*.js'])
      .pipe(concat('scripts.js'))
      .pipe(stripDebug())
      .pipe(uglify({mangle: false}))
      .pipe(gulp.dest('build/scripts/'));
});

// JS concat, strip debugging and minify
gulp.task('files', function() {
  var jsonSrc = 'app/*.json',
      jsonDst = 'build';

  gulp.src(jsonSrc)
      .pipe(changed(jsonSrc))
      .pipe(gulp.dest(jsonDst));

  var localeSrc = 'app/scripts/locale/*.txt',
      localeDst = 'build/scripts/locale',
      tmpSrc  = 'app/templates/*.html',
      tmpDst = 'build/templates';

    gulp.src(localeSrc)
        .pipe(changed(localeSrc))
        .pipe(gulp.dest(localeDst));

    gulp.src(tmpSrc)
        .pipe(changed(tmpSrc))
        .pipe(minifyHTML())
        .pipe(gulp.dest(tmpDst));

});

// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
  gulp.src(['app/styles/*.css'])
      .pipe(concat('main.css'))
      .pipe(autoprefix('last 2 versions'))
      .pipe(minifyCSS())
      .pipe(gulp.dest('build/styles/'));
});

// SASS to compile scss
gulp.task('sass', function () {
  return gulp.src('app/styles/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('app/styles'))
      .pipe(livereload());
});

gulp.task('sass:watch', function () {
  livereload.listen();  
  gulp.watch('app/styles/*.scss', ['sass']);
});

//clean build files
gulp.task('clean-build', function () {
  return gulp.src('build/**/**/*.*', {read: false})
    .pipe(clean());
});

// make build task
gulp.task('build', ['imagemin', 'htmlpage', 'scripts', 'files', 'sass', 'styles'], function() {

  // watch for HTML changes
  gulp.watch('app/*.html', ['htmlpage']);

  // watch for JS changes
  gulp.watch('app/scripts/*.js', ['jshint', 'scripts']);

  // watch for CSS changes
  gulp.watch('app/styles/*.sass', ['sass','styles']);
  
});

// default task >gulp
gulp.task('default', ['clean-build'], function() {

  setTimeout(function () {
    gulp.start('build');
  }, 1000);
  
});