var express = require('express');
var router = express.Router();

// Controllers
var signUpController = require('../../controllers/signup-controller/signup-controller.js');

router.route('/')
  .get(signUpController.index);


module.exports = router;
