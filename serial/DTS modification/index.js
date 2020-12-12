const serialPort = require('serialport');
const readline = require('readline');



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

var vExpectedInputAction = 0;
const EXPECT_TX_PORT = 10;
const EXPECT_RX_PORT = 20;
const DATA_TO_TXMIT = 30;
const NO_ACTION = 0;


rl.on('line',(input) => {
    switch(vExpectedInputAction){
        case EXPECT_TX_PORT:
            validate_tx_port_input(input);
            break;
        
        case EXPECT_RX_PORT:
            validate_rx_port_input(input);
            break;
        
        case DATA_TO_TXMIT:
            processDataToTx(input);
            break;

        case NO_ACTION:
        default:
            break;
    }
});

var ports;
var tx_port = '';
var rx_port = '';

async function getListOfSerialPorts() {
    let list = await serialPort.list();
    list.forEach(printPort);
}
var portArr = new Array();
function printPort(element,index){
    console.log('Port:' + element.path + ' Shortcut:' + index);
    portArr.push(element.path);
}

async function getListOfRxPorts(){
    console.log('\n\n\n Ports Available for reception:');
    portArr.forEach(printRxPort);
}

function printRxPort(element,index){
    console.log('Port:' + element + ' Shortcut:' + index);
}

function getTxPort(){
    console.log('Enter the shortcut number for the port to be used for TRANSMISSION:');
    vExpectedInputAction = EXPECT_TX_PORT;
}

function getRxPort(){
    console.log('Enter the shortcut number for the port to be used for RECEPTION:');
    vExpectedInputAction = EXPECT_RX_PORT;
}
var port_tx,port_rx;
function openTxPort(){
   port_tx =  new serialPort(tx_port,{ baudRate: 9600});
   port_tx.on('error',function(err){
       console.log('Failed to open the transmission port', err);
   });
   openRxPort();
}

function openRxPort() {
    port_rx = new serialPort(rx_port, { baudRate: 9600 });
    port_rx.on('error', function (err) {
        console.log('Failed to open the reception port', err);
    });
    port_rx.on('data', function (data) {
        console.log('**********RECEIVED DATA:**********');
        console.log(data);
        console.log('\n\n\n\n\nEnter the data to transmit:');

    });
    vExpectedInputAction = DATA_TO_TXMIT;
    console.log('Enter the data to transmit:');
}



/*
port_tx.on('open',function(){
    openRxPort();
});
*/
/*
port_rx.on('open',function(){
    console.log('Both the ports are open...');
})
*/
function getInputForTestData(){
    console.log('Enter the data to be transmitted:');
    
}

function validate_tx_port_input(input){
    let txShortcut;
    txShortcut = input;
    txShortcut = parseInt(txShortcut);
    if(txShortcut > portArr.length - 1 ){
        console.log('Invalid shortcut. Try again');
        getTxPort();
    }
    else{//indicates valid port selected
        vExpectedInputAction = NO_ACTION;
        console.log('Selected Tx Port:' + portArr[txShortcut]);
        tx_port = portArr[txShortcut];
        portArr.splice(txShortcut,1); // Remove the port from the list
        getListOfRxPorts();
        getRxPort();
    }
}

function openPortBegin(){
    console.log('\n Opening the port...');
    openTxPort();
}


function validate_rx_port_input(input){
    if(input > portArr.length - 1){
        console.log('Invalid shortcut. Try again');
        getRxPort();
    }
    else{
        vExpectedInputAction = NO_ACTION;
        console.log('Selected Rx Port:' + portArr[input]);
        rx_port = portArr[input];
        openPortBegin();
    }
}

function processDataToTx(input){
    //vExpectedInputAction = NO_ACTION;
    console.log('Debug:' + input);
    port_tx.write(input);
}

async function mainFunction(){
    await getListOfSerialPorts();
    getTxPort();     
    
}



mainFunction();


