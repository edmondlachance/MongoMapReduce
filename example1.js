/**
 * Created by edmond on 2015-11-10.
 */

var mongojs = require('mongojs');
var db = mongojs('127.0.0.1:27017/mapReduceDB', ['sourceData', 'example1_results']);

var mapper = function () {
    emit(this.gender, 1);
};

var reducer = function(gender, count){
    return Array.sum(count);
};

db.sourceData.mapReduce(
    mapper,
    reducer,
    {
        out : "example1_results"
    }
);

db.example1_results.find(function (err, docs) {
    if(err) console.log(err);
    console.log(docs);
});