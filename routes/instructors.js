var express = require('express');
var router = express.Router();
var instructorController = require('../controllers/instructor');

router.route('/')
	.get(instructorController.index)
	.post(require('connect-ensure-login').ensureLoggedIn('/instructor'),instructorController.update);

router.route('/logout')
	.get(instructorController.logout);

router.route('/students/:id')
	.get(instructorController.show);
  // require('connect-ensure-login').ensureLoggedIn('/instructor'),

router.route('/students/:id/evaluate')
	.get(instructorController.edit);
  // require('connect-ensure-login').ensureLoggedIn('/instructor'),

module.exports = router;
