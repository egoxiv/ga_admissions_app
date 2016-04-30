var User = require ('../models/user');
var Cohort = require ('../models/cohort');
var mongoose = require('mongoose');
var controller = {};

controller.index = function(req, res){
	Cohort.find({instructors:"5724e37b9074afc4285ebd70"})
		.then(function(cohorts){
			res.send(cohorts);
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