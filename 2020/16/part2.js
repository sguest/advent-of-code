let lib = require('../../lib');

let year = 2020;
let day = 16;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let validNums = new Set();
    let validFields = new Map();
    let step = 0;
    let myFields = [];
    let validTickets = [];
    let allFields = [];
    for(let line of lines) {
        if(step === 0) {
            if(line) {
                let parts = line.split(': ');
                let key = parts[0];
                let ranges = parts[1].split(' or ');
                let fieldRanges = new Set();
                for(let range of ranges) {
                    let rangeParts = range.split('-');
                    let min = +rangeParts[0];
                    let max = +rangeParts[1];
                    for(let i = min; i <= max; i++) {
                        validNums.add(i);
                        fieldRanges.add(i);
                    }
                }
                validFields.set(key, fieldRanges);
                allFields.push(key);
            }
            else {
                step = 1;
            }
        }
        else if(step === 1) {
            if(line === 'your ticket:') {}
            else if(line) {
                myFields = line.split(',').map(x => +x);
            }
            else {
                step = 2;
            }
        }
        else {
            if(line !== 'nearby tickets:') {
                let nums = line.split(',').map(x => +x);
                let valid = true;
                for(let num of nums) {
                    if(!validNums.has(num)) {
                        valid = false;
                    }
                }
                if(valid) {
                    validTickets.push(nums);
                }
        }
        }
    }

    let possibleFields = [];
    for(let i = 0; i < myFields.length; i++) {
        possibleFields.push(allFields.slice(0));
    }

    for(let ticket of validTickets) {
        for(let i = 0; i < ticket.length; i++) {
            if(possibleFields[i].length > 1) {
                let fieldValue = ticket[i];
                let invalidFields = [];
                for(let fieldName of possibleFields[i]) {
                    if(!validFields.get(fieldName).has(fieldValue)) {
                        invalidFields.push(fieldName);
                    }
                }

                for(let field of invalidFields) {
                    possibleFields[i].splice(possibleFields[i].indexOf(field), 1);
                }
            }
        }
    }

    let previouslySolved = [];
    let dirty = false;
    do {
        dirty = false;
        let solvedFields = [];
        for(let possibleField of possibleFields) {
            if(possibleField.length === 1 && previouslySolved.indexOf(possibleField[0]) === -1) {
                solvedFields.push(possibleField[0]);
                previouslySolved.push(possibleField[0]);
            }
        }
        for(let solvedField of solvedFields) {
            for(let possibleField of possibleFields) {
                if(possibleField.length > 1) {
                    possibleField.splice(possibleField.indexOf(solvedField), 1);
                    dirty = true;
                }
            }
        }
    } while(dirty);

    let count = 1;
    for(let i = 0; i < myFields.length; i++) {
        if(/^departure/.test(possibleFields[i])) {
            count *= myFields[i];
        }
    }

    console.log(count);

}).catch((err) => {
    console.log(err, err.stack);
});