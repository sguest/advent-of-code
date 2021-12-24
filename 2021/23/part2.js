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

    for(let amphi of initial) {
        if(amphi.y === 2) {
            amphi.y = 4;
        }
    }

    initial.push(
        { type: 'D', x: 2, y: 2 },
        { type: 'D', x: 2, y: 3 },
        { type: 'C', x: 4, y: 2 },
        { type: 'B', x: 4, y: 3 },
        { type: 'B', x: 6, y: 2 },
        { type: 'A', x: 6, y: 3 },
        { type: 'A', x: 8, y: 2 },
        { type: 'C', x: 8, y: 3 },
    );

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
            if(done >= 16) {
                console.log(currentEnergy);
                process.exit(0);
            }

            for(let i = 0; i < state.amphis.length; i++) {
                let amphi = state.amphis[i];
                let done = false;
                if(amphi.x === homes[amphi.type]) {
                    if(amphi.y >= 1) {
                        done = true;
                        for(let yy = amphi.y + 1; yy <= 4; yy++) {
                            let occupied = getOccupied(state.amphis, amphi.x, yy);
                            if(!occupied || occupied.type !== amphi.type) {
                                done = false;
                            }
                        }
                    }
                }
                if(!done) {
                    if(amphi.y === 0) {
                        let targetY = 4;
                        let searching = true;
                        while(searching && targetY > 0) {
                            let inHome = getOccupied(state.amphis, homes[amphi.type], targetY);
                            if(!inHome) {
                                searching = false;
                            }
                            else if(inHome.type !== amphi.type) {
                                targetY = 0;
                                searching = false;
                            }
                            else {
                                targetY--;
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
                        let y = amphi.y;
                        while(y > 0) {
                            y--;
                            if(getOccupied(state.amphis, amphi.x, y)) {
                                blocked = true;
                                y = 0;
                            }
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