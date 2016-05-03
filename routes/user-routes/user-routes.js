var express = require('express');
var router = express.Router();
//connect to controller
var userController = require('../../controllers/user-controller/user-controller.js');

router.route('/')
  .get(userController.index);


module.exports = router;
