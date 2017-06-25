'use strict';

const
    _ = require('gulp-load-plugins')(),
    gulp = require('gulp'),
    combiner = require('stream-combiner2').obj;

module.exports = function(options) {
    return function() {
        return combiner(
            gulp.src(options.src, { since: gulp.lastRun('assets') }),
            gulp.dest('prod/assets')
        ).on('error', _.notify.onError(function(err) {
            return {
                title: 'Styles',
                message: err.message
            };
        }));
    };
};