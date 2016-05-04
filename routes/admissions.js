var express = require('express');
var router = express.Router();
var admissionsController = require('../controllers/instructor.js');

router.route('/')
	.get(admissionsController.index)
	.post(require('connect-ensure-login').ensureLoggedIn('/instructor'),admissionsController.update);

router.route('/logout')
	.get(admissionsController.logout);

router.route('/students/:id')
	.get(require('connect-ensure-login').ensureLoggedIn('/instructor'), admissionsController.show);

router.route('/students/:id/evaluate')
	.get(require('connect-ensure-login').ensureLoggedIn('/instructor'), admissionsController.edit);

module.exports = router;