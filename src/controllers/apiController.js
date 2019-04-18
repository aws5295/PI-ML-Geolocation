var sql = require('mssql');

var apiController = function(dbConfig, data) {
    sql.on('error', err => {
        console.log(err);
    });

    var getTours = function(req, res) {
        // jshint ignore:start
        (async function() {
            try {
                let pool = await sql.connect(dbConfig);
                let result = await pool.request()
                    .query(`SELECT TourID, TourName, TourDescription
                            FROM tblTour
                            ORDER BY TourName ASC`);
                res.json(result.recordset);
                sql.close();
            } catch (err) {
                console.log(err);
                res.status(500);
            }
        }) ()
        // jshint ignore:end
    };

    var getTourRunsById = function (req, res) {
        // jshint ignore:start
        (async function() {
            try {
                let pool = await sql.connect(dbConfig);
                let result = await pool.request()
                    .input('tourId', sql.NVarChar, req.params.tourId)
                    .query(`SELECT TourId, TourRunID, TourRunTimeStamp
                            FROM tblTourRun
                            WHERE TourID = @tourId
                            ORDER BY TourRunTimeStamp ASC`);
                res.json(result.recordset);
                sql.close();
            } catch (err) {
                console.log(err);
                res.status(500);
            }
        }) ()
        // jshint ignore:end
    };

    var getTourDataById = function (req, res) {
        // jshint ignore:start
        (async function() {
            try {
                let pool = await sql.connect(dbConfig);
                let result = await pool.request()
                    .input('tourRunId', sql.NVarChar, req.params.tourRunId)
                    .query(`SELECT tt.TourName, tp.TagName, trt.UserName, trt.Value, trt.TimeStamp, trt.Comment, trt.CommentEnvStamp
                            FROM tblTourRunTag trt
                            INNER JOIN tblTour tt on tt.TourID = trt.TourID
                            INNER JOIN tblPoint tp on tp.PointID = trt.PointID
                            WHERE trt.TourRunID = @tourRunId
                            ORDER BY tp.TagName`);
                res.json(result.recordset);
                sql.close();
            } catch (err) {
                console.log(err);
                res.status(500);
            }
        }) ()
        // jshint ignore:end
    };

    var getTourRunDurationById = function (req, res) {
        // jshint ignore:start
        (async function() {
            try {
                let pool = await sql.connect(dbConfig);
                let result = await pool.request()
                    .input('tourRunId', sql.NVarChar, req.params.tourRunId)
                    .query(`SELECT AuditLog
                            FROM tblTourRunAuditLog
                            WHERE TourRunID = @tourRunId
                            ORDER BY AuditLog ASC`);
                res.send(GetDurationInternal(result.recordset[0].AuditLog));
                sql.close();
            } catch (err) {
                console.log(err);
                res.status(500);
            }
        }) ()
        // jshint ignore:end
    };

    function GetDurationInternal(record) {
        if (!record || record.length < 24) {
            return 'Tour Run Duration not available';
        } else {
            return record.substring(16, 24);
        }
    }

    return {
        getTours: getTours,
        getTourRunsById: getTourRunsById,
        getTourDataById: getTourDataById,
        getTourRunDurationById: getTourRunDurationById
    };
};

module.exports = apiController;