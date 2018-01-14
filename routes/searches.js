const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search');

router.get('/results', searchController.getSearch);
router.post('/going/:id', searchController.addAttendence);

module.exports = router
