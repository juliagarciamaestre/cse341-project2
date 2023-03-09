// Create an enviroment variable
const dotenv = require('dotenv');
dotenv.config();

// Connect to the mongodb db
const MongoClient = require('mongodb').MongoClient;

//Create an empty variable
let _db;

//Create a function that will initialized the data
//if the variable is empty and will asign it a value
const initDb = (callback) => {
    if (_db) {
        console.log(`Db is initialized`);
        return callback(null, _db);
    }
    MongoClient.connect(process.env.MONGODB_URI) //.env uri 
        .then((client) => {
            _db = client;
            callback(null, _db);
        })
        .catch((error) => {
            callback(error);
        });
};

const getDb = () => {
    if (!_db){
        throw Error('Db is no initialitated');
    }
    return _db;
};

module.exports = {
    initDb,
    getDb,
};

