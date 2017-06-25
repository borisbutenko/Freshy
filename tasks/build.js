'use strict';

const gulp = require('gulp');

module.exports = function() {
    return gulp.series('clean',
        gulp.parallel('pug', 'styles', 'scripts', 'assets')
    );
};