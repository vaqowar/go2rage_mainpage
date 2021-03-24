var gulp = require('gulp')
    , rename = require('gulp-rename')
    , sass = require('gulp-sass')
    , autoprefixer = require('gulp-autoprefixer')
    , cleanCss = require('gulp-clean-css')
    , pug = require('gulp-pug')
    , uglify = require('gulp-uglify')
    , imagemin = require('gulp-imagemin')
    , del = require('del')
    , browserSync = require('browser-sync').create();

gulp.task('scss2css', () => {
    return gulp.src('./src/scss/main.scss')
 
        .pipe(sass({
            errorLogToConsole: true
        }))
        .on('error', console.error.bind(console)) 
        .pipe(autoprefixer({
            browsers: ['last 100 versions'],
            cascade: false
        }))

        .pipe( gulp.dest('./src/css/') )
});

gulp.task('min_css', ()=> {
    return gulp.src('./src/css/**')
 
        // .pipe(rename({suffix: '.min'}))
        .pipe(cleanCss({compatibility: "ie8"}))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.stream());    
});

gulp.task('min_js', ()=> {
    return gulp.src('./src/js/**')
        
        // .pipe(rename({suffix: '.min'}))
        .pipe(uglify({toplevel: true}))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(browserSync.stream());    
});

gulp.task('min_img', ()=> {
    return gulp.src('./src/img/**')
        .pipe(imagemin([ 
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 80, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))    

        .pipe(gulp.dest('./dist/img/'))
        .pipe(browserSync.stream());    
});

gulp.task('copy_fonts', ()=> {
    return gulp.src('./src/fonts/**')
        
        .pipe(gulp.dest('./dist/fonts/'))
        .pipe(browserSync.stream());    
});

gulp.task('copy_video', ()=> {
    return gulp.src('./src/video/**')
        
        .pipe(gulp.dest('./dist/video/'))
        .pipe(browserSync.stream());    
});

gulp.task('pug2html', ()=> {
    return gulp.src('./src/pug/pages/*.pug')
        .pipe(pug({
            pretty: true
        }))
        // .pipe(htmlValidator)
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());    
});

gulp.task('watch', () => {
    browserSync.init({
       server: {
          baseDir: "./"
       },
       port: 3000
    });

    gulp.watch('./src/scss/*.scss', gulp.series('scss2css'))
    gulp.watch('./src/css/*.css', gulp.series('min_css'))
    gulp.watch('./src/js/*.js', gulp.series('min_js'))
    gulp.watch('./src/img/**', gulp.series('min_img'))
    gulp.watch('./src/fonts/*', gulp.series('copy_fonts'))
    gulp.watch('./src/video/*', gulp.series('copy_video'))
    gulp.watch('./src/pug/*/*.pug', gulp.series('pug2html'))
});

gulp.task('default', gulp.series('watch'));

gulp.task('compile_build', gulp.series('scss2css', 'min_css', 'min_js', 'min_img', 'copy_fonts', 'copy_video', 'pug2html'));

gulp.task('reset_build', () => { 
    return del(['./dist/*'])
});