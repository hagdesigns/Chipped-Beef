var gulp 	     = 	require('gulp'),
	concat 	     =	require('gulp-concat'),
	uglify 	     =	require('gulp-uglify'),
	rename 	     = 	require('gulp-rename'),
	notify 	     =	require('gulp-notify'),
  minifyCSS    =  require('gulp-minify-css'),
	less 	       = 	require('gulp-less');

gulp.task('default', ['less', 'css']);

var paths = {
  less: ['public/less/*.less']
};

gulp.task('scripts', function() {
  return gulp.src(['public/js/main.js'])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('public/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
    .pipe(notify({ message: 'JS processed successfully!' }));
});

gulp.task('less', function () {
  return gulp.src('public/less/main.less')
    .pipe(less({
      paths: [ './' ]
    }))
    .pipe(gulp.dest('public/css-build'))
    .pipe(notify({ message: 'LESS processed successfully!' }));
});

gulp.task('css', function() {
  return gulp.src(['public/css-build/main.css'])
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('public/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest('public/css'))
    .pipe(notify({ message: 'Stylesheets processed successfully!' }));
});

gulp.task('watch', function() {
  gulp.watch(paths.less, ['less', 'css']);
});