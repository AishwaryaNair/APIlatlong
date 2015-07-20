/**
 * Created by Aishwarya on 6/15/2015.
 */
var http = require('http');
var request = require('request');
var mongo = require('mongodb');
var Server = new mongo.Server('localhost', 27017, {auto_reconnect: true});
var db = new mongo.Db('local', Server);

console.log("Insidethedoclick");
request({
    url: 'http://developer.nrel.gov/api/pvwatts/v5.json?',
    qs: {
        api_key: 'MlxcfVUFAVksHh2f8b40XG7qFV5Tcq3gjmRn5W2v',
        "lat" : '40',
        "lon" : '-105',
        "system_capacity" : '4',
        "azimuth" : '180',
        "tilt" : '40',
        "array_type" : '1',
        "module_type" : '1',
        "losses" : '10'
    },
    method : 'GET'
},function(error,response,body){
    if (error){
        console.log(error);
    } else {
        console.log(response.statusCode, body);
        var myDocs = JSON.parse(body);
        db.open(function (err, dbref) {
            db.collection('example', function (err, collectionref) {
                collectionref.insert(myDocs, function (err, result) {
                    if (err) throw err;
                    console.log("record added");
                    console.log(myDocs.outputs.poa_monthly);
                });
            });
        });
    }
});
