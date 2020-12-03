/**
 *  - Map repeats to the right
 *  - Map is 31 squares across
 *  - Every 31 moves right means starting 31 squares below input map
 * 
 * 
 *  .#.#....#......#....##.....X...
 *  .#.#....#......#....##........X
 *  .#X#....#......#....##.........
 *  .#.#.X..#......#....##.........
 *  .#.#....X......#....##.........
 *  .#.#....#..X...#....##.........
 * 
 */

const fs = require('fs');

let map = [];
let x = 0;
let y = 0;
let treeCount = 0;

let input = fs.readFileSync('input.txt', 'utf8');
let lines = input.split('\n');

function move() {
    x = (x + 3) % 31;
    y = y + 1;

    // console.log(`x: ${x}, y: ${y}`);

    let point = map[y][x];

    if(point == '#') {
        treeCount++;
    }

    map[y][x] = 'X';
}

function canMove() {
    if(y + 1 >= map.length) {
        return false;
    } else {
        return true;
    }
}

lines.forEach((l) => {
    let row = [];

    [...l].forEach((c) => {
        row.push(c);
    });

    map.push(row);
});


while(canMove()) {
    move();
}

map.forEach((r) => {
    [...r].forEach((p) => {
        process.stdout.write(p);
    });

    process.stdout.write('\n');
});

console.log(`\n Number of trees: ${treeCount}`);