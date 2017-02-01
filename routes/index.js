var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
    var user = req.param('user');
    var password = req.param('password');
});

router.post('/logout', function(req, res, next) {
    var is_auth = req.session('auth');
    // var is_auth = req.sessionStorage.getItem("auth");
});

module.exports = router;
