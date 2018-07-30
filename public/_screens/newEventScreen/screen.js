var addNewEvents = new function() {
    this.showScreen = function() {
        var localData = JSON.parse(JSON.stringify(setting))
        render('.mainContainer', 'addNewEventScreen', localData, function() {
            addNewEvents.bind()
        })
    }
    this.bind = function() {
        $('.save').bind('click', function() {
            getValue(".inputText").then(function(r) {
                execute('saveEvent', "POST", r).then(function(r1) {
                    eventsScreen.showScreen();
                })
            })
        })
        $('.back').bind('click', function() {
            eventsScreen.showScreen()
        })
    }

    function getValue(className) {
        return new Promise((res, rej) => {
            var eventMeta = {};
            $(className).each(function() {
                var dataId = $(this).data('id');
                var value = $(this).val();
                eventMeta[dataId] = value;
            })
            res(eventMeta)
        })
    }
}