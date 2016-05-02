var submitController = {};

submitController.index = function(req, res) {
  var welcome = {
    headline: 'Get more info',
    inputs: ['Name', 'Email', 'Password']
  };
  message = welcome.headline;
  inputValues = welcome.inputs;
  res.render('submit/submit');
};

submitController.create = function(req, res) {
  // console.log(req.body);
  console.log(res.body);
};

submitController.new = function(req, res) {};

submitController.update = function(req, res) {};

submitController.show = function(req, res) {};

submitController.edit = function(req, res) {};

submitController.destroy = function(req, res) {};

module.exports = submitController;
