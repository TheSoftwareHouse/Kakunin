const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.set('views', path.join(__dirname, 'views'));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

nunjucks.configure(app.get('views'), {
  autoescape: true,
  express: app
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('index.njs')
});

app.get('/tabular-data', function (req, res) {
  res.render('table/tabular-data.njs')
});

app.get('/form/simple', function (req, res) {
  res.render('form/simple.njs')
});

app.post('/form/simple/post', function (req, res) {
  res.render('form/simple.njs', {
    form: req.body
  })
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});
