const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search');

router.get('/results', searchController.getSearch);

module.exports = router
