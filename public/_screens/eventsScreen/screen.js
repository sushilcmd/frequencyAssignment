var eventsScreen = new function() {
    this.showScreen = function() {
        getAllEvents().then(function(r) {
            var localData = { screenName: 'events screen', eventsMeta: JSON.parse(JSON.stringify(r)) }
            render('.mainContainer', 'eventsScreen', localData, function() {
                eventsScreen.bind()
            })
        })
    }
    this.bind = function() {
        $('.addNew').bind('click', function() {
            addNewEvents.showScreen()
        })
    }

    function getAllEvents() {
        return new Promise((res, rej) => {
            execute('getAllEvents', "POST", {}).then(function(r) {
                res(r)
            })
        })
    }
}