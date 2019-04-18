var express = require('express');
var apiRouter = express.Router();
var sql = require('mssql');

var router = function(dbConfig) {
    var apiController = require('../controllers/apiController')(dbConfig, null);

    apiRouter.route('/tours')
        .get(apiController.getTours);

    apiRouter.route('/tours/:tourId')
        .get(apiController.getTourRunsById);

    apiRouter.route('/tourRuns/:tourRunId')
        .get(apiController.getTourDataById);

    apiRouter.route('/tourRuns/:tourRunId/duration')
        .get(apiController.getTourRunDurationById);

    return apiRouter;
};

module.exports = router;