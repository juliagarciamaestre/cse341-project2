const express = require('express');
const router = express.Router();

const favoriteController = require('../controller/favorite');

router.get('/user', favoriteController.getAllUser);

router.get('/user/:id', favoriteController.getSingleUser);

router.get('/details', favoriteController.getAllData);

router.get('/details/:id', favoriteController.getSingleData);


//Create a POST route to create a new data for favorite details
router.post('/', favoriteController.createData);

module.exports = router;