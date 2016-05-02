var express = require('express');
var router = express.Router();
var cohorts = require('../controllers/cohorts');

router.get('/', cohorts.index);

router.get('/:id', cohorts.show);




module.exports = router;
