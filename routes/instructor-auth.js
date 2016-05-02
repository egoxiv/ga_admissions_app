var express = require('express');
var router = express.Router();
var instructorController = require('../controllers/instructor');

router.route('/')
	.get(instructorController.github)
	.post(instructorController.update);

router.route('/callback')
	.get(instructorController.callback);


router.route('/:student')
	.get(instructorController.show);


router.route('/:student/evaluate')
	.get(instructorController.edit);



module.exports = router;