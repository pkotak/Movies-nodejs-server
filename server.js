let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.DBUSERNAME + ':' + process.env.DBPASSWORD + '@ds121312.mlab.com:21312/movies-react');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://the-movie-network.herokuapp.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));

app.get('/', function (req, res) {
    res.send("Node server running...");
});

app.get('/api/session/set/:name/:value',
    setSession);
app.get('/api/session/get/:name',
    getSession);

function setSession(req, res) {
    let name = req.params['name'];
    let value = req.params['value'];
    req.session[name] = value;
    res.send(req.session);
}

function getSession(req, res) {
    let name = req.params['name'];
    let value = req.session[name];
    res.send(value);
}

let userService = require('./services/user.service.server');
let movieService = require('./services/movie.service.server');
let tmdbService = require('./services/tmdb.service.server');
let nytService = require('./services/nyt.service.server');
let fanService = require('./services/fan.service.server');
let eventService = require('./services/event.service.server');
let adminService = require('./services/admin.service.server');
adminService(app);
userService(app);
tmdbService(app);
nytService(app);
movieService(app);
fanService(app);
eventService(app);

app.listen(process.env.PORT || 5000);
