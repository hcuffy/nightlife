const express = require('express');
const app = express();
const User = require('../models/user');

exports.getIndex = (req, res, next) => {
	res.render('index');
};

exports.getSignUpForm = (req, res, next) => {
	res.render('signup');
};

//Login user
exports.getLogin = (req, res, next) => {
	res.render('login');
};
// Create a new user after checking if user already exists.
exports.createNewUser = (req, res, next) => {
	const { username, password } = req.body;

	User.findOne(
		{
			username
		},
		(err, user) => {
			if (err) return next(err);
			if (user) {
				return res.render('login', {
					error: 'This username already exists.'
				});
			}
			const newUser = new User({
				username,
				password
			});
			newUser.save(function(err) {
				if (err) return next(err);
				req.login(newUser, err => {
					if (err) return next(err);
					res.redirect('/');
				});
			});
		}
	);
};

//Log out user
exports.getLogout = (req, res, next) => {
	req.session.destroy(function(err) {
		res.redirect('/');
	});
};
