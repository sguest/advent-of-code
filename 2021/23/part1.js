let lib = require('../../lib');

let year = 2021;
let day = 23;

function getOccupied(amphis, x, y) {
    for(let amphi of amphis) {
        if(amphi.x === x && amphi.y === y) {
            return amphi;
        }
    }
    return null;
}

function getStateString(amphis) {
    return amphis.map(a => `${a.type},${a.x},${a.y}`).join(':');
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    lines.shift();
    let initial = [];
    for(let y = 0; y < lines.length; y++) {
        for(let x = 0; x < lines[y].length; x++) {
            if(/[A-D]/.test(lines[y][x])) {
                initial.push({x: x-1, y, type: lines[y][x]});
            }
        }
    }

    let energy = {
        A: 1,
        B: 10,
        C: 100,
        D: 1000.
    };

    let homes = {
        A: 2,
        B: 4,
        C: 6,
        D: 8,
    };

    let queues = [];
    queues[0] = [{ amphis:initial }];
    let visited = {};
    visited[getStateString(initial)] = 0;

    function addToQueue(amphis, index, type, x, y, energy) {
        let newAmphis = amphis.slice();
        newAmphis[index] = { type, x, y };
        let stateString = getStateString(newAmphis);
        let best = visited[stateString];
        if(best === undefined || best > energy) {
            visited[stateString] = energy;
            queues[energy] = queues[energy] || [];
            queues[energy].push({amphis: newAmphis});
        }
    }

    let currentEnergy = 0;
    while(true) {
        while(queues[currentEnergy] && queues[currentEnergy].length) {
            let state = queues[currentEnergy].pop();

            let done = 0;
            for(let amphi of state.amphis) {
                if(amphi.x === homes[amphi.type]) {
                    done++;
                }
            }
            if(done >= 8) {
                console.log(currentEnergy);
                process.exit(0);
            }

            for(let i = 0; i < state.amphis.length; i++) {
                let amphi = state.amphis[i];
                let done = false;
                if(amphi.x === homes[amphi.type]) {
                    if(amphi.y === 2) {
                        done = true;
                    }
                    else if(amphi.y === 1) {
                        let occupied = getOccupied(state.amphis, amphi.x, 2);
                        if(occupied && occupied.type === amphi.type) {
                            done = true;
                        }
                    }
                }
                if(!done) {
                    if(amphi.y === 0) {
                        let targetY;
                        let inHome = getOccupied(state.amphis, homes[amphi.type], 2);
                        if(!inHome) {
                            targetY = 2
                        }
                        else if(inHome.type === amphi.type) {
                            if(!getOccupied(state.amphis, homes[amphi.type], 1)) {
                                targetY = 1;
                            }
                        }
                        if(targetY > 0) {
                            let spentEnergy = 0;
                            let xDirection;
                            let x = amphi.x;
                            if(x > homes[amphi.type])  {
                                xDirection = -1;
                            }
                            else {
                                xDirection = 1;
                            }
                            while(x !== homes[amphi.type] && !getOccupied(state.amphis, x + xDirection, 0)) {
                                x += xDirection;
                                spentEnergy += energy[amphi.type];
                            }
                            if(x === homes[amphi.type]){
                                spentEnergy += energy[amphi.type] * targetY;
                                let newEnergy = currentEnergy + spentEnergy;

                                addToQueue(state.amphis, i, amphi.type, x, targetY, newEnergy);
                            }
                        }
                    }
                    else {
                        let blocked = false;
                        if(amphi.y === 2) {
                            blocked = !!getOccupied(state.amphis, amphi.x, 1);
                        }
                        if(!blocked) {
                            let baseEnergy = energy[amphi.type] * amphi.y;
                            let x = amphi.x;
                            let spentEnergy = baseEnergy;
                            while(x > 0 && !getOccupied(state.amphis, x - 1, 0)) {
                                x--;
                                spentEnergy += energy[amphi.type];
                                if(x % 2 === 1 || x === 0) {
                                    addToQueue(state.amphis, i, amphi.type, x, 0, spentEnergy + currentEnergy);
                                }
                            }
                            x = amphi.x;
                            spentEnergy = baseEnergy;
                            while(x < 10 && !getOccupied(state.amphis, x + 1, 0)) {
                                x++;
                                spentEnergy += energy[amphi.type];
                                if(x % 2 === 1 || x === 10) {
                                    addToQueue(state.amphis, i, amphi.type, x, 0, spentEnergy + currentEnergy);
                                }
                            }
                        }
                    }
                }
            }
        }
        currentEnergy++;
    }
}).catch((err) => {
    console.log(err, err.stack);
});