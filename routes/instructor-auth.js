var express = require('express');
var router = express.Router();
var instructorController = require('../controllers/instructor');

router.route('/')
	.get(instructorController.github)
	.post(instructorController.update);

router.route('/callback')
	.get(instructorController.callback);

module.exports = router;