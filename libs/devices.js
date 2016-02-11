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

	this.reset = function() {
		data = [];
	}

    this.createDevice = function(id) {
        var device = new Device(id);
        data.push(device);
        return device;
    };

    this.getAllSensorData = function(sensorId) {
        var sensorData = [];
        console.log("Fetching all sensors data");
        for (var i = 0; i < data.length; i++) {
            sensorData.push([data[i].id.substr(0,8)].concat(data[i].getSensorData(sensorId)));
        }

        return sensorData;
    }

    this.getAllSensorTimeData = function(sensorId) {
        var sensorData = [];
        console.log("Fetching all sensors time data");
        for (var i = 0; i < data.length; i++) {
            sensorData.push(["x"].concat(data[i].getTimeData(sensorId)));
            sensorData.push([data[i].id.substr(0,8)].concat(data[i].getSensorData(sensorId)));
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

    this.getSensorById = function(sensorId) {
        var sensor = null;
        for (var i = 0; i < this.sensors.length; i ++) {
            if (this.sensors[i].id === sensorId) {
                sensor = this.sensors[i];
                break;
            }
        }
        return sensor;
    };

    this.getSensorData = function(sensorId) {
        var sensorData = [];
        var sensor = this.getSensorById(sensorId);
        if (sensor !== null) {
            for (var i = 0; i < sensor._data.length; i++) {
                sensorData.push(parseFloat(sensor._data[i].value));
            }
        }
        return sensorData;
    }

    this.getTimeData = function(sensorId) {
        var timeData = [];
        var sensor = this.getSensorById(sensorId);
        if (sensor !== null) {
            for (var i = 0; i < sensor._data.length; i++) {
                timeData.push(sensor._data[i].timestamp);
            }
        }
        return timeData;
    }

};

var Sensor = function(id) {
    this.id = id;
    var self = this;
    this._data = [];
    this.addData = function(data) {
        var sensorData = {
            value: data,
            timestamp: Date.now()
        };
        if (self._data.length >= 361) {
            self._data.shift();
        }
        self._data.push(sensorData);
    }
};

module.exports = new devicesCollection();
