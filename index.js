var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var ids = [];

var db = {};

app.use(bodyParser.json());

//GET on / will return server status
app.get("/", function (req, res) {
  var genericResp = "Server status: running<br>";
  genericResp += "Current date/time: " + (new Date()).toString() + "<br>";
  genericResp += "Hello world";
    genericResp += "<hr>";
    genericResp += JSON.stringify(db);
  res.send(genericResp);
});

//POST for the meta data that comes from the service gateway
app.post("/:sensor/:value", function(req, res) {
    var body = req.body;
    if (!db[req.params.sensor]) {
        db[req.params.sensor] = [];
    }

    db[req.params.sensor].push({
        'timestamp' : (new Date()).getTime(),
        'value': req.params.value
    });

    res.json({"success": "1"});
});

var appPort = process.env.PORT || 5000;

var server = app.listen(appPort, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Entrust enterprise hub running");
});