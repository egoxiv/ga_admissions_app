var express = require('express');
var router = express.Router();
var instructorController = require('../controllers/instructor');

router.route('/')
	.get(require('connect-ensure-login').ensureLoggedIn('/'),instructorController.index)
	.post(require('connect-ensure-login').ensureLoggedIn('/'),instructorController.update);

router.route('/logout')
	.get(instructorController.logout);

router.route('/students/:id')
	.get(require('connect-ensure-login').ensureLoggedIn('/'),instructorController.show);
  

router.route('/students/:id/evaluate')
	.get(require('connect-ensure-login').ensureLoggedIn('/'),instructorController.edit);
  
module.exports = router;
