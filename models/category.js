'use strict';

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
    subcategory: { type: String, required: true},
    planned: { type: Number, default: 0 },
    date_created: { type: Date, default: Date.now },
    date_deleted: { type: Date, default: null }
});

SubCategorySchema.method("update", function(updates, callback) {
    Object.assign(this, updates);
    this.parent().save(callback);
});

const CategorySchema = new Schema({
    category: { type: String, required: true, unique: true },
    subcategories: [SubCategorySchema],
    date_created: { type: Date, default: Date.now },
    date_deleted: { type: Date, default: null }
});

const CategoryModel = mongoose.model('Category', CategorySchema);

module.exports.CategoryModel = CategoryModel;