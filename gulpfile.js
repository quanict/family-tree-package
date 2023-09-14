const gulp = require("gulp");
const sass = require('gulp-sass')(require('node-sass'));
const  concat = require("gulp-concat");
const gutil = require("gulp-util");

const assetPath = 'resources/assets/';
//const gitPublicResource = 'assets/';
Array.prototype.toRealdPath = function () {
    var array =[];
    this.forEach((filename) => {
        if (filename.includes(assetPath)) {
            array.push(filename);
        } else {
            const ext = filename.split('.').pop();

            if (filename.substr(0, ext.length) === ext) {
                array.push(`${assetPath}/${filename}`);
            } else {
                switch (ext) {
                    case 'js':
                        array.push(`${assetPath}/scripts/${filename}`);break;
                }

            }
        }
    });
    return array;
}
// Minifies SCSS
gulp.task("sass", function() {
    return gulp.src(assetPath+'scss/*.scss') // Gets all files ending with .scss in app/scss and children dirs
        // .pipe(uglify({mangle: false}))
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        //.pipe(sass({outputStyle: 'compressed'}))
        .pipe(concat(`styles.css`))
        .pipe(sass())
        .pipe(gulp.dest(`${assetPath}/../public/css`));
});
gulp.task("css", gulp.series('sass'), () => {});
gulp.task('css:watch', function () {
    gulp.watch(
        [
            `./${assetPath}scss/*.scss`,
            `./${assetPath}scss/*/*.scss`,
            `./${assetPath}scss/*/*/*.scss`,
        ],
        gulp.series('sass')
    );
});

gulp.task('watch', gulp.series(['css',]));
gulp.task("default", gulp.series('sass'), () => {});