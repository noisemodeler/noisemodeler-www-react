var _ = require('lodash');
var del = require('del');
var gulp = require('gulp');
var myth = require('gulp-myth');
var util = require('gulp-util');
var esnext = require('esnext');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var reactify = require('reactify');
var watchify = require('watchify');
var Immutable = require('immutable');
var streamify = require('gulp-streamify');
var browserify = require('browserify');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var less = require('gulp-less');

var paths = {
    js: {
        src: './js/app.jsx',
        dest: 'bundle.js'
    },
    less: {
        all: './less/*.less',
        src: './less/app.less'
    },
    dist: './dist'
};

var browserifyOpts = Immutable.Map({ from: paths.js.src, to: paths.js.dest, dist: paths.dist });
var watchifyOpts = browserifyOpts.set('watch', true);

// ---

gulp.task('default', ['build']);

gulp.task('build', function(cb) {
    runSequence('clean', ['build-css', 'build-js'], cb);
});

gulp.task('watch', function(cb) {
    runSequence('clean', ['watch-less', 'watch-js'], cb);
});

gulp.task('build-js', browserifyTask(browserifyOpts.toJS()));
gulp.task('watch-js', browserifyTask(watchifyOpts.toJS()));

gulp.task('build-css', function () {
    return gulp.src(paths.less.src)
        .pipe(less())
        .pipe(myth({ compress: true }))
        .pipe(rename('bundle.css'))
        .pipe(gulp.dest(paths.dist));
});
gulp.task('watch-less', ['build-css'], function() {
    gulp.watch(paths.less.all, ['build-css']);
});

gulp.task('clean', function(cb) {
    del([paths.dist], cb);
});

gulp.task('browser-sync', ['watch'], function() {
    browserSync({
        files: ["**/*.css", "**/*.js"],
        proxy: "localhost:9999"
    });
});

// ---

function browserifyTask(options) {
    options = options || {};

    var src = options.from;
    var dest = options.to;
    var dist = options.dist;
    var watch = options.watch || false;

    return function() {
        var bundler = browserify({
            cache: {}, packageCache: {}, fullPaths: true,
            entries: [src],
            extensions: ['.jsx'],
            debug: true
        })
        .transform(reactify)
        .transform(esnext);

        if (watch) {
            bundler = watchify(bundler)
            .on("update", bundle)
            .on("log", function(message) {
                util.log("Browserify:", message);
            });
        }

        return bundle();

        function bundle() {
            return bundler.bundle()
                .on("error", function(error) {
                    util.log(util.colors.red("Error: "), error);
                })
                .on("end", function() {
                    util.log("Created:", util.colors.cyan(dest));
                })
                .pipe(source(dest))
                // .pipe(streamify(uglify()))
                .pipe(gulp.dest(dist));
        }

    };
}

