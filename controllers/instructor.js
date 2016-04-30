var User = require ('../models/user');
var mongoose = require('mongoose');
var controller = {};

controller.index = function(req, res){
	User.find({instructor: req.body.instructor, role: 'student'})
		.then(function(users){
			res.send(users);
		})
		.catch(function(err){
			return err;
		});
};

controller.update = function(req, res){

};
controller.show = function(req, res){

};
controller.edit = function(req, res){

};







module.exports = controller;