// Default gulpfile.js
// Created 2014-08-28 by Albert Kawmi

// Install following dependencies via command line
// npm install gulp-rename gulp-jshint gulp-concat gulp-uglify gulp-sass gulp-autoprefixer gulp-minify-css gulp-minify-html gulp-imagemin gulp-image-resize --save-dev

// Need to install ImageMagick for the images task to work

// Also will look into https://www.npmjs.org/package/gulp-ssg

// Require modules
var gulp   = require('gulp');						          // http://travismaynard.com/writing/getting-started-with-gulp
var rename = require('../node_modules/gulp-rename'); 				      // https://www.npmjs.org/package/gulp-rename
var jshint = require('../node_modules/gulp-jshint'); 				      // https://www.npmjs.org/package/gulp-jshint/
var concat = require('../node_modules/gulp-concat'); 				      // https://www.npmjs.org/package/gulp-concat/
var uglify = require('../node_modules/gulp-uglify'); 				      // https://www.npmjs.org/package/gulp-uglify/
var sass = require('../node_modules/gulp-sass'); 					        // https://www.npmjs.org/package/gulp-sass/
var prefix = require('../node_modules/gulp-autoprefixer'); 			  // https://www.npmjs.org/package/gulp-autoprefixer/
var minifyCSS = require('../node_modules/gulp-minify-css'); 		  // https://www.npmjs.org/package/gulp-minify-css/
var minifyHTML = require('../node_modules/gulp-minify-html'); 		// https://www.npmjs.org/package/gulp-minify-html/
var imageResize = require('../node_modules/gulp-image-resize'); 	// https://www.npmjs.org/package/gulp-image-resize/

// Concatenate, Lint & Minify JavaScript files
gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('source.js'))
        .pipe(gulp.dest('src/js/concat'))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(rename('source.min.js'))
        .pipe(gulp.dest('www'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        //.pipe(gulp.dest('src/css'))
  		.pipe(prefix('last 3 versions', '> 1%'))
  		.pipe(rename('style.prefix.css'))
    	.pipe(gulp.dest('src/css'))
    	.pipe(minifyCSS())
    	.pipe(rename('style.min.css'))
    	.pipe(gulp.dest('www'));
});

// Minify HTML
gulp.task('html', function() {
    var opts = {
    	empty:true,
    	cdata:true,
    	comments:false,
    	conditionals:true,
    	spare:true,
    	quotes:true
    };

  gulp.src('src/html/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('www'));
});

// NOT IN DEFAULT TASK - run this task separately with: $ gulp images
// Resize images
gulp.task('images', function () {
  gulp.src('src/images/*')
    .pipe(imageResize({ 
      width : 1300,
      //height : 100,
      upscale : false, // Only shrink, don't stretch images
      crop : false,
      gravity : 'Center',
      quality : 0.3,
      upscale : false,
      //format : '?',
      imageMagick : true
    }))
    .pipe(gulp.dest('www/images'));
});

// NOT IN DEFAULT TASK - run separately with: $ gulp watch
// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/html/*.html', ['html']);
});

// Default Task
gulp.task('default', ['scripts', 'sass', 'html']);