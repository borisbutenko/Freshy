'use strict';

const
    _ = require('gulp-load-plugins')(),
    gulp = require('gulp'),
    combiner = require('stream-combiner2').obj;

module.exports = function(options) {
    return function() {
        return combiner(
            gulp.src(options.src/*, { since: gulp.lastRun('scripts') }*/),
            // _.cached('pug'),
            // _.remember('pug'),
            _.pug({
                basedir: '../',
                pretty: true
            }),
            gulp.dest('prod/')
        ).on('error', _.notify.onError(function(err) {
            return {
                title: 'Pug',
                message: err.message
            };
        }));
    };
};