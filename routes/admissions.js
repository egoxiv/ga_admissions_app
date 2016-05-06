var express = require('express');
var router = express.Router();
var admissionsController = require('../controllers/admissions.js');

/****************
  admissions/
****************/

router.route('/')
	.get(require('connect-ensure-login').ensureLoggedIn('/'),admissionsController.index)
	.put(require('connect-ensure-login').ensureLoggedIn('/'),admissionsController.update);

router.route('/logout')
	.get(admissionsController.logout);

router.route('/delete/:id')
	.delete(require('connect-ensure-login').ensureLoggedIn('/'),admissionsController.destroy);

router.route('/accepted/:id')
	.put(require('connect-ensure-login').ensureLoggedIn('/'),admissionsController.accepted);
	
router.route('/:student')
	.get(require('connect-ensure-login').ensureLoggedIn('/'),admissionsController.show);

module.exports = router;
