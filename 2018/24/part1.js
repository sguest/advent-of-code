let lib = require('../../lib');

let year = 2018;
let day = 24;

function effectivePower(unit){
    return unit.count * unit.attackDamage;
}

function getDamage(attacker, defender) {
    let damage = effectivePower(attacker);

    if(defender.weak.indexOf(attacker.attackType) >= 0) {
        damage *= 2;
    }

    if(defender.immune.indexOf(attacker.attackType) >= 0) {
        damage = 0;
    }

    return damage;
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let currentTeam = 'Immune';
    let units = [];
    for(let line of lines) {
        let parsed = /(\d+) units each with (\d+) hit points (\([^)]*\) )?with an attack that does (\d+) ([a-z]+) damage at initiative (\d+)/.exec(line);

        if(parsed) {
            let count = +parsed[1];
            let hp = +parsed[2];
            let attackDamage = +parsed[4];
            let attackType = parsed[5];
            let initiative = +parsed[6];
            let immune = [];
            let weak = [];

            if(parsed[3]) {
                let sub = parsed[3].substring(1, parsed[3].length - 2);
                for(let part of sub.split(';')) {
                    part = part.trim();
                    let parts = part.split(/,? /);
                    if(parts[0] === 'immune') {
                        immune = parts.slice(2);
                    }
                    else if(parts[0] === 'weak') {
                        weak = parts.slice(2);
                    }
                }
            }

            units.push({
                count,
                hp,
                attackDamage,
                attackType,
                initiative,
                immune,
                weak,
                team: currentTeam
            })
        }
        else if(line === 'Infection:') {
            currentTeam = 'Infection';
        }
    }

    while(true) {
        units = units.sort((a, b) => {
            let effectiveA = effectivePower(a);
            let effectiveB = effectivePower(b);
            if(effectiveA === effectiveB) {
                return b.initiative - a.initiative;
            }
            return effectiveB - effectiveA;
        });
        claimedTargets = [];

        for(let unit of units) {
            unit.target = null;

            for(let target of units) {
                if(unit.team !== target.team && claimedTargets.indexOf(target) === -1) {
                    let bestDamage = 0;
                    if(unit.target) {
                        bestDamage = getDamage(unit, unit.target);
                    }
                    let targetDamage = getDamage(unit, target);

                    if(targetDamage > 0) {
                        if(targetDamage > bestDamage) {
                            unit.target = target;
                        }
                        else if(targetDamage === bestDamage) {
                            if(unit.target) {
                                if(effectivePower(target) > effectivePower(unit.target)) {
                                    unit.target = target;
                                }
                                else if(effectivePower(target) === effectivePower(unit.target)) {
                                    if(target.initiative > unit.target.initiative) {
                                        unit.target = target;
                                    }
                                }
                            }
                            else {
                                unit.target = target;
                            }
                        }
                    }
                }
            }
            if(unit.target) {
                claimedTargets.push(unit.target);
            }
        }

        units = units.sort((a, b) => b.initiative - a.initiative);

        for(unit of  units) {
            if(unit.target && unit.count >= 0) {
                let damage = getDamage(unit, unit.target);
                let casualties = Math.floor(damage / unit.target.hp);
                unit.target.count -= casualties;
            }
        }

        let unitIndex = 0;
        while(unitIndex < units.length) {
            if(units[unitIndex].count <= 0) {
                units.splice(unitIndex, 1);
            }
            else {
                unitIndex++;
            }
        }

        let immuneFound = false;
        let infectFound = false;

        for(let unit of units) {
            if(unit.team === 'Immune') {
                immuneFound = true;
            }
            else if(unit.team === 'Infection') {
                infectFound = true;
            }
        }

        if(!immuneFound || !infectFound) {
            break;
        }
    }

    console.log(units.map(u => u.count).reduce((prev, current) => prev + current));
}).catch((err) => {
    console.log(err.stack);
});