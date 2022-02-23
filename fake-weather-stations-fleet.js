// Dependencies
const awsIot = require('aws-iot-device-sdk');

const today = new Date();
const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const dateTime = date + ' ' + time;

const device = awsIot.device({
    clientId: 'fake-weather-station-2',
    // clientId: 'sdk-nodejs-a0a563bc-ae1b-460b-93cc-1335710015b6',
    host: 'a16z51cgzk8vdr-ats.iot.eu-central-1.amazonaws.com',
    // port: 8883,
    keyPath: './certs/fake-weather-station-2.private.key',
    certPath: './certs/fake-weather-station-2.cert.pem',
    caPath: './certs/root-CA.crt',
    protocol: "mqtts",
    keepalive: 300,
    baseReconnectTimeMs: 4000,
    debug: true
});


// Telemetry data
const IoTDevice = {
    serialNumber: "SN-D7F3C8947867",
    dateTime,
    activated: true,
    device: "MyRaspperry-01",
    type: "MySmartIoTDevice",
    payload: {}
}

/** TOPICS
 * "core/broadcast":  The device will subscribe to a broadcast topic, this will be used to send out messages from the cloud to all IoT devices connected.
 * "topicHouse1:: This topic is used for a specific home and for an specific purpose. In this case, we can use it for send temperature data.
 */

const topic = "test-topic"

device.subscribe(topic);
// device.subscribe('topic_1');

const sendData = (data) => {
    const telemetryData = {
        ...IoTDevice,
        payload: data
    }
    console.log(`STEP - Sending data to AWS  IoT Core'`, telemetryData)
    console.log(`---------------------------------------------------------------------------------`)
    return device.publish(topic, JSON.stringify(telemetryData))
}

// We connect our client to AWS  IoT core.
device
  .on('connect', function () {
      console.log('STEP - Connecting to AWS  IoT Core');
      console.log(`---------------------------------------------------------------------------------`)
      setInterval(() => sendData({ temp: '100°C', humidity: '52%' }), 3000)
  });



// Set handler for the device, it will get the messages from subscribers topics.
// device
//   .on('message', function (topic, payload) {
//       console.log('message', topic, payload);
//   });
//
// device
//   .on('error', function (topic, payload) {
//       console.log('Error:', topic, payload ? payload.toString() : "Unexpected error");
//   });
device
  .on('connect', function() {
      console.log('connect');
  });
device
  .on('close', function() {
      console.log('close');
  });
device
  .on('reconnect', function() {
      console.log('reconnect');
  });
device
  .on('offline', function() {
      console.log('offline');
  });
device
  .on('error', function(error) {
      console.log('error', error);
  });
device
  .on('message', function(topic, payload) {
      console.log('message', topic, payload.toString());
  });
