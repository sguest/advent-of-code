const lib = require('../../lib');

lib.getInput(2015, 22).then((data) => {
    let lines = data.split('\n');
    let inputHp = +lines[0].split(': ')[1];
    let inputDamage = +lines[1].split(': ')[1];

    let queue = new lib.linkedList();
    queue.push({bossHp: inputHp, playerHp: 50, mana: 500, spentMana: 0, poisonCount: 0, shieldCount: 0, rechargeCount: 0});

    let minMana = Infinity;

    function tryCast(state, manaCost) {
        if(state.mana < manaCost) {
            return null;
        }
        return {
            bossHp: state.bossHp,
            playerHp: state.playerHp,
            mana: state.mana - manaCost,
            spentMana: state.spentMana + manaCost,
            poisonCount: state.poisonCount,
            shieldCount: state.shieldCount,
            rechargeCount: state.rechargeCount
        }
    }

    function checkDeath(state) {
        if(state.bossHp > 0) {
            return false;
        }
        minMana = Math.min(state.spentMana, minMana);
        return true;
    }

    function applyStatus(state) {
        if(state.shieldCount > 0){
            state.shieldCount--;
        }
        if(state.rechargeCount > 0) {
            state.rechargeCount--;
            state.mana += 101;
        }
        if(state.poisonCount > 0) {
            state.poisonCount--;
            state.bossHp -= 3;
        }
        return checkDeath(state);
    }

    while(queue.length) {
        let state = queue.shift();
        
        if(state.spentMana >= minMana) {
            continue;
        }

        if(applyStatus(state)) {
            continue;
        }

        let newStates = [];

        let newState = tryCast(state, 53);
        if(newState) {
            newState.bossHp -= 4;
            if(!checkDeath(newState)) {
                newStates.push(newState);
            }
        }

        newState = tryCast(state, 73)
        if(newState) {
            newState.bossHp -= 2;
            newState.playerHp += 2;
            if(!checkDeath(newState)) {
                newStates.push(newState);
            }
        }

        if(state.shieldCount === 0) {
            newState = tryCast(state, 113);
            if(newState) {
                newState.shieldCount = 6;
                newStates.push(newState);
            }
        }

        if(state.poisonCount === 0) {
            newState = tryCast(state, 173);
            if(newState) {
                newState.poisonCount = 6;
                newStates.push(newState);
            }
        }

        if(state.rechargeCount === 0) {
            newState = tryCast(state, 229);
            if(newState) {
                newState.rechargeCount = 5;
                newStates.push(newState);
            }
        }

        for(let newState of newStates) {
            if(applyStatus(newState)) {
                continue;
            }
            let damage = inputDamage;
            if(newState.shieldCount > 0) {
                damage = Math.max(damage-7, 1);
            }
            newState.playerHp -= damage;
            if(newState.playerHp > 0) {
                queue.push(newState);
            }
        }
    }

    console.log(minMana);
});