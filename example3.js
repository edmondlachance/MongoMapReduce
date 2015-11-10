/**
 * Created by edmond on 2015-11-10.
 */

var mongojs = require('mongojs');
var db = mongojs('mapReduceDB', ['sourceData', 'example3_results']);


var mapper = function () {
    var hobbys = this.hobbies.split(',');
    for (i in hobbys) {
        emit(hobbys[i], 1);
    }
};

var reducer = function (key, values) {
    var count = 0;
    for (index in values) {
        count += values[index];
    }

    return count;
};


db.sourceData.mapReduce(
    mapper,
    reducer,
    {
        out : "example3_results"
    }
);

db.example3_results.find(function (err, docs) {
    if(err) console.log(err);
    console.log(docs);
});