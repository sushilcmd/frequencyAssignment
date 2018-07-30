var controller = require('./app/controller/controller')
var events = require('./app/service/event')


module.exports = function() {
    function login(req, res) {
        var r = req.body;
        controller.login(r).then(data => {
            res.json(data)
        }).catch(function(e) {
            res.status(400).send(e);
        })
    }

    function getAllEvents(req, res) {
        var r = req.body;
        events.getAllEvents(r).then(data => {
            res.json(data)
        })
    }

    function saveEvent(req, res) {
        var r = req.body;
        events.saveEvent(r).then(data => {
            res.status(200).send({ status: true })
        }).catch(function(e) {
            res.send(e)
        })
    }

    return {
        login: login,
        saveEvent: saveEvent,
        getAllEvents: getAllEvents

    }
}