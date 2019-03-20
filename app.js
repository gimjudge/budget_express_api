// Main Express App

// require Express
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

// require routes
const routes = require('./routes/index');

//JSON Body Parser!
const jsonParser = require("body-parser").json;

//Need Logs to TroubleShoot ¯\_(ツ)_/¯
const logger = require("morgan");

app.use(logger("dev"));
app.use(jsonParser());

//Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/budget', { useNewUrlParser: true });

//Create db connection variable
let db = mongoose.connection;

db.on("error", (err) => {
    console.error("connection error:", err);
});
db.once("open", () => {
    console.log("connection successful");
});

//Allow Return Response
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if(req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE");
    }
    next();
});

// direct to routes
app.use('/', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//Error Handler
app.use((err, req, res, next) => {
    res.status(err.status);
    if (err.palatable == true) {
        res.json(err);
    } else {
        res.json({
            error: {
                message: err.message
            }
        });
    }
});

// Express App Listen
app.listen(port, function () {
    console.log(`Express app listening on port ${port}`);
});