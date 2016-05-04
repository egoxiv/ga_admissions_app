var express = require('express');
var router = express.Router();
var admissionsController = require('../controllers/admissions.js');

router.route('/')
	.get(admissionsController.index)
	.post(require('connect-ensure-login').ensureLoggedIn('/admissions'),admissionsController.update);

router.route('/logout')
	.get(admissionsController.logout);

router.route('/instructors/')
	.get(require('connect-ensure-login').ensureLoggedIn('/admissions'), admissionsController.instructorIndex);

router.route('/instructors/:id')
	.get(require('connect-ensure-login').ensureLoggedIn('/admissions'), admissionsController.show);

module.exports = router;