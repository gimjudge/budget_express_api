const express = require('express');
const groupRouter = express.Router({mergeParams: true});

const TransactionModel = require('../models/transaction.js').TransactionModel;

/*
    Get Month Transactions (Functions)
    expects int 0 - 11.
*/
groupRouter.get("/month/:monthNumber", (req, res, next) => {
    // Check Authorization (middleware)
    
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), parseInt(req.params.monthNumber), 1);
    const lastDay = new Date(date.getFullYear(), parseInt(req.params.monthNumber) + 1, 0,0,0,0,-1);

    // Set conditions
    const conditions = {
        "date" : {
            "$gte": firstDay, 
            "$lte": lastDay
        }
    };

    // Select Month of Transactions
    TransactionModel.find(conditions, (err, transactions) => {
        // Send JSON response
        if(err) return next(err);
        if(!transactions) {
            err = new Error("Not Found");
            err.status = 404;
            return next(err);
        }
        // Send JSON response with month transaction totals
        res.json({
            transaction: transactions
        });
    });
});

module.exports = groupRouter;