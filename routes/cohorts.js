var express = require('express');
var router = express.Router();
var cohorts = require('../controllers/cohorts');

router.get('/', cohorts.index);

router.post('/', cohorts.create);

router.get('/new', cohorts.new);

router.get('/:id', cohorts.show);

router.put('/:id', cohorts.update);

router.get('/:id/edit', cohorts.edit);


module.exports = router;
