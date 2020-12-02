const fs = require('fs');

let data = fs.readFileSync('input.txt', 'utf8');

let lines = data.split('\n');
let numArray = [];

lines.forEach((l) => {
    numArray.push(Number(l));
});

// numArray.forEach((n) => {
//     console.log(n);
// })

for(let i=0; i<numArray.length; i++) {
    let x = numArray[i];
    let y;
    let found = false;

    for(let j=0; j<numArray.length; j++) {
        if (j != i) {
            let sum = x + numArray[j];

            if(sum == 2020) {
                y = numArray[j];

                console.log('x: ' + x );
                console.log('y: ', + y);

                let product = x*y;
                console.log('product: ' + product);

                found = true;
                break;
            }
        }
    }

    if(found) {
        break;
    }
}

//Alt
// for(let i=0; i<numArray.length; i++) {
//     let x = numArray[i];
//     let y;

//     let diff = 2020 - x;

//     if(diff >= 0) {

//         let yindex = numArray.indexOf(diff);

//         if(yindex != -1) {
//             y = numArray[yindex];

//             console.log('x: ' + x );
//             console.log('y: ', + y);

//             let product = x*y;
//             console.log('product: ' + product);

//             break;
//         } 
//     }
// }