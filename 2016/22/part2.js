let lib = require('../../lib');

let year = 2016;
let day = 22;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    lines.shift();
    lines.shift();

    let emptyNode;
    let emptySize;

    let nodes = [];
    for(let line of lines) {
        let parts = line.split(/\s+/);
        let parsedName = /^\/dev\/grid\/node-x(\d+)-y(\d+)$/.exec(parts[0]);
        let x = parseInt(parsedName[1], 10);
        let y = parseInt(parsedName[2], 10);
        nodes[x] = nodes[x] || [];
        nodes[x][y] = {
            x,
            y,
            size: parseInt(parts[1], 10),
            used: parseInt(parts[2], 10),
            avail: parseInt(parts[3], 10)
        };

        if(nodes[x][y].used === 0) {
            emptyNode = {x, y};
            emptySize = nodes[x][y].size;
        }
    }

    /*
    Prints out a grid showing empty node, and "walls" that are bigger than could fit on the empty node
    pathfinding above is a "chear" based on this info. Could come back and use A* or something.
    For more info, see https://www.reddit.com/r/adventofcode/comments/5jor9q/2016_day_22_solutions/dbhvxkp/ */
    for(let y = 0; y < nodes[0].length; y++) {
        let line = '';
        for(let x = 0; x < nodes.length; x++) {
            if(x === emptyNode.x && y === emptyNode.y) {
                line += '_'
            }
            else if (nodes[x][y].used > emptySize) {
                line += '|'
            }
            else {
                line += 'X'
            }
        }
        //console.log(line);
    }


    let currentNode = emptyNode;
    let steps = 0;

    //Move up to wall
    while(nodes[currentNode.x][currentNode.y - 1].used <= nodes[currentNode.x][currentNode.y].size) {
        currentNode.y--;
        steps++;
    }

    //Move left around wall
    while(nodes[currentNode.x][currentNode.y - 1].used > nodes[currentNode.x][currentNode.y].size) {
        currentNode.x--;
        steps++;
    }

    //Move up to top
    while(currentNode.y > 0) {
        currentNode.y--;
        steps++;
    }

    //Move right to beside goal node
    while(currentNode.x < nodes.length - 2) {
        currentNode.x++;
        steps++;
    }

    //Shuffle goal node left 1 step at a time, which involves 5 moves
    //Moving right moves goal node once
    //Then move down, left, left, up to get the empty node beside the goal node again
    while(currentNode.x > 0) {
        currentNode.x--;
        steps += 5;
    }
    
    //Empty node is in top-left with goal node to the right. One more move gets goal node to top-left
    steps++;

    console.log(steps);
});