var gulp = require('gulp');
var pkg = require('./package.json');
var $ = require('gulp-load-plugins')();
var vendors = Object.keys(require('./bower.json').dependencies).map(function(dependency){
    return './bower_components/' + dependency + '/' + dependency + '.min.js'
});
var paths = {
    DEPLOYMENT_FOLDER: 'deployment_alt',
    TEMP_FOLDER: '.tmp',
    SRC_FOLDER: 'app',
    CSS: {
        BOOTSTRAP: './bower_components/bootstrap/dist/css/bootstrap.min.css'
    },
    INDEX_INJECH_HTML: './index-inject-alt.html'
};
gulp.task('clean', function () {
    return gulp.src([paths.DEPLOYMENT_FOLDER, paths.TEMP_FOLDER])
        .pipe($.clean());
});

gulp.task('compile:js', function () {
    return gulp.src(paths.SRC_FOLDER + '/**/*.html')
        .pipe($.angularTemplatecache({
            root: paths.SRC_FOLDER,
            module: pkg.name + '.templates'
        }))
        .pipe($.addSrc([paths.SRC_FOLDER + '/**/*.js', '!'+paths.SRC_FOLDER + '/**/*.spec.js']))
        .pipe($.ngAnnotate())
        .pipe($.concat('all.js'))
        .pipe($.uglify())
        .pipe(gulp.dest(paths.TEMP_FOLDER + '/js'));
});

gulp.task('compile:vendor_js', function () {
    return gulp.src(vendors)
        .pipe($.concat('vendors.js'))
        .pipe(gulp.dest(paths.TEMP_FOLDER + '/js'));
});

gulp.task('compile:styles', function() {
    return gulp.src(paths.SRC_FOLDER + '/**/*.scss')
        .pipe($.sass({
            'sourceComments': false,
            'errLogToConsole': true,
            'outputStyle': 'expanded',
            'precision': 10
        }))
        .pipe($.cssnano({
            compatibility: 'ie8',
            zindex: false
        }))
        .pipe($.addSrc(paths.CSS.BOOTSTRAP))
        .pipe($.concat('styles.min.css'))
        .pipe(gulp.dest(paths.TEMP_FOLDER));

});

gulp.task('compile:html', function () {
    return gulp.src(paths.INDEX_INJECH_HTML)
        .pipe($.processhtml({commentMarker: 'process', process: true}))
        .pipe($.inlineSource())
        .pipe($.rename('index.html'))
        .pipe(gulp.dest(paths.DEPLOYMENT_FOLDER));
});

gulp.task('build',['compile:js', 'compile:styles', 'compile:vendor_js'], function () {
    return gulp.start('compile:html');
});

gulp.task('default',['clean'], function () {
    return gulp.start('build');
});
