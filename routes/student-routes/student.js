var express = require('express');
var router = express.Router();
var studentController = require('../../controllers/student-controllers/student');

router.route('/')
  .get(studentController.index);

router.route('/logout')
	.get(studentController.logout);

module.exports = router;
