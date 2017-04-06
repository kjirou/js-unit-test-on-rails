const gulp = require('gulp');
const gulpRemoteSrc = require('gulp-remote-src');
const gulpRename = require('gulp-rename');
const path = require('path');
const urlModule = require('url');


const ROOT = __dirname;
const CLIENT_ROOT = path.join(ROOT, 'client');
const CLIENT_SPEC_ROOT = path.join(CLIENT_ROOT, 'spec');
const CLIENT_SPEC_BUILT_ROOT = path.join(CLIENT_SPEC_ROOT, 'built');
const PUBLIC_ROOT = path.join(ROOT, 'public');
const PUBLIC_ASSETS_ROOT = path.join(PUBLIC_ROOT, 'assets');


/**
 * application-{digest}.js を application.js にリネームしつつ別ディレクトリへコピーする
 *
 * 具体的には、Rails の世界である /public/assets/application-{digest}.js から、
 * 今回、JS のテスト対象ファイルを置くことにした、/client/spec/built/application.js へコピーする。
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

/**
 * 起動中の ca_web の Web サーバから application.js をテスト対象として所定位置へダウンロードする
 */
gulp.task('copy-application-js-from-server', function() {
  // TODO: URL を変更したい場合は、RAILS_ENV と同じように環境変数で受け取れるようにするのが良いと思う
  const applicationJsUrl = 'http://localhost:3000/assets/application.js';
  const applicationJsFileName = path.basename(urlModule.parse(applicationJsUrl).pathname);
  // これは "/path/to/application.js" を "/path/to" に変換している
  const applicationJsBasePath = applicationJsUrl.slice(0, applicationJsUrl.indexOf(applicationJsFileName));

  return new Promise(resolve => {
    gulpRemoteSrc([applicationJsFileName], { base: applicationJsBasePath })
      .pipe(gulpRename({ basename: 'application' }))
      .pipe(gulp.dest(CLIENT_SPEC_BUILT_ROOT))
      .on('end', function() {
        resolve();
      });
  });
});
