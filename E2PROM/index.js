//index.js

var fs = require('fs');
var path = require('path');

let lclOS = process.platform;
var filePath = '';

let win32FileName = "e2prom";
let linuxFileName = "/sys/class/i2c-dev/i2c-1/device/1-0050/eeprom";
if (lclOS === "win32")
    filePath = win32FileName;
else
    filePath = linuxFileName;

const readArr = '';
const writeArr = '';

/*fs.open(Buffer.from(win32FileName),'r',(err,fd) =>{
    if(err)
        throw err;
});*/


let res = fs.readFile(filePath,'utf8',function(err,contents){
    if(err){
        console.log(err);
    }
    else{
        console.log('contents:' + contents);
        //var buffer = contents.split();
        console.log('This is the length of the output:' + contents.length);
        //let lclBuffer = Buffer.from(contents);
        //console.log('Location:Value' );
        printResult(contents);
    }
});

function printResult(rString){
    for (let i = 0; i < rString.length; i++){
        console.log(i + ': ' + '0x' + (rString.charAt(i)).charCodeAt(0));
    }
}

function readByte(rLocation){
    let lclByte = 0;

    return lclByte
}

function writeByte(rLocation,rValue){

}

function readInt16(rLocation){

}

function writeInt16(rLocation,rValue){

}

function readInt32(rLocation){

}

function writeInt32(rLocation,rValue){

}

function readString(rLocation,rBytes){

}

function writeString(rLocation,rString){

}

//console.log('Result:' + res);