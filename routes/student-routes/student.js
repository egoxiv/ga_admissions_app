var express = require('express');
var router = express.Router();
var studentController = require('../../controllers/student-controllers/student');

router.route('/')
  .get(require('connect-ensure-login').ensureLoggedIn('/'),studentController.index);

router.route('/logout')
	.get(require('connect-ensure-login').ensureLoggedIn('/'),studentController.logout);

router.route('/api')
  .get(require('connect-ensure-login').ensureLoggedIn('/'), studentController.api);

module.exports = router;
