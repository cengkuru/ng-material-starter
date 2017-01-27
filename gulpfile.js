var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    rename      = require('gulp-rename'),
    cssmin      = require('gulp-clean-css'),
    sourcemaps  = require('gulp-sourcemaps');
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    jshint      = require('gulp-jshint'),
    scsslint    = require('gulp-sass-lint'),
    cache       = require('gulp-cached'),
    prefix      = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    minifyHTML  = require('gulp-minify-html'),
    size        = require('gulp-size'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    plumber     = require('gulp-plumber'),
    deploy      = require('gulp-gh-pages'),
    changed     = require('gulp-changed'),
    stripDebug  = require('gulp-strip-debug'),
    gutil       = require('gulp-util'),
    notify      = require('gulp-notify');

var bases = {
    app: 'public/src/',
    build: 'public/build/',
    bower: 'public/components/'
};

var paths = {
    scripts: ['js/**/*.js'],
    styles: ['css/**/*.css'],
    sass: ['css/**/*.scss'],
    index: ['*.html'],
    html: ['views/*.html'],
    partials: ['views/partials/*.html'],
    images: ['images/**/*'],
    views: ['views/**/*'],
    extras: ['robots.txt', 'favicon.ico'],
};


// minify index
gulp.task('indexpage', function() {
    var htmlSrc = bases.app +paths.index,
        htmlDst = bases.build;

    gulp.src(htmlSrc)
        .pipe(changed(htmlDst))
        .pipe(minifyHTML())
        .pipe(gulp.dest(htmlDst))
        .on('error', gutil.log);
});


// minify new images
gulp.task('imagemin', function() {
    var imgSrc = bases.app + paths.images,
        imgDst = bases.build +'./images';

    gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest(imgDst))
        .on('error', gutil.log);
});



// minify views
gulp.task('viewshtml', function() {
    var htmlSrc = bases.app +paths.html,
        htmlDst = bases.build+'views/';

    gulp.src(htmlSrc)
        .pipe(changed(htmlDst))
        .pipe(minifyHTML())
        .pipe(gulp.dest(htmlDst))
        .on('error', gutil.log);
});

// minify partial views
gulp.task('partialshtml', function() {
    var htmlSrc = bases.app +paths.partials,
        htmlDst = bases.build+'views/partials/';

    gulp.src(htmlSrc)
        .pipe(changed(htmlDst))
        .pipe(minifyHTML())
        .pipe(gulp.dest(htmlDst))
        .on('error', gutil.log);
});


// JS concat, strip debugging and minify
gulp.task('scripts', function() {
    gulp.src([
        bases.app  +'js/app.js',

            // Controllers
            bases.app  +'js/controllers/MainCtrl.js',
            bases.app  +'js/controllers/HomeCtrl.js',
            bases.app  +'js/controllers/LoginCtrl.js',

            // Services
            bases.app  +'js/services/AuthService.js',
            bases.app  +'js/services/UserService.js'
    ])
        .pipe(concat('script.js'))
        //.pipe(stripDebug())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(bases.build +'js/'))
        .on('error', gutil.log);
});



// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
    gulp.src([bases.app  + paths.styles])
        .pipe(concat('styles.css'))
        .pipe(prefix('last 2 versions'))
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(bases.build +'css/'));
});

// Vendor CSS concat, auto-prefix and minify
gulp.task('vendorstyles', function() {
    gulp.src([
        bases.bower  + 'angular-loading-bar/build/loading-bar.css',
        bases.bower  + 'angular-material/angular-material.min.css',
        bases.bower  + 'angular-toastr/dist/angular-toastr.min.css'
    ])
        .pipe(concat('vendors.css'))
        .pipe(prefix('last 2 versions'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(bases.build +'css/'));
});

// Vendor concat, strip debugging and minify
gulp.task('vendorjs', function() {
    gulp.src([
            bases.bower  +'angular/angular.min.js',
            bases.bower  +'underscore/underscore-min.js',
            bases.bower  +'angular-ui-router/release/angular-ui-router.min.js',
            bases.bower  +'angular-local-storage/dist/angular-local-storage.min.js',
            bases.bower  +'restangular/dist/restangular.min.js',
            bases.bower  +'angular-animate/angular-animate.min.js',
            bases.bower  +'angular-aria/angular-aria.min.js',
            bases.bower  +'angular-messages/angular-messages.min.js',
            bases.bower  +'angular-material/angular-material.min.js',
            bases.bower  +'angular-loading-bar/build/loading-bar.min.js',
            bases.bower  +'restangular/dist/restangular.min.js',
            bases.bower  +'angular-material-icons/angular-material-icons.min.js',
            bases.bower  +'angular-toastr/dist/angular-toastr.tpls.min.js'
        ])
        .pipe(concat('vendors.js'))
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(bases.build +'js/'))
        .on('error', gutil.log);
});

// Convert sass to css
gulp.task('sass', function () {
    return gulp.src(bases.app+paths.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(size({ gzip: true, showFiles: true }))
        .pipe(gulp.dest(bases.app +'css/'))
        .pipe(reload({stream:true}))
        .on('error', gutil.log);
});

gulp.task('jshint', function() {
    gulp.src(bases.app+paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .on('error', gutil.log);
});




// default gulp task
gulp.task('default', ['imagemin','indexpage', 'vendorjs', 'scripts','jshint', 'sass','styles','vendorstyles','viewshtml','partialshtml'], function() {

    // watch for HTML changes
    gulp.watch(bases.app +paths.index, function() {
        gulp.run('indexpage');
    });

    // watch for views changes
    gulp.watch(bases.app+paths.html, function() {
        gulp.run('viewshtml');
    });

    // watch for partial view changes
    gulp.watch(bases.app+paths.partials, function() {
        gulp.run('partialshtml');
    });

    // watch for Vendor changes 0781569411
    gulp.watch(bases.bower, function() {
        gulp.run('vendorjs');
    });

    // watch for JS changes
    gulp.watch(bases.app+paths.scripts, function() {
        gulp.run('scripts');
    });

    // watch for CSS changes
    gulp.watch(bases.app+paths.styles, function() {
        gulp.run('styles','vendorstyles');
    });

    // watch sass for changes
    gulp.watch(bases.app+paths.sass, function(){
        gulp.run('sass');
    });
});
