
let projectFolder       = 'dist';
let sourceFolder        = 'src';
let {src, dest}         = require('gulp'),
    webp                =require('webp-converter');
    gulp                = require('gulp'),
    browsersync         = require('browser-sync').create(),
    fileinclude         = require('gulp-file-include'),
    del                 = require('del'),
    scss                = require('gulp-sass'),
    autoprefixer        = require('gulp-autoprefixer'),
    cleanCss            = require('gulp-clean-css'),
    rename              = require('gulp-rename'),
    uglify              = require('gulp-uglify-es').default,
    imagemin            = require('gulp-imagemin'),
    webp                = require('gulp-webp'),
    webphtml            = require('gulp-webp-html');

let path = {
    build: {
        html: projectFolder + '/',
        css: projectFolder + '/css/',
        js: projectFolder + '/js/',
        img: projectFolder + '/img/',
        fonts: projectFolder + '/fonts/',
    },
    src: {
        html: [sourceFolder + '/*.html', '!'+sourceFolder + '/_*.html'],
        css: sourceFolder + '/scss/style.scss',
        js: sourceFolder + '/js/script.js',
        jslibs: [sourceFolder + '/js/**/*.js', '!'+sourceFolder + '/js/script.js'],
        img: sourceFolder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
        fonts: sourceFolder + '/fonts/*.ttf',
    },
    watch: {
        html: sourceFolder + '/**/*.html',
        css: sourceFolder + '/scss/**/*.scss',
        js: sourceFolder + '/js/**/*.js',
        img: sourceFolder + '/img/**/*.{jpg,png,svg,gif,ico,webp}'
    },
    clean: './' + projectFolder + '/'
};


function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: './' + projectFolder + '/'
        },
        port: 3000,
        notify: false
    })
}

function html() {
    return src(path.src.html)
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function images() {
    return src(path.src.img)
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                interlaced: true,
                optimizationLevel: 3,
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}
function jslibs() {
    return src(path.src.jslibs)
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 5 versions'],
            cascade: true
        }))
        .pipe(dest(path.build.css))
        .pipe(cleanCss())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}

function clean(params) {
    return del(path.clean)
}

let build = gulp.series(clean, gulp.parallel(jslibs, js, css, html, images));
let watch = gulp.parallel(build, watchFiles, browserSync);


exports.watch = watch;
exports.images = images;
exports.js = js;
exports.jslibs = jslibs;
exports.build = build;
exports.html = html;
exports.css = css;
exports.default = watch;
