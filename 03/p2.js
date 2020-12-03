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
const slopes = [
    {x: 1, y: 1},
    {x: 3, y: 1},
    {x: 5, y: 1},
    {x: 7, y: 1},
    {x: 1, y: 2}
];

let map = [];
let treeCounts = [];
let treesProduct = 0;
let input = fs.readFileSync('input.txt', 'utf8');
let lines = input.split('\n');

lines.forEach((l) => {
    let row = [];

    [...l].forEach((c) => {
        row.push(c);
    });

    map.push(row);
});

slopes.forEach((s) => {
    runSlope(s);   
});

treesProduct = treeCounts[0];
for(i=1; i<treeCounts.length; i++) {
    treesProduct = treesProduct * treeCounts[i];
}

console.log(`\n Number of trees: ${treesProduct}`);

function canMove(y) {
    if(y + 1 >= map.length) {
        return false;
    } else {
        return true;
    }
}

function runSlope(s) {
    let x = 0;
    let y = 0;
    let treeCount = 0;

    while(canMove(y)) {
        y = y + s.y;
        x = (x + s.x) % 31;

        let point = map[y][x];

        if(point == '#') {
            treeCount++;
        }
    } 

    treeCounts.push(treeCount);
}