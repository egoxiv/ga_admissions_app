var express = require('express');
var router = express.Router();
var cohorts = require('../controllers/cohorts');

router.get('/', cohorts.index);

router.post('/', cohorts.create);

router.get('/new', cohorts.new);

router.get('/api/:id', cohorts.api);

router.get('/:id', cohorts.show);

router.put('/:id', cohorts.update);

router.get('/:id/edit', cohorts.edit);

router.get('/:id/remove-instructor', cohorts.removeInstructor);

router.get('/:id/remove-student', cohorts.removeStudent);

router.put('/:id/add-student', cohorts.addStudent);

router.put('/:id/add-instructor', cohorts.addInstructor);


module.exports = router;
