let lib = require('../../lib');

let year = 2015;
let day = 19;

/*
    As far as I'm aware, there is no pure computation solution to this. Manual parsing and logic is involved.
    Examining the input there are 3 special molecules that never appear on the left side of substitutions:
    Rn, Ar, Y.
    Any substitution without any of those molecules will be 1 molecule to 2.
    Any substitution without a Y will be 1 to 2 non-Rn/Ar molecules, with the possible addition of an extra Rn and/or Ar
    Any substitution with a Y will add an extra non-Rn/Ar molecule per Y present
    Therefore the required number of substitutions will be the total number of molecules in the target,
    not counting the number of Rn or Ar molecules (since those are "free"),
    and then subtract the number of Y molecules, since each one of those is paired with an additional "free" molecule
    Finally, subtract 1 from the result, since we start with a single molecule ("e") at zero substitutions
*/

lib.getInput(year, day).then((data) => {
    let subs = [];
    let target = '';
    for(let line of data.split('\n')) {
        if(line.length) {
            let parts = line.split(' => ');
            if(parts.length > 1) {
                subs.push({start: parts[0], end: parts[1]});
            }
            else {
                target = line;
            }
        }
    }

    let moleculeParser = /[A-Z][a-z]?/g;
    let parsed = moleculeParser.exec(target);

    let count = 0;
    while(parsed) {
        let molecule = parsed[0];

        if(molecule === 'Y') {
            count --;
        }
        else if(molecule !== 'Ar' && molecule !== 'Rn') {
            count ++;
        }
        parsed = moleculeParser.exec(target)
    }
    console.log(count - 1);
});