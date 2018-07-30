var eventService = require('../service/event');

function login(r) {
    return new Promise((res, rej) => {
        eventService.login(r).then(data => {
            if (data) {
                res(data)
            } else {
                rej('invalid login')
            }
        })
    })
}

function saveEvent(r) {
    return new Promise((res, rej) => {
        eventService.saveEvent(r).then(data => {
            res(data)
        }).catch(function(e) {
            rej("Please try again")
        })
    })
}

module.exports = {
    login: login,
    saveEvent: saveEvent
}