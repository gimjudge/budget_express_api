const express = require('express');
const categoryRouter = express.Router({mergeParams: true});

const CategoryModel = require('../models/category.js').CategoryModel;

categoryRouter.param("catID", function(req, res, next, id){
    CategoryModel.findById(req.params.catID, function(err, doc){
        if(err) return next(err);
        if(!doc) {
            err = new Error("Not Found");
            err.status = 404;
            return next(err);
        } 
        req.category = doc;
        next();
    });
});
categoryRouter.param("subID", function(req, res, next, id){
    req.subcategory = req.category.subcategories.id(id);
    if(!req.subcategory) {
        err = new Error("Not Found");
        err.status = 404;
        return next(err);
    } 
    next();
});

/*
Post Category (Functions)
expects JSON body
    {
    category: { type: string, required: true },
    subCategory: [
        {
            subCategory: { type: string, required: true },
            date_created: { type: Date, default: Date.now },
            date_deleted: { type: Date, default: null }
        }
    ],
    date_created: { type: Date, default: Date.now },
    date_deleted: { type: Date, default: null }
    }
*/
categoryRouter.post("/", (req, res, next) => {
// Check Authorization (middleware)

// Insert category Details
    //Currently no extra validation
    let categoryInstance = new CategoryModel(req.body);
    categoryInstance.save(function (err, category) {
        // Error, add more error handling? 
        if(err) {
            err.status = 400;
            return next(err);
        }
        // Send JSON Error Response
        res.status(201);
        res.json(category);
    });
});

//Returns All Categories
categoryRouter.get("/", (req, res, next) => {
// Check Authorization (middleware)

    // Retrieve all Categories
    CategoryModel.find({ date_deleted: { $eq: null } }, function (err, categories) {
    // Send JSON Error response
        if(err) {
            err.status = 404;
            return next(err);
        }
        if(!categories) {
            err = new Error("Not Found");
            err.status = 404;
            return next(err);
        }
    // Send JSON response
        res.json(categories);
    });
});

/*
    Get Single Category (Functions)
    expects String ID
*/
categoryRouter.get("/:catID", (req, res, next) => {
// Check Authorization (middleware)

// Select category Details
    CategoryModel.findById(req.params.catID, function (err, category) {
    // Send JSON Error response
        if(err) {
            err.status = 404;
            return next(err);
        }
        if(!category) {
            err = new Error("Not Found");
            err.status = 404;
            return next(err);
        }
    // Send JSON response
        res.json(category);
    });
});

/*
    Put Details (Functions)
    expects String ID & JSON body
*/
categoryRouter.put("/:catID", (req, res, next) => {
// Check Authorization (middleware)

// Update category Details
    CategoryModel.findOne({ _id: req.params.catID }).updateOne(req.body, function(err, result) {
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
categoryRouter.delete("/:catID", (req, res, next) => {
// Check Authorization

// Update category Details
    // Update category Details
    //let date = Date.now();
    CategoryModel.findOne({ _id: req.params.catID }).updateOne({date_deleted: Date.now()}, function(err, result) {
        
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
Post Subcategory (Functions)
expects JSON body
    {
            subCategory: { type: string, required: true },
            date_created: { type: Date, default: Date.now },
            date_deleted: { type: Date, default: null }
    }
*/
categoryRouter.post("/:catID/subcategories", (req, res, next) => {
// Check Authorization (middleware)
    //res.json(req.category);
    //Currently no extra validation
    // Push Subcategories

    req.category.subcategories.push(req.body);
    req.category.save(function(err, category){
        if(err) return next(err);
        res.status(201);
        res.json(category);
    });
});

// Returns All Categories
categoryRouter.get("/:catID/subcategories", (req, res, next) => {
// Check Authorization (middleware)
    // Retrieve all Categories
    res.json(req.category.subcategories);
});

/*
    Get Single SubCategory (Functions)
    expects String ID param
*/
categoryRouter.get("/:catID/subcategories/:subID", (req, res, next) => {
// Check Authorization (middleware)
// Select Subcategory Details
    // Send JSON response
    res.json(req.subcategory);
});

/*
    Put Details (Functions)
    expects String ID & JSON body
*/
categoryRouter.put("/:catID/subcategories/:subID", (req, res, next) => {
// Check Authorization (middleware)
// Update Subcategory Details
    req.subcategory.update(req.body, function(err, result) {
        if(err) return next(err);
        res.json(result);
    });
});

/*
    Delete (Functions)
    expects String ID
*/
categoryRouter.delete("/:catID/subcategories/:subID", (req, res, next) => {
// Check Authorization

// Update category Details
    // Update category Details
    req.subcategory.update({date_deleted: Date.now()}, function(err, result) {
        
        //may need to make changes.
        if(err) {
            err.status = 400;
            return next(err);
        }
        // Send JSON response
        res.json(result);
    });
});

module.exports = categoryRouter;