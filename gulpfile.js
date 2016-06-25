var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('server', function() {
	gulp.src('./')
		.pipe( webserver({
			port: 9000,
			livereload: true,
			directoryListing: true,
			open: 'index.html'
		}));
});

gulp.task('default', ['server']);