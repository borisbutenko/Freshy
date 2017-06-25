'use strict';

const gulp = require('gulp');

module.exports = function() {
    return function() {
        gulp.watch('dev/styles/**/*.*', gulp.series('styles'));
        gulp.watch('dev/templates/**/*.*', gulp.series('pug'));
        gulp.watch('dev/scripts/**/*.*', gulp.series('scripts'));
        gulp.watch('dev/assets/**/*.*', gulp.series('assets'));
    };
};