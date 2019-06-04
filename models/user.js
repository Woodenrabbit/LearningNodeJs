var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, index: {unique: true}},
    password: String,
    avatar: {
        type: String,
        default: '/images/default-avatar.jpeg'
    },
    title: {
        type: String,
        default: '未命名博客'
    },
    description: {
        type: String,
        default: '博主很懒，还没有添加任何描述……'
    }
});

// var UserSchema = new Schema({
//     username: {type: String, index: {unique: true}},
//     password: String,
//     avatar: {
//         type: String,
//         default: '/images/default-avatar.jpeg'
//     },
//     title: {
//         type: String,
//         default: '未命名博客'
//     },
//     description: {
//         type: String,
//         default: '博主很懒，还没有添加任何描述……'
//     }
// },{collection:'user'});
//如果没有指定collection的名字则会默认变为users

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);