var express = require('express');
var homeRouter = express.Router();

var router = function(data) {
    var homeController = require('../controllers/homeController')();
    homeRouter.use(homeController.middleware);

    homeRouter.route('/')
        .get(homeController.getHome);

    homeRouter.route('/tours')
        .get(homeController.getToursPartial);

    homeRouter.route('/tours/:tourId')
        .get(homeController.getTourRunsPartial);

    homeRouter.route('/tourRuns')
        .get(homeController.getTourRunDataPartial);

    return homeRouter;
};

module.exports = router;