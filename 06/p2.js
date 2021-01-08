const fs = require('fs');

let file = fs.readFileSync('input.txt', 'utf8');

let groups = file.split(/\n\n/);
let groupSums = [];

groups.forEach((g) => {
    let groupSum = 0;
    let questionSet = new Set();
    let groupAnswers = g.split(/\n/);

    //Loop through each person's answers to create a set of all the questions the group answered yes to
    groupAnswers.forEach((answer) => {
        [...answer].forEach((question) => {
            questionSet.add(question);
        })
    });


    //Now loop through the Set of questions and check how many times it appears in the group's answers
    //https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/set#iterating_sets
    questionSet.forEach((q) => {
        let isPresent = true;
        groupAnswers.forEach((a) => {
            if(!a.includes(q)) {
                isPresent = false;
            }
        })

        if(isPresent) {
            groupSum++;
            console.log(q);
        }
    });

    groupSums.push(groupSum);
    console.log(`Group sum: ${groupSum}`);


    //https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/set
    // let set = [...new Set(trimmed)];
    
    // console.log(`${trimmed}\n${set}\n\n`);
    console.log('\n');
});

let totalSum = 0;
groupSums.forEach((s) => {
    totalSum += s;
});

console.log(`Total sum: ${totalSum}`);