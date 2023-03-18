const express = require('express');
const router = express.Router();
//validation
const userValidation = require('../helpers/validation');

const favoriteController = require('../controller/favorite');

//Route #1 read all the collection of users
router.get('/user', favoriteController.getAllUser);

//Route #2 read only one user according to their id
router.get('/user/:id', userValidation.idCheck, favoriteController.getSingleUser);

router.get('/details', favoriteController.getAllData);

router.get('/details/:id', userValidation.idCheck, favoriteController.getSingleData);

router.put('/user/:id', userValidation.userCreation ,favoriteController.updateClient);

router.put('/details/:id', userValidation.dataCreation, favoriteController.updateData);

//Create a POST route to create a new data for user
router.post('/', userValidation.userCreation , favoriteController.createData);

router.post('/details', userValidation.dataCreation, favoriteController.createDetails);

router.delete('/:id', userValidation.idCheck, favoriteController.deleteData);

// router.delete('/:id', favoriteController.deleteUser);
module.exports = router;