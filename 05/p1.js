const fs = require('fs');

let data = fs.readFileSync('input.txt', 'utf8');
let lines = data.split(/\n/);
let maxSeatID = 0;

lines.forEach((l) => {
    let binary = convertToBinary(l);
    console.log(binary);

    let rowBits = binary.substr(0,7);
    let columnBits = binary.substr(7);

    let rowNum = parseInt(rowBits, 2);
    let colNum = parseInt(columnBits, 2);
    let id = (rowNum * 8) + colNum;

    if(id > maxSeatID) 
        maxSeatID = id;

    console.log(`${binary}\tRow: ${rowNum}  Col: ${colNum}  SeatID: ${id}`);
});

console.log(`Max seat ID: ${maxSeatID}`);

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