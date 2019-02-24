const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const app = express();
const { xlsxDataRouting } = require('./jsonData/xlsxData.router');

app.set('views', path.join(__dirname, 'views'));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

nunjucks.configure(app.get('views'), {
  autoescape: true,
  express: app,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.render('index.njs');
});

app.get('/drag-and-drop', function(req, res) {
  res.render('drag-and-drop/index.njs');
});

app.get('/tabular-data', function(req, res) {
  res.render('table/tabular-data.njs');
});

app.get('/absolute-page', function(req, res) {
  res.render('absolute/index.njs');
});

app.get('/form/simple', function(req, res) {
  res.render('form/simple.njs');
});

app.get('/form/disappear', function(req, res) {
  res.render('form/disappear.njs');
});

app.post('/form/simple/post', function(req, res) {
  res.render('form/simple.njs', {
    form: req.body,
  });
});

app.get('/navigation/pages/:pageId/titles/:title', function(req, res) {
  res.render('navigation/page.njs', {
    pageId: req.params.pageId,
    title: req.params.title,
  });
});

app.get('/wait-for-appear/table', function(req, res) {
  res.render('wait-for-appear/table.njs');
});

app.get('/wait-for-appear/form', function(req, res) {
  res.render('wait-for-appear/form.njs');
});

app.post('/wait-for-appear/form/post', function(req, res) {
  res.render('wait-for-appear/form.njs', {
    form: req.body,
  });
});

app.get('/matchers', function(req, res) {
  res.render('matchers/matchers.njs');
});

app.get('/form/select', function(req, res) {
  res.render('form/select.njs');
});
app.post('/form/select/post', function(req, res) {
  res.render('form/select.njs', {
    form: req.body,
  });
});

app.delete('/deleteTestEndpoint',function(req, res, next){
  res.status(200);
  return res.end();
});

app.get('/getTestEndpoint', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  const header = req.header('host');
  if (header === 'localhost:8080') {
    return res.send(JSON.stringify(
      { id: 1,
        title: 'Kaunin',
        body: 'test' }
    ));
  }
  res.status(403);
  return res.end();
});

app.patch('/patchTestEndpoint', function (req, res) {
  if(req.body.hasOwnProperty('first_name') === true) {
    res.status(200);
    return res.end();
  }
  res.status(400)
  return res.end();
});

app.post('/postTestEndpoint', function (req, res) {
  const name = req.body.name;
  const title = req.body.title;
  const header = req.header('User-Agent');
  const object = { code: 'created', name: name, title: title };
  if (header === 'Mozilla') {
    res.status(403);
    return res.end();
  }
  res.status(201);
  return res.json(object);
});

app.use('/xlsx', xlsxDataRouting());

app.listen(8080, function() {
  console.log('Example app listening on port 8080!');
});
