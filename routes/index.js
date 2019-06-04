var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.user) return res.redirect('/account/register');
	// 否则，用户已经登录了，我们输出这个用户对象看看
	console.log(req.user);
  res.render('index', { title: 'Home' });
});

module.exports = router;
