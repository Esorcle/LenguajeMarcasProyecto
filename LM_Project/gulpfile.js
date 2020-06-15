require('gulp');
const {
  watch,
  src,
  dest,
  series,
  parallel 
} = require('gulp');
const sassdoc = require('sassdoc');
const pleeease = require('gulp-pleeease');
const sass = require('gulp-dart-scss');
const rename = require('gulp-rename');
const processhtml = require('gulp-processhtml');


//Función para documentar
function docs() {
  var doc_options = { 
    dest : "dist/docs",
    verbose: true 
  }
  return src('scss/*.scss')
  .pipe(sassdoc(doc_options)); 
  }

  //Función para generar css desde scss
function generate_css() {
  return src('scss/style.scss') 
    .pipe(sass()) 
      .pipe(pleeease()) 
      .pipe(
        rename({
        basename: "style", 
        //suffix: ".min",
        extname: ".css"
      }))
    .pipe(dest('dist/css/')); 
}

function generate_css_min() {
  return src('scss/style.scss') 
    .pipe(sass()) 
      .pipe(pleeease()) 
      .pipe(
        rename({
        basename: "style", 
        suffix: ".min",
        extname: ".css"
      }))
    .pipe(dest('dist/css/')); 
}

function mover_fonts() {
  return src('./fonts/*')
  .pipe(dest('./dist/css/fonts'));
}

exports.generate_css = generate_css;
exports.generate_css_min = generate_css_min;
exports.docs = docs;
exports.mover_fonts = mover_fonts;
exports.compilar = parallel(docs,generate_css, mover_fonts);

exports.default = function() {
  watch('./scss/*.scss',generate_css);
}