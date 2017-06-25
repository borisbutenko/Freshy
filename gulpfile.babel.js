'use strict';

import gulp from 'gulp';

setTask('clean', getTaskPath('clean'), { src: 'prod' });
setTask('styles', getTaskPath('styles'), { src: 'dev/styles/index.styl' });
setTask('scripts', getTaskPath('scripts'), { src: 'dev/scripts/**/*.js' });
setTask('assets', getTaskPath('assets'), { src: 'dev/assets/**/*.*' });
setTask('pug', getTaskPath('pug'), { src: 'dev/templates/pages/index.pug' });
setTask('serve', getTaskPath('serve'), { src: 'prod' });
setTask('build', getTaskPath('build'));
setTask('watch', getTaskPath('watch'));
setTask('dev', getTaskPath('dev'));

function setTask(taskName, path, options) {
    options = options || {};
    options.taskName = taskName;
    gulp.task(taskName, function(callback) {
        let task = require(path).call(this, options);
        return task(callback);
    });
}

function getTaskPath(name) {
    return `./tasks/${name}.js`;
}