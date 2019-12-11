let lib = require('../../lib');

function moveCommon(floors, currentFloor, itemName, nextFloor, itemType) {
    let newFloors = [];
    for(let floor of floors) {
        newFloors.push({chips: floor.chips.slice(), generators: floor.generators.slice()});
    }
    let itemIndex = newFloors[currentFloor][itemType].indexOf(itemName);
    let movedItem = newFloors[currentFloor][itemType].splice(itemIndex, 1)[0];
    newFloors[nextFloor][itemType].push(movedItem);
    return newFloors;
}

function moveGenerator(floors, currentFloor, generatorName, nextFloor) {
    return moveCommon(floors, currentFloor, generatorName, nextFloor, 'generators');
}

function moveChip(floors, currentFloor, chipName, nextFloor) {
    return moveCommon(floors, currentFloor, chipName, nextFloor, 'chips');    
}

function newAttempt(steps, floors, floorNum) {
    return {
        steps: steps,
        state: {
            floors: floors,
            currentFloor: floorNum
        }
    };
}

lib.getInput(2016, 11).then((data) => {
    let floors = [];
    for(let line of data.split('\n')) {
        line = line.replace(/^The [a-z]+ floor contains /, '').replace(/\.$/, '').replace(', and', ' and');
        let floor = {chips: [], generators: []};
        floors.push(floor);
        if(line !== 'nothing relevant') {
            let components = line.split(/, |and /);
            for(let component of components) {
                let parsed = /a ([a-z]+)-compatible microchip/.exec(component);
                if(parsed) {
                    floor.chips.push(parsed[1]);
                }
                else {
                    floor.generators.push(/a ([a-z]+) generator/.exec(component)[1]);
                }
            }
        }
    }

    floors[0].chips.push('elerium', 'dilithium');
    floors[0].generators.push('elerium', 'dilithium');

    let materialIndex = 0;

    for(let floor of floors) {
        for(let chipIndex = 0; chipIndex < floor.chips.length; chipIndex++) {
            let chip = floor.chips[chipIndex];
            for(let floor2 of floors) {
                let generatorIndex = floor2.generators.indexOf(chip);
                if(generatorIndex !== -1) {
                    floor2.generators[generatorIndex] = materialIndex;
                }
            }

            floor.chips[chipIndex] = materialIndex;
            materialIndex++;
        }
    }

    let state = {floors: floors, currentFloor: 0};
    let visited = {};
    let queue = new lib.linkedList();
    queue.push({steps: 0, state: state});

    main:
    while(true) {
        let attempt = queue.pop();
        let floors = attempt.state.floors;
        
        let pairs = [];
        
        for(let generatorIndex = 0; generatorIndex < 4; generatorIndex++) {
          for(let generator of floors[generatorIndex].generators) {
            for(let chipIndex = 0; chipIndex < 4; chipIndex++) {
              if(floors[chipIndex].chips.indexOf(generator) !== -1) {
                pairs.push({generator: generatorIndex, chip: chipIndex});
                break;
              }
            }
          }
        }
        
        var pattern = pairs.sort(function(a,b) { return (a.generator * 4 + a.chip) - (b.generator * 4 + b.chip); }).map(function(a) { return a .generator + '' + a.chip; }).join('') + attempt.state.currentFloor;
        if(visited[pattern]) {
          continue;
        }      
        visited[pattern] = true;

        if(floors[3].chips.length === 7 && floors[3].generators.length === 7) {
            //win
            console.log(attempt.steps);
            break;
        }

        for(let floor of floors) {
            if(floor.chips.length && floor.generators.length) {
                for(let chip of floor.chips) {
                    if(floor.generators.indexOf(chip) === -1) {
                        //losing state
                        continue main;
                    }
                }
            }
        }

        let currentFloorNum = attempt.state.currentFloor;
        let currentFloor = floors[currentFloorNum];
        let nextStepNum = attempt.steps + 1;

        for(let nextFloor of [currentFloorNum + 1, currentFloorNum - 1]) {
            if(nextFloor >= 0 && nextFloor <= 3) {
                for(let chip of currentFloor.chips) {
                    let newFloors = moveChip(floors, currentFloorNum, chip, nextFloor);
                    queue.unshift(newAttempt(nextStepNum, newFloors, nextFloor));

                    let newCurrentFloor = newFloors[currentFloorNum];
                    for(let chip2 of newCurrentFloor.chips) {
                        queue.unshift(newAttempt(nextStepNum, moveChip(newFloors, currentFloorNum, chip2, nextFloor), nextFloor))
                    }

                    for(let generator of newCurrentFloor.generators) {
                        queue.unshift(newAttempt(nextStepNum, moveGenerator(newFloors, currentFloorNum, generator, nextFloor), nextFloor));
                    }
                }
                for(let generator of currentFloor.generators) {
                    let newFloors = moveGenerator(floors, currentFloorNum, generator, nextFloor);
                    queue.unshift(newAttempt(nextStepNum, newFloors, nextFloor));

                    let newCurrentFloor = newFloors[currentFloorNum];
                    for(let chip of newCurrentFloor.chips) {
                        queue.unshift(newAttempt(nextStepNum, moveChip(newFloors, currentFloorNum, chip, nextFloor), nextFloor))
                    }

                    for(let generator2 of newCurrentFloor.generators) {
                        queue.unshift(newAttempt(nextStepNum, moveGenerator(newFloors, currentFloorNum, generator2, nextFloor), nextFloor));
                    }
                }
            }
        } 
    }
});