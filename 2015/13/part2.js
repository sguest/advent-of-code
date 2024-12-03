let lib = require('../../lib');

let year = 2015;
let day = 13;

lib.getInput(year, day).then((data) => {
    let parser = /^([a-z]+) would (gain|lose) (\d+) happiness units by sitting next to ([a-z]+)\.$/i;
    let people = ['Me'];
    let deltas = {};
    for(var line of data.split('\n')) {
        let parsed = parser.exec(line);

        if(people.indexOf(parsed[1]) === -1) {
            people.push(parsed[1]);
        }

        if(people.indexOf(parsed[4]) === -1) {
            people.push(parsed[4]);
        }

        let amount = parseInt(parsed[3]);

        if(parsed[2] === 'lose') {
            amount = -amount;
        }

        deltas[parsed[1] + parsed[4]] = amount;
    }

    let maxHappiness = 0;

    for(let order of lib.permutations(people)) {
        let happiness = 0;

        for(let index = 0; index < order.length; index++) {
            happiness += (deltas[order[index] + order[(index + 1) % order.length]] || 0) + (deltas[order[(index + 1) % order.length] + order[index]] || 0);
        }

        maxHappiness = Math.max(happiness, maxHappiness);
    }

    console.log(maxHappiness);
});