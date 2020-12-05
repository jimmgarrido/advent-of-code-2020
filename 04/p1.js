const fs = require('fs');
const req_fields = [
    "byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"
];

let validPassportCount = 0;

let data = fs.readFileSync('input.txt', 'utf8');
let lines = data.split(/\n\n/);

lines.forEach((line) => {
    let validFields = 0;

    req_fields.forEach((f) => {
        if(line.includes(f)) {
            validFields++;
        }
    });

    if(validFields == 7) {
        validPassportCount++;
    }
});

console.log(`Number of valid passports: ${validPassportCount}`);