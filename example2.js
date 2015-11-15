/**
 * Created by edmond on 2015-11-10.
 */
var mongojs = require('mongojs');
var db = mongojs('mapReduceDB', ['sourceData', 'example2_results']);
var mapper = function () {
    var x = {age : this.age, name : this.name};
    emit(this.gender, {min : x , max : x});
};
var reducer = function(key, values){
    var res = values[0]; //objet qui contient le max et le min de chaque genre
    for (var i = 1; i < values.length; i++) {
        if(values[i].min.age < res.min.age)
            res.min = {name : values[i].min.name, age : values[i].min.age};
        if (values[i].max.age > res.max.age)
            res.max = {name : values[i].max.name, age : values[i].max.age};
    };
    return res;
};
db.sourceData.mapReduce(
    mapper,
    reducer,
    {
        out : "example2_results"
    }
    , function() {

        //La fonction find affiche
        db.example2_results.find(function (err, docs) {
            if(err) console.log(err);
            console.log(JSON.stringify(docs));
            process.exit(1);
        });

    }
);
