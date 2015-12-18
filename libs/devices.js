var data = [];

var devicesCollection = function() {
    this.getDeviceById = function(id) {
        var device = null;
        for (var i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                device = data[i];
                break;
            }
        }

        return device;
    };

    this.createDevice = function(id) {
        var device = new Device(id);
        data.push(device);
        console.log("Added device, new data array is ");
        console.log(data);
        return device;
    };

    this.getAllSensorData = function(sensorId) {
        var sensorData = [];
        console.log("Fetching all sensors data");
        for (var i = 0; i < data.length; i++) {
            console.log("Looking up " + data[i].id);
            sensorData.concat(data[i].getSensorData(sensorId));
        }

        return sensorData;
    }
};

var Device = function(id) {
    this.id = id;
    var self = this;
    this.sensors = [];

    this.addSensorData = function(sensorId, value) {
        var sensor = null;
        for (var i = 0; i < self.sensors.length; i++) {
            if (self.sensors[i].id === sensorId) {
                sensor = self.sensors[i];
                break;
            }
        }
        if (sensor === null) {
            sensor = new Sensor(sensorId);
            self.sensors.push(sensor);
        }

        sensor.addData(value);
    };

    this.getSensorData = function(sensorId) {
        console.log("Getting sensor data for " + self.id + ", sensor: " + sensorId);
        console.log(self.sensors);
        console.log(self.sensors[0]._data);
        var sensorData = [];
        for (var i = 0; i < self.sensors.length; i++) {
            if (self.sensors[i].id === sensorId) {
                for (var j = 0; j < self.sensors[i]._data.length; j++) {
                    sensorData.push(self.sensors[i]._data[j].value);
                }
                break;
            }
        }
        console.log(sensorData);
        return sensorData;
    }
};

var Sensor = function(id) {
    this.id = id;
    var self = this;
    this._data = [];
    this.addData = function(data) {
        var sensorData = {
            value: data,
            timestamp: (new Date()).getTime()
        };
        self._data.push(sensorData);
    }
};

module.exports = new devicesCollection();