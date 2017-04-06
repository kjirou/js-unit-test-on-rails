const gulp = require('gulp');
const gulpRename = require('gulp-rename');
const path = require('path');


const ROOT = __dirname;
const CLIENT_ROOT = path.join(ROOT, 'client');
const CLIENT_SPEC_ROOT = path.join(CLIENT_ROOT, 'spec');
const CLIENT_SPEC_BUILT_ROOT = path.join(CLIENT_SPEC_ROOT, 'built');
const PUBLIC_ROOT = path.join(ROOT, 'public');
const PUBLIC_ASSETS_ROOT = path.join(PUBLIC_ROOT, 'assets');


/**
 * application-{digest}.js を application.js にリネームしつつ別ディレクトリへコピーする
 */
gulp.task('copy-application-js-without-digest', function() {
  return gulp
    // /public/assets 下に複数 application-{digest}.js があると最新のファイルを選択できない場合があるが、
    // 今回はそのケースは無視する。
    // gulp-sort などでファイルを時系列に並べるなどすることで解決可能。
    .src(path.join(PUBLIC_ASSETS_ROOT, 'application-*.js'))
    .pipe(gulpRename({ basename: 'application' }))
    .pipe(gulp.dest(CLIENT_SPEC_BUILT_ROOT));
});
