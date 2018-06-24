const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users');
const searchController = require('../controllers/search');
require('../config/passport')(passport);

router.get('/', usersController.getIndex);
router.get('/login', usersController.getLogin);
router.get('/logout', usersController.getLogout);
router.get('/signup', usersController.getSignUpForm);
router.post('/signup', usersController.createNewUser);
router.post(
	'/signin',
	passport.authenticate('local', {
		successRedirect: '/locations',
		failureRedirect: '/users/login'
	})
);

router.get('/');

module.exports = router;
