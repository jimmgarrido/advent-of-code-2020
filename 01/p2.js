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

let found = false;

for(let i=0; i<numArray.length; i++) {
    let x = numArray[i];

    for(let j=0; j<numArray.length; j++) {
        if (j != i) {
            let y = numArray[j];

            let sum = x + y;

            if(sum != 2020 || sum < 2020) {
                let diff = 2020 - sum;

                if (diff > 0) {
                    let index = numArray.indexOf(diff);

                    if(index != -1) {
                        let z = numArray[index];

                        console.log('x: ' + x );
                        console.log('y: ', + y);
                        console.log('z: ' + z);

                        let product = x*y*z;
                        console.log('product: ' + product);

                        found = true;
                        break;
                    }
                }
            }
        }
    }

    if(found) {
        break;
    }
}