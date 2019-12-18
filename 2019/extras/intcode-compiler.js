let fs = require('fs');
let path = require('path');

if(process.argv.length < 4) {
    throw new Error(`Missing required parameter. Usage: node ${process.argv[1]} <inputfile> <outputfile>`)
}

let inputFile = process.argv[2];
let outputFile = process.argv[3];

let data = fs.readFileSync(path.resolve(__dirname, inputFile), 'utf-8');

let cells = data.split(',');

let pointers = {};
let labels = {};

for(let index = 0; index < cells.length; index++) {
    let cell = cells[index];
    if(cell[0] === '*') {
        let pointerName = cell.substring(1);
        pointers[pointerName] = pointers[pointerName] || [];
        pointers[pointerName].push(index);
    }
    else if(cell[0] === '"') {
        let labelName = /^\"([^"]*)/.exec(cell)[1];
        labels[labelName] = index;
        cell = cell.replace(/^\"[^"]*"/, '');

        if(isNaN(cell)) {
            throw new Error(`Invalid cell value ${cells[index]}`);
        }

        cells[index] = cell;
    }
    else if(isNaN(cell)) {
        throw new Error(`Invalid cell value ${cell}`);
    }
}

for(let pointerName in pointers) {
    if(!labels[pointerName]) {
        throw new Error(`Unrecognized pointer ${pointerName}`);
    }
    for(let pointer of pointers[pointerName]) {
        cells[pointer] = labels[pointerName];
    }
}

fs.writeFileSync(path.resolve(__dirname, outputFile), cells.join(','));