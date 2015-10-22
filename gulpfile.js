var gulp = require("gulp");
var closureCompiler = require('gulp-closure-compiler');
var eslint = require("gulp-eslint");
var mocha = require("gulp-mocha");

var paths = {
    source: "./src/emmet.js",
    production: {
        folder: "./dist/",
        file: "emmet.min.js"
    },
    test: "./test/emmet.js"
};

function swallowError(error) {
    console.error(error.toString());
    this.emit("end");
}

gulp.task("eslint", function () {
    return gulp.src(paths.source)
        .pipe(eslint())
        .on("error", swallowError)
        .pipe(eslint.format())
        .on("error", swallowError);
});

gulp.task("jsmin", function () {
    return gulp.src(paths.source)
        .pipe(closureCompiler({
            compilerPath: "./node_modules/google-closure-compiler/compiler.jar",
            fileName: paths.production.file
        }))
        .on("error", swallowError)
        .pipe(gulp.dest(paths.production.folder));
});

gulp.task("default", ["jsmin", "eslint"], function (done) {
    done();
});

gulp.task("watch", ["default"], function () {
    gulp.watch(paths.source, ["jsmin", "eslint"]);
});

gulp.task("test-filename", function () {
    return gulp
        .src(paths.test)
        .pipe(mocha({
            timeout: 2000,
            useColors: true,
            useInlineDiffs: true
        }))
        .on("error", swallowError)
        .once("end", function () {
            process.exit();
        });
});

gulp.task("test-dev", function () {
    process.env.FILENAME = paths.source;
    gulp.start("test-filename");
});


gulp.task("test", function () {
    process.env.FILENAME = paths.production.folder + paths.production.file;
    gulp.start("test-filename");
});
