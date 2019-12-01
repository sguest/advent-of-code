module.exports = function(grid, combatants, elfAttack, exitOnElfDeath) {
    let turnCount = 0;

    while(true) {
        combatants = combatants.sort((a, b) => (a.y * 1000 + a.x) - (b.y * 1000 + b.x)) ;

        let cIndex = 0;
        while(cIndex < combatants.length) {
            let combatant = combatants[cIndex];
            let enemies = combatants.filter(x => x.type !== combatant.type);
            if(!enemies.length) {
                return turnCount;
            }

            let attackTargets = [];

            for(let comb2 of enemies) {
                if((comb2.x === combatant.x && comb2.y === combatant.y - 1) || (comb2.x === combatant.x && comb2.y === combatant.y + 1) || (comb2.x === combatant.x - 1 && comb2.y === combatant.y) || (comb2.x === combatant.x + 1 && comb2.y === combatant.y)) {
                    attackTargets.push(comb2);
                }
            }

            if(!attackTargets.length) {
                let moveTargets = [];

                for(let enemy of enemies) {
                    moveTargets.push({x: enemy.x - 1, y: enemy.y});
                    moveTargets.push({x: enemy.x + 1, y: enemy.y});
                    moveTargets.push({x: enemy.x, y: enemy.y - 1});
                    moveTargets.push({x: enemy.x, y: enemy.y + 1});
                }

                let starts = [];

                starts.push({location: {x: combatant.x - 1, y: combatant.y}});
                starts.push({location: {x: combatant.x + 1, y: combatant.y}});
                starts.push({location: {x: combatant.x, y: combatant.y - 1}});
                starts.push({location: {x: combatant.x, y: combatant.y + 1}});

                for(let start of starts) {
                    let path = [];
                    let visited = {};

                    path.push({x: start.location.x, y: start.location.y, steps: 1});

                    pathLoop: while(path.length) {
                        let current = path.pop();
                        let id = current.x + ',' + current.y;

                        if(grid[current.x][current.y]) {
                            continue pathLoop;
                        }

                        for(let comb2 of combatants) {
                            if(comb2 !== combatant && comb2.x === current.x && comb2.y === current.y) {
                                continue pathLoop;
                            }
                        }

                        if(!visited[id] || visited[id].steps > current.steps) {
                            visited[id] = {x: current.x, y: current.y, steps: current.steps};

                            path.push({x: current.x - 1, y: current.y, steps: current.steps + 1});
                            path.push({x: current.x + 1, y: current.y, steps: current.steps + 1});
                            path.push({x: current.x, y: current.y - 1, steps: current.steps + 1});
                            path.push({x: current.x, y: current.y + 1, steps: current.steps + 1});
                        }
                    }

                    let minDistance = Infinity;
                    let candidates = [];

                    for(let target of moveTargets) {
                        let id = target.x + ',' + target.y;
                        if(visited[id]) {
                            if(visited[id].steps < minDistance) {
                                candidates = [visited[id]];
                                minDistance = visited[id].steps;
                            }
                            else if(visited[id].steps === minDistance) {
                                candidates.push(visited[id]);
                            }
                        }
                    }

                    if(candidates.length) {
                        candidates = candidates.sort((a, b) => (a.y * 1000 + a.x) - (b.y * 1000 + b.x));
                        start.target = candidates[0];
                    }
                }

                let minDistance = Infinity;
                let startCandidates = [];

                for(let start of starts) {
                    if(start.target) {
                        if(start.target.steps < minDistance) {
                            startCandidates = [start];
                            minDistance = start.target.steps;
                        }
                        else if(start.target.steps === minDistance) {
                            startCandidates.push(start);
                        }
                    }
                }

                if(startCandidates.length) {
                    startCandidates = startCandidates.sort((a, b) => (a.location.y * 1000 + a.location.x) - (b.location.y * 1000 + b.location.x));
                    combatant.x = startCandidates[0].location.x;
                    combatant.y = startCandidates[0].location.y;
                }
            }

            attackTargets = [];

            for(let comb2 of enemies) {
                if((comb2.x === combatant.x && comb2.y === combatant.y - 1) || (comb2.x === combatant.x && comb2.y === combatant.y + 1) || (comb2.x === combatant.x - 1 && comb2.y === combatant.y) || (comb2.x === combatant.x + 1 && comb2.y === combatant.y)) {
                    attackTargets.push(comb2);
                }
            }

            if(attackTargets.length) {
                attackTargets = attackTargets.sort((a ,b) => (a.hp * 100000 + a.y * 1000 + a.x) - (b.hp * 100000 + b.y * 1000 + b.x));
                let attackValue = 3;
                if(combatant.type === 'E') {
                    attackValue = elfAttack;
                }
                attackTargets[0].hp -= attackValue;
                if(attackTargets[0].hp <= 0) {
                    if(exitOnElfDeath && attackTargets[0].type === 'E') {
                        return -1;
                    }
                    let foundIndex = 0;
                    for(let cIndex2 = 0; cIndex2 < combatants.length; cIndex2++) {
                        if(combatants[cIndex2] === attackTargets[0]) {
                            foundIndex = cIndex2;
                            break;
                        }
                    }

                    combatants.splice(foundIndex, 1);

                    if(foundIndex < cIndex) {
                        cIndex--;
                    }
                }
            }
            cIndex++;
        }

        turnCount++;
    }
}