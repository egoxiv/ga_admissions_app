var express = require('express');
var router = express.Router();
var instructorController = require('../controllers/instructor.js');

router.route('/')
	.get(instructorController.index);

router.route('/logout')
	.get(instructorController.logout);

router.route('/students/:id')
	.get(instructorController.show);

module.exports = router;