var express = require('express');
var router = express.Router();

// Controllers
var submitController = require('../../controllers/submit-controller/submit-controller.js');

router.route('/')
  .get(submitController.index);

router.route('/logout')
  .get(instructorController.logout);


module.exports = router;
