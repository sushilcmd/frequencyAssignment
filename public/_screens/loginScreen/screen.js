var loginScreen = new function() {
    this.showScreen = function() {
        render('.mainContainer', 'loginScreen', {}, function() {
            loginScreen.bind()
        })
    }
    this.bind = function() {
        $('.loginBtn.loginByUserName').bind('click', function() {
            var userMeta = { userName: $('.userName').val(), password: $('.password').val() }
            execute('login', "POST", userMeta).then(function(r) {
                createCookie(r).then(function() {
                    ajaxSetup()
                    eventsScreen.showScreen()
                })
            })
        })
    }
}

function ajaxSetup() {
    $.ajaxSetup({
        headers: {
            'Authorization': Cookies.get('token')
        }
    })
}

function createCookie(data) {
    return new Promise((res, rej) => {
        Cookies.set('userName', data.userName, { expires: 7 });
        Cookies.set('token', data.token, { expires: 7 })
        res()
    })
}