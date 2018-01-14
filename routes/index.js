const express = require('express');
const router = express.Router();

router.use('/search', require('./searches'));

router.get('/', (req, res) => {
  res.render('index');

});

module.exports = router
