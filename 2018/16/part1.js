let lib = require('../../lib');

let year = 2018;
let day = 16;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');

    let threeCount = 0;

    while(true) {
        let before = lines.shift();

        if(!/^Before/.test(before)) {
            break;
        }

        let argString = before.split('[')[1];
        argString = argString.substring(0, argString.length - 1);
        let beforeArgs = argString.split(', ').map(x => +x);

        let opString = lines.shift();
        let opArgs = opString.split(' ').map(x => +x);

        let after = lines.shift();
        argString = after.split('[')[1];
        argString = argString.substring(0, argString.length - 1);
        let afterArgs = argString.split(', ').map(x => +x);
        lines.shift();

        let matchCount = 0;

        let aReg = beforeArgs[opArgs[1]];
        let bReg = beforeArgs[opArgs[2]];
        let aVal = opArgs[1];
        let bVal = opArgs[2];
        let cVal = opArgs[3];

        //addr
        let candidates = beforeArgs.slice(0);
        candidates[cVal] = aReg + bReg;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //addi
        candidates = beforeArgs.slice(0);
        candidates[cVal] = aReg + bVal;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //mulr
        candidates= beforeArgs.slice(0);
        candidates[cVal] = aReg * bReg;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //muli
        candidates = beforeArgs.slice(0);
        candidates[cVal] = aReg * bVal;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //banr
        candidates = beforeArgs.slice(0);
        candidates[cVal] = aReg & bReg;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //bani
        candidates = beforeArgs.slice(0);
        candidates[cVal] = aReg & bVal;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //borr
        candidates = beforeArgs.slice(0);
        candidates[cVal] = aReg | bReg;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //bori
        candidates = beforeArgs.slice(0);
        candidates[cVal] = aReg | bVal;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //setr
        candidates = beforeArgs.slice(0);
        candidates[cVal] = aReg;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //seti
        candidates = beforeArgs.slice(0);
        candidates[cVal] = aVal;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //gtir
        candidates = beforeArgs.slice(0);
        candidates[cVal] = aVal > bReg ? 1 : 0;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //gtri
        candidates = beforeArgs.slice(0);
        candidates[cVal] = aReg > bVal ? 1 : 0;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //gtrr
        candidates = beforeArgs.slice(0);
        candidates[cVal] = aReg > bReg ? 1 : 0;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //eqir
        candidates = beforeArgs.slice(0);
        candidates[cVal] = aVal === bReg ? 1 : 0;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //eqri
        candidates = beforeArgs.slice(0);
        candidates[cVal] = aReg === bVal ? 1 : 0;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        //eqrr
        candidates = beforeArgs.slice(0);
        candidates[cVal] = aReg === bReg ? 1 : 0;
        if(candidates.join(',') === afterArgs.join(',')) {
            matchCount++;
        }

        if(matchCount >= 3) {
            threeCount++;
        }
    }

    //207
    console.log(threeCount);
}).catch((err) => {
    console.log(err.stack);
});