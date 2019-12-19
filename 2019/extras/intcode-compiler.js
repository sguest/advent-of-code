let fs = require('fs');
let path = require('path');

if(process.argv.length < 4) {
    throw new Error(`Missing required parameter. Usage: node ${process.argv[1]} <inputfile> <outputfile>`)
}

let inputFile = process.argv[2];
let outputFile = process.argv[3];

let data = fs.readFileSync(path.resolve(__dirname, inputFile), 'utf-8');
let lines = data.replace(/\r\n/, '\n').split('\n');
let cells = [];

for(let line of lines) {
    line = line.trim().replace(/,$/, '');
    if(line && line[0] !== '#') {
        cells.push(...line.split(','));
    }
}

let pointers = {};
let labels = {};

let newCells = [];

let index = 0;

for(let cell of cells) {
    if(cell[0] === '&') {
        let pointerName = cell.substring(1);
        pointers[pointerName] = pointers[pointerName] || [];
        pointers[pointerName].push(index);
        newCells.push(cell);
        index++;
        continue;
    }
    
    if(cell[0] === '*') {
        let labelName = /^\*([^;]*)/.exec(cell)[1];
        labels[labelName] = index;
        cell = cell.replace(/^\*[^;]*;?/, '');
    }

    if(cell[0] === '"') {
        let str = /^\"([^"]*)"$/.exec(cell)[1];
        newCells.push(...str.split('').map(x => x.charCodeAt(0).toString()));
        index += str.length;
    }
    else {
        index++;
        if(!cell) {
            newCells.push('0');
        }
        else if(isNaN(cell)) {
            throw new Error(`Invalid cell value ${cells[index]}`);
        }
        else {
            newCells.push(cell);
        }
    }
}

for(let pointerName in pointers) {
    if(!labels[pointerName]) {
        throw new Error(`Unrecognized pointer ${pointerName}`);
    }
    for(let pointer of pointers[pointerName]) {
        newCells[pointer] = labels[pointerName];
    }
}

fs.writeFileSync(path.resolve(__dirname, outputFile), newCells.join(','));