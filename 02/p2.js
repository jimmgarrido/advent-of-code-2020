const rl = require('readline');
const fs = require('fs');

let validCount = 0;

function isValidPassword(details) {
    const password = details.pass;
    const char = details.char;
    const x = details.x - 1;
    const y = details.y - 1;

    // console.log(`x: ${x}, y: ${y}`);

    let sum = 0;

    let first = password[x];

    if(first == char)
        sum++;

    let second = password[y];

    if(second == char)
        sum++;

    // console.log(`x: ${first}, y: ${second}`);

    if(sum == 1)
        return true;
    else 
        return false;
}

function parseLine(line) {
    let regex = /(\d+)-(\d+)\s*(\w):\s*(\w*)/; //thanks https://regexr.com/ <3

    const match = line.match(regex);

    if(match) {
        let item = {
            x: Number(match[1]),
            y: Number(match[2]),
            char: match[3],
            pass: match[4]
        };

        return item;
    }
}

//https://www.w3schools.com/nodejs/ref_readline.asp
let interface = rl.createInterface({
    input: fs.createReadStream('input.txt')
});

interface.on('line', (line) => {
    var credDetails = parseLine(line);
    var isValid = isValidPassword(credDetails);

    if(isValid) {
        validCount++;
    }
});

interface.on('close', () => {
    console.log(`# of valid passwords: ${validCount}`);
});