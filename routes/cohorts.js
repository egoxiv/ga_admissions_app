var express = require('express');
var router = express.Router();
var cohorts = require('../controllers/cohorts');

// put bfore controller argument
// require('connect-ensure-login').ensureLoggedIn('/error'),

router.route('/')
  .get(require('connect-ensure-login').ensureLoggedIn('/cohorts/error'), cohorts.index)
  .post(require('connect-ensure-login').ensureLoggedIn('/error'), cohorts.create);

router.route('/new')
  .get(require('connect-ensure-login').ensureLoggedIn('/cohorts/error'), cohorts.new);

router.route('/error')
  .get(cohorts.error);

router.route('/api/:id')
  .get(cohorts.api);

router.route('/:id')
  .get(require('connect-ensure-login').ensureLoggedIn('/cohorts/error'), cohorts.show)
  .put(require('connect-ensure-login').ensureLoggedIn('/cohorts/error'), cohorts.update);

router.route('/:id/edit')
  .get(require('connect-ensure-login').ensureLoggedIn('/cohorts/error'), cohorts.edit);

router.route('/:id/remove-instructor')
  .get(require('connect-ensure-login').ensureLoggedIn('/cohorts/error'), cohorts.removeInstructor);

router.route('/:id/remove-student')
  .get(require('connect-ensure-login').ensureLoggedIn('/cohorts/error'), cohorts.removeStudent);

router.route('/:id/add-student')
  .put(require('connect-ensure-login').ensureLoggedIn('/cohorts/error'), cohorts.addStudent);

router.route('/:id/add-instructor')
  .put(require('connect-ensure-login').ensureLoggedIn('/cohorts/error'), cohorts.addInstructor);


module.exports = router;
