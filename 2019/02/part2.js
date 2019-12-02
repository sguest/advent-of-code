let lib = require('../../lib');

let year = 2019;
let day = 2;

lib.getInput(year, day).then((data) => {
    let originalCodes = data.split(',').map(x => +x);

    main: for(let noun = 0; noun < 100; noun++) {
        for(let verb = 0; verb < 100; verb++) {
            let codes = originalCodes.slice(0);

            codes[1] = noun;
            codes[2] = verb;

            let pointer = 0;

            while(codes[pointer] !== 99) {
                let op = codes[pointer];
                let val1 = codes[codes[pointer + 1]];
                let val2 = codes[codes[pointer + 2]];

                if(op === 1) {
                    codes[codes[pointer + 3]] = val1 + val2;
                }
                else {
                    codes[codes[pointer + 3]] = val1 * val2;
                }
                pointer += 4;
            }

            if(codes[0] === 19690720) {
                console.log(100 * noun + verb);
                break main;
            }
        }
    }
}).catch((err) => {
    console.log(err, err.stack);
});