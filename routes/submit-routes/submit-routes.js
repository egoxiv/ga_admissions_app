var express = require('express');
var router = express.Router();

// Controllers
var submitController = require('../../controllers/submit-controller/submit-controller.js');

router.route('/')
  .get(submitController.index)
  .post(submitController.create);


module.exports = router;
