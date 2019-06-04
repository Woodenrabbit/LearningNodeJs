var router = require('express').Router();
var passport = require('passport');

var User = require('../models/user');

router.route('/register')
    .get(function(req,res){
        res.render('account/register',{title:'注册'})
    })
    .post(function(req,res,next){
        var username = req.body.username,
            password = req.body.password;
        
        console.log('Register post received!');
        console.log('username:',username,'password:',password);
        User.register(new User({ username: username }), req.body.password,
        function(err) {
            if (err) return next(err);
            res.status(201).end();
        }); 
    });

router.post('/signup', function(req, res, next) {
    var username = req.body.username || '',
        password = req.body.password || '';

    User.register(new User({ username: username }), req.body.password,
        function(err) {
            if (err) return next(err);    // 交给接下来的错误处理中间件
            res.append('Content-Type','text/plain;charset=UTF-8');
            res.status(201).end('注册成功');       // 存储成功
        }); 
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    // var username = req.body.username || '',
    //     password = req.body.password || '';

    // User.find({username:username,password:password},function(err,doc){
    //     if(doc.length === 0 )
    //     res.status(400).end('用户名或密码错误')
    //     else
    //     res.redirect('/');
    // });
    res.cookie('authenticated', true);
    res.status(200).end();
	// res.redirect('/');
	// 或者发送成功的响应：
    //res.status(200).end(result);
});

module.exports = router;