// eslint esversion: 6
var gulp = require('gulp');
// var watch = require('gulp-watch');
var shell = require('gulp-shell');

var sass = require('gulp-sass');

var concat = require('gulp-concat');

var paths = {
	src: [
		'./models/**/*.js', './routes/**/*.js', 'keystone.js', 'package.json',
	],
	style: {
		all: './public/styles/**/*.scss',
		output: './public/styles/',
	},
	js: {
		bower: [
			'./bower_components/jquery/dist/jquery.min.js',
			'./bower_components/bootstrap/dist/bootstrap.js',
			'./bower_components/typed.js/dist/typed.min.js',
		],
		coded: [
		],
		output: './public/js/',
	},

};

gulp.task('watch:sass', function () {
	gulp.watch(paths.style.all, ['sass']);
});

gulp.task('sass', function () {
	gulp.src(paths.style.all).pipe(sass().on('error', sass.logError)).pipe(gulp.dest(paths.style.output));
});

gulp.task('js', ['js:external']);

gulp.task('js:external', function () {
	console.log(paths.js.output);
	gulp.src(paths.js.bower)
		.pipe(concat('external.min.js'))
		.pipe(gulp.dest(paths.js.output));
});

gulp.task('runKeystone', shell.task('node keystone.js'));
gulp.task('watch', ['watch:sass']);

gulp.task('default', ['watch', 'runKeystone']);
