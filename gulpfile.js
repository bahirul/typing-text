const { src, dest, watch } = require('gulp')
const browserSync = require('browser-sync')
const htmlmin = require('gulp-htmlmin')
const sass = require('gulp-sass')(require('sass'))
const uglify = require('gulp-uglify-es').default
const rename = require('gulp-rename')

function sassTak() {
    src("./src/scss/*.scss")
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest("./public"))

    watch("./src/scss/**/*.scss", () => {
        return src("./src/scss/*.scss")
            .pipe(sass({ outputStyle: 'compressed' }))
            .pipe(rename({ suffix: '.min' }))
            .pipe(dest("./public"))
            .pipe(browserSync.stream())
    })
}

function jsTask() {
    src("./src/js/*.js")
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest("./public"))

    watch("./src/js/**/*.js", () => {
        return src("./src/js/*.js")
            .pipe(uglify())
            .pipe(rename({ suffix: '.min' }))
            .pipe(dest("./public"))
    }).on('change', () => {
        browserSync.reload()
    })
}

function htmlTask() {
    src("./src/pages/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest("./public"))

    watch("./src/pages/**/*.html", () => {
        return src("./src/pages/*.html")
            .pipe(htmlmin({ collapseWhitespace: true }))
            .pipe(dest("./public"))
    }).on('change', () => {
        browserSync.reload()
    })
}

function serveTask() {
    sassTak()
    jsTask()
    htmlTask()

    browserSync.init({
        server: "./public"
    })
}


exports.default = serveTask