var express = require('express');
var router = express.Router();
var Post = require('../models/post.js');

router.route('/')
    .get(function (req, res, next) {
        Post.find({author: req.user.id}, function(err, posts){
            if(err) return next(err);

            res.render('admin/posts', {
                posts: posts
            });
        });
    });

router.route('/new')
    .get(function (req, res) {
        res.render('admin/post');
    })
    .post(function (req, res, next) {
        Post.create({
            title: req.body.title,
            content: req.body.content,
            author: req.user.id
        }, function (err, post) {
            if (err) return next(err);
            else return res.redirect('/admin/post');
        });
    });
module.exports = router;    