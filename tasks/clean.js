'use strict';

const
    _ = require('gulp-load-plugins')(),
    del = require('del');

module.exports = function(options) {
    return function() {
        return del(options.src, { force: true });
    };
};