function videoTransfer() {
  const flags = require("../config/flags");
  const gulp = require("gulp");
  const paths = require("../../package.json").paths;

  return gulp
    .src(paths.video.src)
    .pipe(
      gulp.dest(flags.proxy ? paths.video.proxyDest : paths.video.staticDest)
    );
}

exports.videoTransfer = videoTransfer;
