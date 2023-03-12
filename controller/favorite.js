const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllUser = async (req, res, next) => {
    const result = await mongodb.getDb().db('favorite').collection('user').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getAllData = async (req, res, next) => {
    const result = await mongodb.getDb().db('favorite').collection('favDetails').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSingleUser = async (req, res, next) => {
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
};

const getSingleData = async (req, res, next) => {
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
};

const createData = async (req, res) => {
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

module.exports = { getAllUser, getAllData, getSingleUser, getSingleData, createData};