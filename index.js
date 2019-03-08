var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

var accoountRoute = require('./router/accountroute');
accoountRoute(app);
var transRoute = require('./router/transroute');
transRoute(app);

app.listen(port);

console.log('RESTful API server started on: ' + port);