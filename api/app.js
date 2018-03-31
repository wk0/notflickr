var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var bodyParser = require('body-parser');
var cors = require('cors');
var port = 5000;
var Rekey = require('./rekey');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(cors());


app.use(function (req, res, next) {
    next();
});

app.use(function (err, req, res, next) {
    if (err)
        next(err);
    else
        next();
});


app.post('/api/rekey', function(req,res){
    Rekey.encrypt(function(){
        
    });
    res.status(200).end();
});



server.listen(port, function(){
    console.log('Listening on port ' + port);
});

//timeout set to 0 for long requests
server.timeout = 0;