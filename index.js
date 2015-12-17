var express = require("express");
var bodyParser = require("body-parser");
var devices = require("./libs/devices");
var app = express();

var ids = [];
var upAt = (new Date()).getTime();

var db = {};

app.use(bodyParser.json());

//GET on / will return server status
app.get("/status", function (req, res) {
    console.log("Client requested server status");
    var genericResp = "Server status: running<br>";
    genericResp += "Current date/time: " + (new Date()).toString() + "<br>";
    genericResp += "Hello world";
    genericResp += "<hr>";
    genericResp += JSON.stringify(db);
    res.send(genericResp);
});

//POST for the meta data that comes from the service gateway
app.post("/:device/:sensor/:value", function(req, res) {

    var device = devices.getDeviceById(req.params.device);
    if (device === null) {
        device = devices.createDevice(req.params.device);
    }

    device.addSensorData(req.params.sensor, req.params.value);

    res.json({"success": "1"});
});

app.get("/upsince", function(req, res) {
    var uptime = (new Date()).getTime() - upAt;
    res.json({bootTime: upAt, upTime: uptime});
});

//GET for all the data about a specific sensor
app.get("/:sensor", function(req, res, next) {
    var data = devices.getAllSensorData(req.params.sensor);

    res.json(data);
});

//Add a static server for files under the public_html folder
app.use(express.static(__dirname + "/public_html"));

var appPort = process.env.PORT || 5000;

var server = app.listen(appPort, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Entrust enterprise hub running");
});