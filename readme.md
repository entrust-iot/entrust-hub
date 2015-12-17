URL: http://boiling-reef-5375.herokuapp.com

A basic implementation of an enterprise data hub.


API

GET /status
Returns a basic hello world with the current server status

POST /{device_id}/{sensor_id}/{value}
Posts a new value to the sensor of a specific device

GET /upsince
Returns the time the server was booted and the number of µs since it was started.

GET /{sensor_id}
Returns an array of all the values posted to a given {sensor_id}, all devices grouped together for now.
Most likely not a real world scenario, only implemented for the POC

GET /index.html
A dashboard displaying both the server status and some sensor graphs (displays graphs for "sensor1" and "sensor2")

This server also has a static server for all files in the /public_html folder.