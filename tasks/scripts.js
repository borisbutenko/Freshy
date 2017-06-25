'use strict';

const
    _ = require('gulp-load-plugins')(),
    gulp = require('gulp'),
    combiner = require('stream-combiner2').obj;

module.exports = function(options) {
    return function() {
        return combiner(
            gulp.src(options.src, { since: gulp.lastRun('scripts') }),
            _.cached('scripts'),
            _.remember('scripts'),
            _.babel({ presets: ['env'] }),
            _.uglify(),
            gulp.dest('prod/assets/scripts')
        ).on('error', _.notify.onError(function(err) {
            return {
                title: 'Scripts',
                message: err.message
            };
        }));
    };
};