const fs = require('fs');

let data = fs.readFileSync('input.txt', 'utf8');
let lines = data.split(/\n/);
let maxSeatID = 0;
let seatIds = [];

lines.forEach((l) => {
    let binary = convertToBinary(l);
    console.log(binary);

    let rowBits = binary.substr(0,7);
    let columnBits = binary.substr(7);

    let rowNum = parseInt(rowBits, 2);
    let colNum = parseInt(columnBits, 2);
    let id = (rowNum * 8) + colNum;

    seatIds.push(id);

    if(id > maxSeatID) 
        maxSeatID = id;
});

seatIds.sort((a, b) => a - b);

let seatBefore = seatIds.find((value, index, array) => {
    let next = index + 1;

    if(next < array.length) {
        let diff = array[next] - value;

        if(diff == 2) {
            return true;
        }
    }
});

let mySeat = seatBefore + 1;

seatIds.forEach((s) => {
    console.log(s);
});

console.log(`My seat: ${mySeat}`);

function convertToBinary(toParse) {
    let bitString = '';

    for(i=0; i<toParse.length; i++) {
        let char = toParse[i];

        if(char == 'F' || char == 'L')
            bitString += '0';
        else if (char == 'B' || char == 'R')
            bitString += '1'
    }

    return bitString;
}

// var test = (128 >> 0).toString();

// test = parseInt("1000110", 2);
// console.log(test);