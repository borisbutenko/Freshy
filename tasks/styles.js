'use strict';

const
    _ = require('gulp-load-plugins')(),
    gulp = require('gulp'),
    combiner = require('stream-combiner2').obj;

module.exports = function(options) {
    return function() {
        return combiner(
            gulp.src(options.src/*, { since: gulp.lastRun('scripts') }*/),
            // _.cached('styles'),
            // _.remember('styles'),
            _.stylus({ 'include css': true }),
            _.autoprefixer(),
            // _.cssnano(),
            gulp.dest('prod/assets/styles')
        ).on('error', _.notify.onError(function(err) {
            return {
                title: 'Styles',
                message: err.message
            };
        }));
    };
};