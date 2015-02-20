var gulp = require("gulp"),
    _ = require("lodash"),
    gutil = require("gulp-util"),
    del = require('del'),
    open = require("open"),
    runSequence = require('run-sequence'),
    webpack = require("webpack"),
    WebpackDevServer = require("webpack-dev-server"),
    webpackConfig = require("./webpack.config.js");

var devCompiler = webpack(webpackConfig),
    host = 'localhost',
    port = 8085;

gulp.task("default", ["webpack-dev-server"]);
gulp.task("build", ["webpack:build"], function () {
  gulp.watch(["app/**/*"], ["webpack:build"]);
});

gulp.task("clean", function (cb) {
  del(['build/**/*'], cb);
});

gulp.task("copy-src", function () {
  gulp.src(['src/**/*']).pipe(gulp.dest('./build/'))
});

gulp.task("build-all", function (callback) {
  runSequence("clean", ["build"], "copy-src", callback)
});

gulp.task("webpack:build", ['clean'], function(callback) {
  devCompiler.run(function(err, stats) {
    if (err) {
      throw new gutil.PluginError("webpack:build", err);
    }

    gutil.log("[webpack:build-dev]", stats.toString({ colors: true }));
    gulp.src(['!src/js/**', 'src/**/*'])
      .pipe(gulp.dest('./build'));
    callback();
  });
});

gulp.task("webpack-dev-server", ['build-all'], function(callback) {
  var config = _.extend(Object.create(webpackConfig), {
    devtool: "eval",
    debug: true
  });

  config.output.path= "/";

  var server = new WebpackDevServer(webpack(config), {
    publicPath: '/js/',
    contentBase: './build/',
    stats: { colors: true }
  });

  server.listen(port, host, function (err) {
    if (err) {
      throw new gutil.PluginError("webpack-dev-server", err);
    }

    var url = 'http://' + host + ':' + port + '/webpack-dev-server/index.html';
    open(url);
    gutil.log("[webpack-dev-server]", url);
  });
});

