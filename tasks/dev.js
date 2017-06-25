'use strict';

const gulp = require('gulp');

module.exports = function() {
    return gulp.series('build', gulp.parallel('watch', 'serve'));
};