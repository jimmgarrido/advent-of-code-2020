const rl = require('readline');
const fs = require('fs');

let validCount = 0;

function isValidPassword(details) {
    let regex = new RegExp(`[${details.char}]`, 'gi');

    var matches = [...details.pass.matchAll(regex)];

    if(matches.length >= details.min && matches.length <= details.max) {
        return true;
    } else {
        return false;
    }
}

function parseLine(line) {
    let regex = /(\d+)-(\d+)\s*(\w):\s*(\w*)/; //thanks https://regexr.com/ <3

    const match = line.match(regex);

    if(match) {
        let item = {
            min: Number(match[1]),
            max: Number(match[2]),
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