var express = require('express');
var router = express.Router();

// Controllers
var submitController = require('../../controllers/submit-controller/submit-controller.js');

router.route('/')
<<<<<<< HEAD
  .get(submitController.index)
  .post(submitController.create);
=======
  .get(submitController.index);

router.route('/logout')
  .get(submitController.logout);
>>>>>>> fa47418193bc7d9c5386d6c533d4c9c75105d1d3


module.exports = router;
