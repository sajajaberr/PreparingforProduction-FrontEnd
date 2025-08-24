import gulp from "gulp";
import shell from "gulp-shell";

gulp.task("build", shell.task("parcel build index.html"));
gulp.task("parcel server", shell.task("parcel index.html"));

gulp.task("unit test", shell.task('mocha "test/shuffle.jsCreate"'));
gulp.task("test", gulp.series("unit test"));
gulp.task("default", gulp.series("build", "parcel server"));

gulp.task("cypress", shell.task("npx cypress run"));

gulp.task("default", gulp.series("build", "parcel server"));
