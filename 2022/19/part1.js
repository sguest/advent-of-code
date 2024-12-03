let lib = require('../../lib');

let year = 2022;
let day = 19;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let blueprints = [];
    for(let line of lines) {
        let parsed = /^Blueprint (\d+): Each ore robot costs (\d+) ore\. Each clay robot costs (\d+) ore\. Each obsidian robot costs (\d+) ore and (\d+) clay\. Each geode robot costs (\d+) ore and (\d+) obsidian\.$/.exec(line);
        blueprints.push({
            id: +parsed[1],
            bots: {
                ore: { cost: { ore: +parsed[2] } },
                clay: { cost: { ore: +parsed[3] } },
                obsidian: { cost: { ore: +parsed[4], clay: +parsed[5] } },
                geode: { cost: { ore: +parsed[6], obsidian: +parsed[7] } },
            }
        })
    }

    let total = 0;
    for(let blueprint of blueprints) {
        let maxCosts = {
            ore: 0,
            clay: blueprint.bots.obsidian.cost.clay,
            obsidian: blueprint.bots.geode.cost.obsidian,
            geode: Infinity
        };
        for(let botType in blueprint.bots) {
            maxCosts.ore = Math.max(maxCosts.ore, blueprint.bots[botType].cost.ore);
        }
        let start = { resources: { ore: 0, clay: 0, obsidian: 0, geode: 0 }, time: 0, bots: { ore: 1, clay: 0, obsidian: 0, geode: 0 } };
        let queue = new lib.linkedList();
        queue.push(start);
        let max = 0;
        while(queue.any()) {
            let current = queue.shift();
            max = Math.max(max, current.resources.geode + current.bots.geode * (24 - current.time));
            for(let botType in blueprint.bots) {
                if(current.bots[botType] < maxCosts[botType]) {
                    let timeToBuy = 0;
                    for(let costType in blueprint.bots[botType].cost) {
                        if(current.bots[costType] === 0) {
                            timeToBuy = Infinity;
                        }
                        else {
                            timeToBuy = Math.max(timeToBuy, Math.ceil((blueprint.bots[botType].cost[costType] - current.resources[costType]) / current.bots[costType]));
                        }
                    }

                    timeToBuy++;

                    if(24 - current.time > timeToBuy) {
                        let newResources = { ...current.resources };
                        for(let botType in current.bots) {
                            newResources[botType] += timeToBuy * current.bots[botType];
                        }
                        for(let costType in blueprint.bots[botType].cost) {
                            newResources[costType] -= blueprint.bots[botType].cost[costType];
                        }
                        let newBots = { ...current.bots };
                        newBots[botType]++;
                        queue.push({ resources: newResources, time: current.time + timeToBuy, bots: newBots });
                    }
                }
            }
        }

        total += blueprint.id * max;
    }

    console.log(total);
}).catch((err) => {
    console.log(err, err.stack);
});