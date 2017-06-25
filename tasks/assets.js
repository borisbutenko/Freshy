'use strict';

const
    _ = require('gulp-load-plugins')(),
    gulp = require('gulp'),
    combiner = require('stream-combiner2').obj;

module.exports = function(options) {
    return function() {
        return combiner(
            gulp.src(options.src, { since: gulp.lastRun('assets') }),
            gulp.dest(file => {
                let path = file.path,
                    dir = 'prod/assets';

                if (~path.indexOf('font')) return `${dir}/font`;
                if (~path.indexOf('img')) return `${dir}/img`;
            })
        ).on('error', _.notify.onError(function(err) {
            return {
                title: 'Styles',
                message: err.message
            };
        }));
    };
};