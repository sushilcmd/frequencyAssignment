var ioUrl;

var env = 'LOCAL'; // LOCAL, STAGE, PROD

function setEnvironmentSpecifics(env) {
    switch (env) {
        case 'LOCAL':
            ioUrl = window.location.origin;
            break;
        case 'PROD':
            ioUrl = '';
            break;
    }

    appUrl = ioUrl + '/';

}

setEnvironmentSpecifics(env);