const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/favorite', require('./favorite'));

module.exports = router;