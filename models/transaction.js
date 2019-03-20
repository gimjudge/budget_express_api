'use strict';

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    amount: { type: Number, required: true },
    type: { type: String, required: true  },
    categoryID: { type: mongoose.Schema.ObjectId, required: true },
    subcategoryID: { type: mongoose.Schema.ObjectId, required: true },
    merchant: { type: String, required: true },
    note: { type: String, default: null },
    date: { type: Date, default: Date.now },
    date_created: { type: Date, default: Date.now },
    date_deleted: { type: Date, default: null }
});

const TransactionModel = mongoose.model('Transaction', TransactionSchema);

module.exports.TransactionModel = TransactionModel;