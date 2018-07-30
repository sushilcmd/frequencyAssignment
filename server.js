var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var http = require('http').Server(app);
var path = require('path');

var route = require('./route')();
var config = require('./config/config')

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/views/index.html");
});


app.post('/login', route.login);
app.post('/saveEvent', route.saveEvent);
app.post('/getAllEvents', route.getAllEvents);


// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
// app.use(expressJwt({
//     secret: config.secret,
//     getToken: function(req) {
//         if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//             return req.headers.authorization.split(' ')[1];
//         } else if (req.query && req.query.token) {
//             return req.query.token;
//         }
//         return null;
//     }
// }).unless({ path: ['/login'] }));


http.listen(config.port, function() {
    console.log("listening on " + config.port);
});