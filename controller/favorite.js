const { validationResult } = require('express-validator');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');
const mongoose = require('mongoose');

//Read all the collection user
const getAllUser = async (req, res, next) => {
  try{
    const result = await mongodb.getDb().db('favorite').collection('user').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (error) {
    console.log(error.message);
  } 
};

//Read all the collection of favDetails
const getAllData = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db('favorite').collection('favDetails').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (error) {
    console.log(error.message);
  }
   
};

//Read the user by id
const getSingleUser = async (req, res, next) => {
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    };
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('favorite')
      .collection('user')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
      console.log(result);
    });
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError){
      next(createError(400, 'Invalid ID value'));
      return;
    }
    next (error);
  }
};

const getSingleData = async (req, res, next) => {
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    };
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('favorite')
      .collection('favDetails')
      .find({ _id: userId });
      result.toArray().then((lists) => {
      res.status(200).json(lists[0]);
      console.log(result);
    });
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError){
      next(createError(400, 'Invalid Details Data ID'));
      return;
    }
    next (error);
  }
    
};

const createData = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    };
    const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteMovie: req.body.favoriteMovie,
        birthday: req.body.birthday,
    };
    const result = await mongodb.getDb().db('favorite').collection('user').insertOne(data);
    console.log(result);
    if (result.acknowledged){
      res.status(201).json(result);
    } else {
      res.status(500).json(result.error || "Error happened when trying to create a new details information");
    }
};

const createDetails = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  };
  const data = {
    favoriteMovie: req.body.favoriteMovie,
    releasedDate: req.body.releasedDate,
    plot: req.body.plot,
    imdb: req.body.imdb,
    budget: req.body.budget,
    boxOffice: req.body.boxOffice,
    director: req.body.director,
    whereToWatch: req.body.whereToWatch,
  };
  const result = await mongodb.getDb().db().collection('favDetails').insertOne(data);
  console.log(result);
  if (result.acknowledged){
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || "Error happened when trying to create a new details information");
  }
};

const updateClient = async (req, res) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  };
  const userId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteMovie: req.body.favoriteMovie,
    birthday: req.body.birthday,
  };

  const result = await mongodb
    .getDb()
    .db('favorite')
    .collection('user')
    .replaceOne({ _id: userId}, user);
  console.log(result);
  if(result.modifiedCount > 0){
    res.status(204).send();
  }else {
    res.status(500).json(result.error || "Error ocurred while trying to update the user");
  }
};

const updateData = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  };
  const dataId = new ObjectId(req.params.id);
  const dataDetails = {
    favoriteMovie: req.body.favoriteMovie,
    releasedDate: req.body.releasedDate,
    plot: req.body.plot,
    imdb: req.body.imdb,
    budget: req.body.budget,
    boxOffice: req.body.boxOffice,
    director: req.body.director,
    whereToWatch: req.body.whereToWatch,
  };

  const result = await mongodb
    .getDb()
    .db('favorite')
    .collection('favDetails')
    .replaceOne({ _id: dataId }, dataDetails);
  console.log(result);
  if (result.modifiedCount > 0){
    res.status(204).send();
  } else {
    res.status(500).json(result.error || "Error ocurred while trying to update data");
  }
};


const deleteData = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()}).console.log({ errors: errors.array()});
  };
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('favorite').collection('favDetails').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the data.');
  }
};


const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('favorite').collection('user').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = { getAllUser, getAllData, getSingleUser, getSingleData, createData, updateClient, updateData, deleteData, createDetails, deleteUser };