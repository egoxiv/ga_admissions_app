var express = require('express');
var router = express.Router();
var admissionsController = require('../controllers/admissions.js');

router.route('/')
	.get(require('connect-ensure-login').ensureLoggedIn('/'),admissionsController.index)
	.post(require('connect-ensure-login').ensureLoggedIn('/'),admissionsController.update);



router.route('/logout')
	.get(require('connect-ensure-login').ensureLoggedIn('/'),admissionsController.logout);



router.route('/:student')
	.get(require('connect-ensure-login').ensureLoggedIn('/'),admissionsController.show);

module.exports = router;