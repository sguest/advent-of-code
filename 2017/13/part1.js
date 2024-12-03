let lib = require('../../lib');

let year = 2017;
let day = 13;

lib.getInput(year, day).then((data) => {
    let scanners = [];
    let maxDepth;
    for(let line of data.split('\n')) {
        let parts = line.split(': ').map(x => parseInt(x, 10));
        scanners.push({depth: parts[0], range: parts[1], position: 0, direction: true});
        maxDepth = parts[0];
    }

    let severity = 0;
    for(let time = 0; time < maxDepth + 1; time++) {
        for(let scanner of scanners) {
            if(scanner.depth === time && scanner.position === 0) {
                severity += time * scanner.range;
            }
            if(scanner.direction) {
                scanner.position++;
                if(scanner.position === scanner.range - 1) {
                    scanner.direction = false;
                }
            }
            else {
                scanner.position--;
                if(scanner.position === 0){
                    scanner.direction = true;
                }
            }
        }
    }

    console.log(severity);
});