const express = require('express');
const singleRouter = express.Router({mergeParams: true});

const TransactionModel = require('../models/transaction.js').TransactionModel;

/*
Post Details (Functions)
expects JSON body
    {
        amount: { type: Number, required: true },
        type: { type: String, required: true  },
        category: { type: String, required: true },
        category_id: { type: mongoose.Schema.ObjectId, required: true },
        subcategory: { type: String },
        subcategory_id: { type: mongoose.Schema.ObjectId, required: true },
        merchant: { type: String, required: true },
        note: { type: String, default: null },
        date: { type: Date, default: Date.now },
        date_created: { type: Date, default: Date.now },
        date_deleted: { type: Date, default: null }
    }
*/
singleRouter.post("/", (req, res, next) => {
// Check Authorization (middleware)

// Insert Transaction Details
    //Currently no extra validation
    let transactionInstance = new TransactionModel(req.body);
    transactionInstance.save(function (err, transaction) {
        // Error, add more error handling? 
        if(err) {
            err.status = 400;
            return next(err);
        }
        // Send JSON Error Response
        res.status(201);
        res.json(transaction);
    });
});

/*
    Get Details (Functions)
    expects String ID
*/
singleRouter.get("/:tID", (req, res, next) => {
// Check Authorization (middleware)

// Select Transaction Details
    TransactionModel.findById(req.params.tID, function (err, transaction) {
    // Send JSON Error response
        if(err) {
            err.status = 404;
            return next(err);
        }
        if(!transaction) {
            err = new Error("Not Found");
            err.status = 404;
            return next(err);
        }
    // Send JSON response
        res.json(transaction);
    });
});

/*
    Put Details (Functions)
    expects String ID & JSON body
*/
singleRouter.put("/:tID", (req, res, next) => {
// Check Authorization (middleware)

// Update Transaction Details
    TransactionModel.findOne({ _id: req.params.tID }).updateOne(req.body, function(err, result) {
        //may need to make changes.
        if(err) {
            err.status = 400;
            return next(err);
        }
        // Send JSON response
        res.json(result);
    });
});

/*
    Delete (Functions)
    expects String ID
*/
singleRouter.delete("/:tID", (req, res, next) => {
// Check Authorization

// Update Transaction Details
    TransactionModel.deleteOne({ _id: req.params.tID }, function(err, result) {
        // Send JSON Error response
        if(err) {
            err.status = 400;
            return next(err);
        }
        if(!result) {
            err = new Error("Not Found");
            err.status = 404;
            return next(err);
        }
        // Send JSON response
        res.json(result);
    });
});

module.exports = singleRouter;