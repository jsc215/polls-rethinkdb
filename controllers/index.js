var express = require('express');
var router = express.Router();
const api = require('./polls')
/**
  * @description
  * First route will handle the static html file delievery.
  * Second route will handle the API calls.
*/
router.use('/', require('./home'));
router.use('/api/polls', api);
// router.use('/api/polls', require('./polls'));

module.exports = router;