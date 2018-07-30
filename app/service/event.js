var db = require('../../db/db')();
var config = require('../../config/config')

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


function login(r) {
    return new Promise((res, rej) => {
        var options = { dbName: 'TESTING', collection: 'users', query: { "userID": r.userName, "password": r.password } }
        db.findOne(options).then(data => {
            var meta = {
                _id: data._id,
                username: data.userName,
                token: jwt.sign({ sub: data._id }, config.secret, {
                    expiresIn: 6000
                })
            }
            res(meta)
        })
    })
}

function saveEvent(r) {
    return new Promise((res, rej) => {
        var options = { dbName: 'TESTING', collection: 'events', query: r }
        db.insertOne(options).then(response => {
            if (response)
                res(response)
            else
                rej()
        })
    })
}

function getAllEvents(r) {
    return new Promise((res, rej) => {
        var options = { dbName: 'TESTING', collection: 'events', query: {} };
        db.findData(options).then(data => {
            res(data)
        })
    })
}

module.exports = {
    login: login,
    saveEvent: saveEvent,
    getAllEvents: getAllEvents
}