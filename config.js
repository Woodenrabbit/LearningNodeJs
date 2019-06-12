module.exports = {
    env: process.env.NODE_ENV || 'production',
    schema: 'http://',
    host: '127.0.0.1',
    port: 3000,
    mongodb: 'mongodb://localhost/tm-blog',
    smtp: {
        host: 'smtp.126.com',
        port: 25,
        auth: {
            user: 'woodenrabbit@qq.com',
            pass: 'password'
        }
    }
}