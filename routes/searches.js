const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next()
  res.redirect('/');
}

router.get('/results', searchController.getSearch);
router.post('/going/:id', isLoggedIn, searchController.addAttendence);
router.post('/notGoing/:id', isLoggedIn, searchController.removeAttendence);

module.exports = router
