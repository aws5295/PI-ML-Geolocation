var http = require('http');
var config = require('../../config');

var homeController = function() {
    
    var apiBase = 'http://' + config.host + ':' + config.port + '/api/';

    var getData = function(url, callback) {
        http.get(url, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                callback(JSON.parse(data));
            });
        }).on('error', (err) => {
            console.log(err);
        });
    };

    var middleware = function(req, res, next) {
        // Middleware goes here
        next();
    };

    var getHome = function(req, res) {
        res.render('index', {
            apiKey: config.apiKey,
            title: config.title
        });
    };

    var getToursPartial = function(req, res) {   
        getData(apiBase + 'tours', function(data) {
            res.render('_tourList', {data: data});
        });
    };

    var getTourRunsPartial = function(req, res) {
        getData(apiBase + 'tours/' + req.params.tourId, function(data) {
            res.render('_tourRunList', {data: data});
        });
    };

    var getTourRunDataPartial = function(req, res) {
        res.render('_tourRunInfo');
    };

    return {
        getHome: getHome,
        middleware: middleware,
        getToursPartial: getToursPartial,
        getTourRunsPartial: getTourRunsPartial,
        getTourRunDataPartial: getTourRunDataPartial
    };
};

module.exports = homeController;