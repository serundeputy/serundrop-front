(function() {
  var express = require('express'),
    path = require('path'),
    adaro = require('adaro'),
    //redis = require('redis'),
    request = require('request'),
    crypto = require('crypto'),
    //client = redis.createClient(),
    app = express();
  var router = express.Router();

  app.listen(3333);
  app.set('views', 'views');
  app.engine('dust', adaro.dust({cache: false}));
  app.set('view engine', 'dust');

  app.use('/css', express.static(path.join(__dirname, '/css')));

  // no trailing slash.
  $base_url = 'http://serundrop.staffordtavern.com';

  // router for node templates
  app.get('/node/:nid', function(req, res) {
    var id = req.params.nid;
    request({
      url: $base_url + '/api/page/' + id,
      json: true
    }, function(error, response, node) {
      return res.render('node', node);
    });
  });

  // router for the pages listing.
  app.get('/list/pages', function(req, res) {
    request({
      url: $base_url + '/api/list/page',
      json: true
    }, function(error, response, pages) {
      var data = {'pages' : []};
      for (var i = 0; i < pages.length; i++) {
        var entry = {
          'nid' : pages[i].nid,
          'title' : pages[i].title,
          'name' : pages[i].name,
          'body' : pages[i].body
        };
        data.pages.push(entry);
      }
      return res.render('pages', data);
    });
  });

  return app;
})();