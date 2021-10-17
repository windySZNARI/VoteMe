var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log(req)
  res.send({status: 'ok'});
});

module.exports = router;
