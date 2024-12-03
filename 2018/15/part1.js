let lib = require('../../lib');
let parser = require('./parser');
let combatEngine = require('./combatEngine');

let year = 2018;
let day = 15;

lib.getInput(year, day).then((data) => {
    let parsed = parser(data);

    let grid = parsed.grid;
    let combatants = parsed.combatants;

    let turnCount = combatEngine(grid, combatants, 3, false);

    console.log(turnCount * combatants.map(x => x.hp).reduce((a, b) => a + b));
}).catch((err) => {
    console.log(err.stack);
});