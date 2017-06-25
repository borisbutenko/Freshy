'use strict';

import gulp from 'gulp';
import newer from 'gulp-newer';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import cached from 'gulp-cached';
import remember from 'gulp-remember';
import webpackStream from 'webpack-stream';
import named from 'vinyl-named';
import path from 'path';
import del from 'del';

gulp.task('scripts', () =>
    gulp.src(['dev/polyfill/*.js', 'dev/utils/methods/*.js', 'dev/utils/functions/*.js', 'dev/base.js'], since('scripts'))
        .pipe(newer('prod'))
        .pipe(cached('scripts'))
        .pipe(remember('scripts'))
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(concat('utils.js'))
        .pipe(gulp.dest('prod'))
        .pipe(uglify())
        .pipe(concat('utils.min.js'))
        .pipe(gulp.dest('prod'))
);

gulp.task('clean', () => del('prod', { force: true }));
gulp.task('watch', () => gulp.watch('dev/**/*.js', gulp.series('scripts')));
gulp.task('build', gulp.series('clean', 'scripts'));
gulp.task('dev', gulp.series('build', 'watch'));

function since(taskName) {
    return {
        since: gulp.lastRun(taskName)
    };
}