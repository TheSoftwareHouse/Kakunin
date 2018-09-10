const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const { xlsxDataRouting } = require('./jsonData/xlsxData.router');

app.set('views', path.join(__dirname, 'views'));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

nunjucks.configure(app.get('views'), {
  autoescape: true,
  express: app
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('index.njs');
});

app.get('/drag-and-drop', function (req, res) {
  res.render('drag-and-drop/index.njs');
});

app.get('/tabular-data', function (req, res) {
  res.render('table/tabular-data.njs');
});

app.get('/absolute-page', function (req, res) {
  res.render('absolute/index.njs');
});

app.get('/form/simple', function (req, res) {
  res.render('form/simple.njs');
});

app.get('/form/disappear', function (req, res) {
  res.render('form/disappear.njs');
});

app.post('/form/simple/post', function (req, res) {
  res.render('form/simple.njs', {
    form: req.body
  });
});

app.get('/navigation/pages/:pageId/titles/:title', function (req, res) {
  res.render('navigation/page.njs', {
    pageId: req.params.pageId,
    title: req.params.title
  });
});

app.get('/wait-for-appear/table', function (req, res) {
  res.render('wait-for-appear/table.njs');
});

app.get('/wait-for-appear/form', function (req, res) {
  res.render('wait-for-appear/form.njs');
});

app.post('/wait-for-appear/form/post', function (req, res) {
  res.render('wait-for-appear/form.njs', {
    form: req.body
  });
});

app.get('/matchers', function (req, res) {
  res.render('matchers/matchers.njs');
});

app.use('/xlsx', xlsxDataRouting());

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
