var express = require('express');
var router = express.Router();
var admissionsController = require('../controllers/admissions.js');

/****************
  admissions/
****************/

router.route('/')
	.get(admissionsController.index)
	.post(admissionsController.update);

// router.route('/status')
//   .get(admissionsController.status);

// require('connect-ensure-login').ensureLoggedIn('/admissions'),

router.route('/logout')
	.get(admissionsController.logout);



router.route('/:student')
	.get(admissionsController.show);
// require('connect-ensure-login').ensureLoggedIn('/admissions'),
// router.route('/instructors')
// 	.get(require('connect-ensure-login').ensureLoggedIn('/admissions'), admissionsController.show);

module.exports = router;
