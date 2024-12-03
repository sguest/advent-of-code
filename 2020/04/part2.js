let lib = require('../../lib');

let year = 2020;
let day = 4;

let validators = {
    byr: val => {
        return (+val >= 1920 && +val <= 2002)
    },
    iyr: val => {
        return (+val >= 2010 && +val <= 2020)
    },
    eyr: val => {
        return (+val >= 2020 && +val <= 2030)
    },
    hgt: val => {
        if(/in$/.test(val)) {
            let num = +val.replace('in', '');
            return (num >= 59 && num <= 76);
        }
        else if(/cm$/.test(val)) {
            let num = +val.replace('cm', '');
            return (num >= 150 && num <= 193);
        }
        return false;
    },
    hcl: val => {
        return /^#[0-9a-f]{6}$/.test(val);
    },
    ecl: val => {
        return /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(val);
    },
    pid: val => {
        return /^\d{9}$/.test(val);
    },
    cid: val => {
        return true;
    }
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let foundFields = [];
    let valid = 0;
    let invalidFound = false;
    for(let line of lines) {
        if(!line.trim()) {
            if(!invalidFound && foundFields.length === 8 || (foundFields.length === 7 && foundFields.indexOf('cid') === -1)) {
                valid++;
            }
            invalidFound = false;
            foundFields = [];
        }
        else {
            let parts = line.split(' ');
            for(let part of parts) {
                let fieldParts = part.split(':');
                let id = fieldParts[0];
                if(validators[id](fieldParts[1])) {
                    foundFields.push(id);
                }
                else {
                    invalidFound = true;
                }
            }
        }
    }

    console.log(valid);
}).catch((err) => {
    console.log(err, err.stack);
});