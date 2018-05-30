var gulp           = require('gulp'),
    sass           = require('gulp-sass'),
    browserSync    = require('browser-sync'),
    useref         = require('gulp-useref'),
    uglify         = require('gulp-uglify'),
    gulpif         = require('gulp-if'),
    minifyCss      = require('gulp-minify-css'),
    clean          = require('gulp-clean'),
    sourcemaps     = require('gulp-sourcemaps'),
    sftp           = require('gulp-sftp'),
    wiredep        = require('wiredep').stream,
    nunjucks       = require('gulp-nunjucks-render'),
    notify         = require('gulp-notify'),
    tinify         = require('gulp-tinify'),
    replace        = require('gulp-replace'),
    gulpsync       = require('gulp-sync')(gulp), 
    autoprefixer   = require('gulp-autoprefixer');


// Подключение плагинов

// Обработчик scss в css
gulp.task('css', function() {
    gulp.src('dev/sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', notify.onError())
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dev/_ready/css'))
    .pipe(browserSync.reload({stream: true}));
});

// Указывает куда сохранять и прописывать пути для установки пакетов через bower
gulp.task('bower', function () {
  gulp.src('dev/nunjucks/blocks/*.html')
    .pipe(wiredep({
      directory : "dev/_ready/libs"
    }))
    .pipe(gulp.dest('dev/nunjucks'))
  .pipe(browserSync.reload({stream: true}));
});

// Сборка html файлов
gulp.task('nunjucks', function() {
  gulp.src('dev/*.html')
  .pipe(nunjucks({
    path: 'dev',
    ext: '.html'
  }))
  .on('error', notify.onError())
  .pipe(replace('../_ready/libs/', 'libs/'))
  .pipe(gulp.dest('dev/_ready/'))
  .pipe(browserSync.reload({stream: true}));
});

// Сервер
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'dev/_ready'
    },
    notify: false
  });
});

// Какие файлы отслеживать
gulp.task('watch', function() {
  gulp.watch('dev/sass/**/*.scss', ['css']);
  gulp.watch('dev/nunjucks/**/*.html', ['nunjucks']);
  gulp.watch('dev/*.html', ['nunjucks']);
});

gulp.task('default', ['nunjucks','browserSync', 'watch', 'css']);

//************  Вывод на продакшен  *************//

// Очищаем папку продакшена
gulp.task('clean', function () {
  return gulp.src('public', {read: false})
    .pipe(clean());
});

// Сжатие и перемещение картинок
gulp.task('image:build', function() {
  gulp.src('dev/_ready/img/*')
    .pipe(tinify('TBZRe8UbD1QFz3u5nr2wCQHNzz8E9qs5'))
    .on('error', notify.onError())
    .pipe(gulp.dest('public/img'));
});

// Перемещение шрифтов
gulp.task('fonts:build', function() {
  return gulp.src('dev/_ready/fonts/**/*')
    .pipe(gulp.dest('public/fonts'));
});
// Формирует проект для продакшена
gulp.task('build', gulpsync.sync(['clean',['fonts:build','image:build']]), function () {
  return gulp.src('dev/_ready/*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulp.dest('public'));
});

// Sftp
gulp.task('deploy', function () {
  return gulp.src('public /**/*')
    .pipe(sftp({
      host: '',
      user: '', 
      pass: '',
      remotePath: ''
    }));
});

