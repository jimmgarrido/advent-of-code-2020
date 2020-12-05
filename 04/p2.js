const fs = require('fs');
const req_fields = [
    "byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"
];

let validPassportCount = 0;

let data = fs.readFileSync('input.txt', 'utf8');
let lines = data.split(/\n\n/);

lines.forEach((line) => {
    let reqFieldCount = 0;
    let isValidPassport = false;

    req_fields.forEach((f) => {
        if(line.includes(f)) {
            reqFieldCount++;
        }
    });

    if(reqFieldCount == 7) {
        let fields = [...line.matchAll(/(?<field>\w+):(?<value>.\w*)/g)];

        isValidPassport = validateFields(fields);
    }

    if(isValidPassport) {
        validPassportCount++;
    }
});

function validateFields(fields) {
    const eyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
    let isValid = true;

    for(i=0; i<fields.length; i++) {
        let field = fields[i].groups.field;
        let data = fields[i].groups.value;

        if (field == "byr") {
            if(Number(data) < 1920 || Number(data) > 2002) {
                isValid = false;
            } 
        } else if (field == "iyr") {
            if(Number(data) < 2010 || Number(data) > 2020) {
                isValid = false;
            }
        } else if (field == "eyr") {
            if(Number(data) < 2020 || Number(data) > 2030) {
                isValid = false;
            }
        } else if (field == "hgt") {
            let heightMatch = data.match(/(?<height>\d+)(?<unit>cm|in)/);

            if(heightMatch) {
                let height = heightMatch.groups.height;
                let unit = heightMatch.groups.unit;

                if(unit == "in") {
                    if(height < 59 || height > 76) {
                        isValid = false;
                    } 
                } else if (unit == "cm") {
                    if(height < 150 || height > 193) {
                        isValid = false;
                    }
                }
            } else {
                isValid = false;
            }
        } else if (field == "hcl") {
            let hairMatch = data.match(/#([a-f]|[0-9]){6}/);

            if(!hairMatch) {
                isValid = false;
            }
        } else if (field == "ecl") {
            if(!eyeColors.includes(data)) {
                isValid = false;
            }
        } else if (field == "pid") {
            let pidMatch = data.match(/\d+/);
            
            if(!pidMatch) {
                isValid = false;
            } else if (pidMatch[0].length != 9) {
                isValid = false;
            }
        } 

        if(!isValid) {
            break;
        }
    }

    return isValid;
}

console.log(`Number of valid passports: ${validPassportCount}`);