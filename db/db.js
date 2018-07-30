var MongoClient = require("mongodb").MongoClient,
    assert = require("assert");

var config = require('../config/config')

module.exports = () => {
    var createConnection = function(dbName) {
        return new Promise((res, rej) => {
            var mongoURL = config.mongoURL;
            MongoClient.connect(
                mongoURL, { useNewUrlParser: true },
                function(err, client) {
                    if (err) throw err;
                    res(client);
                }
            );
        });
    };
    var findData = function(options) {
        return new Promise((res, rej) => {
            createConnection(options.dbName).then(function(client) {
                var db = client.db(options.dbName);
                if (options.projection == undefined) {
                    db.collection(options.collection).find(options.query).toArray(function(err, docs) {
                        if (err) throw err;
                        res(docs);
                        client.close();
                    });
                } else {
                    db.collection(options.collection).find(options.query).project(options.projection).toArray(function(err, docs) {
                        if (err) throw err;
                        res(docs);
                        client.close();
                    });
                }
            });
        });
    };

    var findOne = function(options) {
        return new Promise((res, rej) => {
            createConnection(options.dbName).then(function(client) {
                var db = client.db(options.dbName);
                db.collection(options.collection).findOne(options.query, function(
                    err,
                    docs
                ) {
                    if (err) throw err;
                    res(docs);
                    client.close();
                });
            });
        });
    };

    var insertOne = function(options) {
        return new Promise((res, rej) => {
            createConnection().then(function(client) {
                var db = client.db(options.dbName);
                db.collection(options.collection).insertOne(options.query, function(
                    err,
                    docs
                ) {
                    if (err) throw err;
                    res(docs);
                    client.close();
                });
            });
        });
    };

    return {
        findData: findData,
        findOne: findOne,
        insertOne: insertOne,
    };
};