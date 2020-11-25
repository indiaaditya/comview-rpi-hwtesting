const serialPort = require('serialport');

var ports;
async function getListOfSerialPorts() {
    let list = await serialPort.list();
    console.log(list.comName);
}


getListOfSerialPorts();

