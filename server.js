const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');
const port = process.env.PORT || 3000;
const createError = require('http-errors');


const app = express();

app.use(bodyParser.json());
app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/', require('./routes'));

//404 handler and pass to error handler
app.use((req, res, next) => {
    next(createError(404, "Not found"));
});

//Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 5000);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});

//Mongo connection
mongodb.initDb((error, mongodb) =>{
    if (error){
        console.log(error);
    } else{
        app.listen(port, () => {
            console.log(`Server is running on ${port} and it's connected to the database`);
        });
    }
});