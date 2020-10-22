var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
const standard_input = process.stdin;
var RPI_STAT_LED = new Gpio(4, 'out');
var RPI_EXP_RST = new Gpio(27, 'out');
var RPI_SYS_WDOG = new Gpio(5, 'out');
var RPI_UARTS_RST = new Gpio(25, 'out');

console.log('Resetting all the outputs to Low....');

RPI_STAT_LED.writeSync(0);
RPI_EXP_RST.writeSync(0);
RPI_SYS_WDOG.writeSync(0);
RPI_UARTS_RST.writeSync(0);

console.log('Reset Done.');

console.log('Index:');
console.log('RPI_STAT_LED: GPI04::: l');
console.log('RPI_EXP_RST: GPIO27: r');
console.log('RPI_EXP_RST: GPIO05: w');
console.log('RPI_EXP_RST: GPIO25: u');
console.log('Pressing the character followed by enter at the end \n will toggle the respective output');

standard_input.on('data', function (data) {

    console.log('Data:' + data[0]);
    switch(data[0].toString()){
        case "l":
        case "L":
            toggleOutput(RPI_STAT_LED,'RPI_STAT_LED ');
            break;
        case "r":
        case "R":
            toggleOutput(RPI_EXP_RST,'RPI_EXP_RST ');
            break;
        case "w":
        case "W":
            toggleOutput(RPI_SYS_WDOG,'RPI_SYS_WDOG ');
            break;
        case "u":
        case "U":
            toggleOutput(RPI_UARTS_RST,'RPI_UARTS_RST ');
            break;
        default:
            console.log('Invalid option::'+ data);
            break;
    }

});

function toggleOutput(objOutput,strPrependMsg){
    if(objOutput.readSync() === 0){
        objOutput.writeSync(1);
        console.log(strPrependMsg + 'switched ON');
    }
    else{
        objOutput.writeSync(0);
        console.log(strPrependMsg + 'switched OFF');
    }

}
