const fs = require('fs');

let puzzle = fs.readFileSync('input.txt', 'utf8');
let lines = puzzle.split(/\n/);
let allRulesArray = [];
let validRuleCount = 0;
let validRulesArray = [];

lines.forEach((line) => {
    //split each rule into "outer" bag color and "inner" bag rules
    let regex = /(?<color>.+) bags contain (?<children>[^.]+)/g;
    let ruleMatch = [...line.matchAll(regex)];

    let bagColor = ruleMatch[0].groups.color;
    let childrenRules = ruleMatch[0].groups.children.split(',');
    let childRules = [];

    childrenRules.forEach((child) => {
        //parse child rules and push into an array
        let childRegex = /(?<count>\d+)\s(?<color>.+(?=\sbag))/g;
        let childMatches = [...child.matchAll(childRegex)];

        childMatches.forEach((m) => {
            childRules.push(
                {
                    count : m.groups.count,
                    color : m.groups.color
                }
            );
        });            
    });

    allRulesArray.push(
        {
            color : bagColor,
            children : childRules
        }
    );
});

allRulesArray.forEach((r) => { 
    console.log(`Checking ${r.color}\n`);

    if(checkBag(r)) {
        validRuleCount++;
        validRulesArray.push(r);
    }
});

console.log(`Valid rules: ${validRuleCount}`);

function checkBag(rule) {
    // Go through child bag rules recursively and check if there is
    // a bag in the chain that can hold a shiny gold bag
    
    for (child of rule.children) {
        if(child.color == 'shiny gold')
            return true;

        let newRule = allRulesArray.find( e => e.color == child.color);
        if(newRule != undefined) {
            console.log(`\tChecking ${newRule.color}\n`);
            if(checkBag(newRule))
                return true;
        }
    }
}