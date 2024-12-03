let lib = require('../../lib');
let parser = require('./parser');
let combatEngine = require('./combatEngine');

let year = 2018;
let day = 15;

lib.getInput(year, day).then((data) => {
    let parsed = parser(data);

    let grid = parsed.grid;
    let originalCombatants = parsed.combatants;

    let elfAttack = 3;
    let turnCount = 0;
    let combatants;

    while(turnCount <= 0) {
        elfAttack++;

        combatants = [];
        for(let c of originalCombatants) {
            combatants.push({type: c.type, x: c.x, y: c.y, hp: c.hp});
        }

        turnCount = combatEngine(grid, combatants, elfAttack, true);
    }

    console.log(turnCount * combatants.map(x => x.hp).reduce((a, b) => a + b));
}).catch((err) => {
    console.log(err.stack);
});