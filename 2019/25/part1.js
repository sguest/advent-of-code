let lib = require('../../lib');
let intcodes = require('../lib/intcodes');
let Combinatorics = require('js-combinatorics');

let year = 2019;
let day = 25;

let reversed = {
    north: 'south',
    south: 'north',
    west: 'east',
    east: 'west',
}

function findPath(currentRoom, targetRoom) {
    let queue = [{room: currentRoom, path: []}];
    let visited = {};

    while(queue.length) {
        let current = queue.shift();
        if(current.room === targetRoom) {
            return current.path;
        }

        if(visited[current.room.name]) {
            continue;
        }

        visited[current.room.name] = true;

        for(let door in current.room.doors) {
            let newPath = current.path.slice(0);
            newPath.push(door);
            queue.push({room: current.room.doors[door], path: newPath});
        }
    }
}

lib.getInput(year, day).then((data) => {
    let codes = intcodes.parse(data);

    //A bit of a cheat starting infinite loop on the blacklist, but I don't feel like making the whole thing async to detect it via timeout
    let blacklist = ['infinite loop'];

    mainLoop: while(true) {
        let program = intcodes.compile(codes.slice(0));

        let currentRoom = { doors: {}};
        let finalRoom;
        let lastStepDirection;

        let result = program.readString();
        let unexplored = [currentRoom];

        while(unexplored.length) {
            let targetRoom = unexplored.pop();

            let foundPath = findPath(currentRoom, targetRoom);

            let lastStep;

            for(let step of foundPath) {
                lastStep = step;
                result = program.readString(step + '\n');
                currentRoom = currentRoom.doors[step];
            }

            let lines = result.str.split('\n');
            let readingDoors = false;
            let readingItems = false;
            let doors = [];
            let items = [];
            let name;
            let duplicateName = false;
            for(let line of lines) {
                if(line[0] === '=') {
                    if(name) {
                        duplicateName = true;
                    }
                    else {
                        name = /== (.+) ==/.exec(line)[1];
                    }
                }
                if(line === 'Doors here lead:') {
                    readingDoors = true;
                }
                else if(line === 'Items here:') {
                    readingItems = true;
                    readingDoors = false;
                }
                else {
                    if(readingDoors && line[0] === '-') {
                        doors.push(line.substring(2));
                    }
                    else if(readingItems && line[0] === '-') {
                        items.push(line.substring(2));
                    }
                }
            }

            if(duplicateName) {
                currentRoom = currentRoom.doors[reversed[lastStep]];
                finalRoom = currentRoom;
                lastStepDirection = lastStep;
            }
            else {
                currentRoom.name = name;

                for(let door of doors) {
                    if(!currentRoom.doors[door]) {
                        let newRoom = {doors:{}};
                        newRoom.doors[reversed[door]] = currentRoom;
                        currentRoom.doors[door] = newRoom;
                        unexplored.push(newRoom);
                    }
                }

                for(let item of items) {
                    if(blacklist.indexOf(item) === -1) {
                        result = program.readString(`take ${item}\n`);
    
                        if(result.signal === 'end') {
                            // game-ending item
                            blacklist.push(item);
                            continue mainLoop;
                        }

                        result = program.readString('inv\n');
                        if(!/^Items/.test(result.str.trim())) {
                            // item that gets stuck like the electromagnet
                            blacklist.push(item);
                            continue mainLoop;
                        }
                    }
                }
            }
        }

        let path = findPath(currentRoom, finalRoom);

        for(let step of path) {
            result = program.readString(step + '\n');
        }

        let items = [];

        result = program.readString('inv\n');

        for(let line of result.str.split('\n')) {
            if(line[0] === '-') {
                items.push(line.substring(2));
            }
        }

        let combinations = Combinatorics.power(items);

        combinations.forEach(itemList => {
            for(let item of items) {
                if(itemList.indexOf(item) === -1) {
                    program.readString(`drop ${item}\n`);
                }
                else {
                    program.readString(`take ${item}\n`);
                }
            }

            result = program.readString(lastStepDirection + '\n');
            if(result.signal === 'end') {
                console.log(/\d+/.exec(result.str)[0]);
                process.exit(0);
            }
        });
    }
}).catch((err) => {
    console.log(err, err.stack);
});