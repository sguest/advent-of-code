let inputHp = 103;
let inputDamage = 9;
let inputArmor = 2;

let weapons = [
    {cost: 8, damage: 4},
    {cost: 10, damage: 5},
    {cost: 25, damage: 6},
    {cost: 40, damage: 7},
    {cost: 74, damage: 8},    
];

let armors = [
    {cost: 0, armor: 0},
    {cost: 13, armor: 1},
    {cost: 31, armor: 2},
    {cost: 53, armor: 3},
    {cost: 75, armor: 4},
    {cost: 102, armor: 5},
];

let rings = [
    {cost: 0, armor: 0},
    {cost: 0, armor: 0},
    {cost: 25, damage: 1},
    {cost: 50, damage: 2},
    {cost: 100, damage: 3},
    {cost: 20, armor: 1},
    {cost: 40, armor: 2},
    {cost: 80, armor: 3},
];

let maxGold = 0;

for(let weapon of weapons) {
    for(let armor of armors) {
        for(let ringIndex1 = 0; ringIndex1 < rings.length; ringIndex1++) {
            let ring1 = rings[ringIndex1];
            for(let ringIndex2 = ringIndex1 + 1; ringIndex2 < rings.length; ringIndex2++) {
                let ring2 = rings[ringIndex2];
                let items = [weapon, armor, ring1, ring2];
                let cost = items.map(x => x.cost).reduce((a, b) => a + b);
                let damage = items.map(x => x.damage || 0).reduce((a,b) => a + b);
                let armorValue = items.map(x => x.armor || 0).reduce((a,b) => a + b);
                let hp = 100;
                let bossHp = inputHp;
                let myTurn = true;

                while(hp > 0 && bossHp > 0) {
                    if(myTurn) {
                        bossHp -= Math.max(damage - inputArmor, 1);
                    }
                    else {
                        hp -= Math.max(inputDamage - armorValue, 1);
                    }
                    myTurn = !myTurn;
                }

                if(bossHp > 0) {
                    maxGold = Math.max(maxGold, cost);
                }
            }
        }
    }
}

console.log(maxGold);