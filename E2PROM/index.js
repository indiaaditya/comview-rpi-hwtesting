//index.js

var fs = require('fs');
var path = require('path');

let lclOS = process.platform;
var filePath = '';

let win32FileName = "e2prom";
let linuxFileName = "/sys/class/i2c-dev/i2c-1/device/1-0050/eeprom";
if (lclOS === "win32")
    path.basename = win32FileName;
else
    path.basename = linuxFileName;

const readArr = new Uint8Array();
const writeArr = new Uint8Array();

/*fs.open(Buffer.from(win32FileName),'r',(err,fd) =>{
    if(err)
        throw err;
});*/


let res = fs.readFile(win32FileName,'utf8',function(err,contents){
    if(err){
        console.log(err);
    }
    else{
        console.log('contents:' + contents);
        let lclBuffer = Buffer.from(contents,0,256);
        lclBuffer.forEach(printResult);
    }
});

function printResult(element,index){
    console.log('Location:Value' )
    console.log(index + ': ' + '0x' + element.toString(16));
}
//console.log('Result:' + res);