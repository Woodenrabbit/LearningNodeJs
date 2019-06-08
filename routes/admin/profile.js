var express = require('express');
var router = express.Router();

router.use('/profile', require('./profile'));
router.use('/password', require('./password'));
router.use('/post', require('./post'));

module.exports = router;