var express = require('express');
var router = express.Router();
var instructorController = require('../controllers/instructor.js');

router.route('/')
	.get(instructorController.index)
	.post(require('connect-ensure-login').ensureLoggedIn('/instructor'),instructorController.update);

router.route('/logout')
	.get(instructorController.logout);

router.route('/students/:id')
	.get(require('connect-ensure-login').ensureLoggedIn('/instructor'), instructorController.show);

router.route('/students/:id/evaluate')
	.get(require('connect-ensure-login').ensureLoggedIn('/instructor'), instructorController.edit);

module.exports = router;