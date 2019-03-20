const express = require('express');

// routers
const router = express.Router();
//const groupRouter = express.Router({mergeParams: true});
//const singleRouter = express.Router({mergeParams: true});

// require routes
const singleRouter =  require('./single');
const groupRouter =  require('./group');
const categoryRouter =  require('./category');

// Root '/' ?
router.get('/', function (req, res, next) {
    res.status(204);
});
router.post('/', function (req, res, next) {
    res.status(204);
});

// Get post '/transaction' ?
router.get('/transaction', function (req, res, next) {
    res.status(204);
});
router.post('/transaction', function (req, res, next) {
    res.status(204);
});

// Authentication

// Authorize

router.use("/transaction/single", singleRouter);
router.use("/transaction/group", groupRouter);
router.use("/category", categoryRouter);

// export router
module.exports = router;