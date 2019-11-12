// Utilities
const csvToJson = require('csvtojson');
const extract = require('extract-zip');
const fs = require('fs');
const request = require('request');

// this method retrieves data from 
exports.get = (req, res, next) => {
    const { fileDate } = req.query;

    const dataDirectoryPath = process.cwd() +'/backend/data/';

    try
    {
        // If the specified CSV file does not then extract 
        if(!fs.existsSync(dataDirectoryPath + fileDate + '-fordgobike-tripdata.csv'))
        {
            extract(dataDirectoryPath + fileDate +'-fordgobike-tripdata.csv.zip', 
                { dir: dataDirectoryPath }, 
                function(err) {
                    console.error(err);
                }
            );
        }

        csvToJson()
            .fromFile(dataDirectoryPath + fileDate + '-fordgobike-tripdata.csv')
            .then((json) => {
                return res.json({ data: json });
            });
    }
    catch(err)
    {
        console.error(err);
    }
};

// TODO for real time data
// request.get('https://s3.amazonaws.com/baywheels-data/201801-fordgobike-tripdata.csv.zip', function (error, response, body) {
//     if(error)
//         next(error);

//     console.log('Response: ' + response);

//     return res.json({ data: data })
// });