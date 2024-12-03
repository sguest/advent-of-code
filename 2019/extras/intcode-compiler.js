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
        if(isNaN(pointerName)) {
            pointers[pointerName] = pointers[pointerName] || [];
            pointers[pointerName].push(index);
            newCells.push(cell);
        }
        else {
            newCells.push(+pointerName + index);
        }
        index++;
        continue;
    }
    
    if(cell[0] === '*') {
        let labelName = /^\*([^;]*)/.exec(cell)[1];
        if(labels[labelName]) {
            throw new Error(`Duplicate label ${labelName}`);
        }
        labels[labelName] = index;
        cell = cell.replace(/^\*[^;]*;?/, '');
    }

    if(cell[0] === '"') {
        if(cell.substr(-1, 1) !== '"') {
            throw new Error(`Unterminated string ${cell}`);
        }
        let str = cell.slice(1, -1);
        let strIndex = 0;
        let chars = [];
        let controlChars = 0;
        while(strIndex < str.length) {
            if(str[strIndex] === '\\') {
                strIndex++;
                controlChars++;
                if(str[strIndex] === 'n') {
                    chars.push('\n');
                }
                else if(str[strIndex] === '"') {
                    chars.push('"');
                }
                else if(str[strIndex] === '+') {
                    chars.push(',');
                }
                else {
                    chars.push(str[strIndex]);
                }
            }
            else {
                chars.push(str[strIndex]);
            }
            strIndex++;
        }
        newCells.push(chars.map(x => x.charCodeAt(0).toString()));
        index += str.length - controlChars;
    }
    else {
        if(!cell) {
            newCells.push('0');
        }
        else if(isNaN(cell)) {
            throw new Error(`Invalid cell value ${cells[index]}`);
        }
        else {
            newCells.push(cell);
        }
        index++;
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