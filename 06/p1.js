const fs = require('fs');

let file = fs.readFileSync('input.txt', 'utf8');

let lines = file.split(/\n\n/);

let groups = [];

lines.forEach((l) => {
    let trimmed = l.replace(/\n/g, '');

    //https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/set
    let set = [...new Set(trimmed)];

    groups.push(set);
    
    console.log(`${trimmed}\n${set}\n\n`);
});

let sum = 0;
groups.forEach((g) => {
    sum += g.length;
});

console.log(`Sum: ${sum}`);