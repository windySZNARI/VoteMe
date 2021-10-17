var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  const config = req.body.config;

  global.config = config;

  console.log(config)
});

module.exports = router;
