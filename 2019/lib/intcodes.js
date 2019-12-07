function compile(codes) {
    let pointer = 0;
    let inputAddress = null;
    let returnSignal = null;
    let returnValue;
    let inputValues = [];

    function execStandard(numArgs, modes, outputs, callback) {
        for(let output of outputs) {
            modes[output] = 1;
        }
        let args = [];
        for(let i = 0; i < numArgs; i++) {
            if(modes[i]) {
                args.push(codes[pointer + i + 1]);
            }
            else {
                args.push(codes[codes[pointer + i + 1]]);
            }
        }
        let newPointer = callback.apply(null, args);
        if(newPointer) {
            pointer = newPointer;
        }
        else {
            pointer += numArgs + 1;
        }
    }

    let funcs = {
        1: modes => execStandard(3, modes, [2], (first, second, target) => {
            codes[target] = first + second;
        }),
        2: modes => execStandard(3, modes, [2], (first, second, target) => {
            codes[target] = first * second;
        }),
        3: modes => execStandard(1, modes, [0], (arg) => {
            if(inputValues.length) {
                codes[arg] = inputValues.shift();
            }
            else {
                inputAddress = arg;
                returnSignal = 'input';
            }
        }),
        4: modes => execStandard(1, modes, [], (arg) => {
            returnValue =  arg;
            returnSignal = 'output';
        }),
        5: modes => execStandard(2, modes, [], (first, second) => {
            if(first) {
                return second;
            }
        }),
        6: modes => execStandard(2, modes, [], (first, second) => {
            if(!first) {
                return second;
            }
        }),
        7: modes => execStandard(3, modes, [2], (first, second, third) => {
            codes[third] = (first < second) ? 1 : 0;
        }),
        8: modes => execStandard(3, modes, [2], (first, second, third) => {
            codes[third] = (first === second) ? 1 : 0;
        }),
        99: () => {
            returnSignal = 'end'
        },
    }

    return {
        run: (inputs) => {
            if(inputs) {
                inputValues = inputs;
            }
            if(inputAddress && !inputValues.length) {
                throw 'Failed to resume execution, waiting for input but no inputs provided';
            }
            if(inputAddress) {
                codes[inputAddress] = inputValues.shift();
                inputAddress = null;
            }
            returnSignal = null;
            returnValue = undefined;
            while(!returnSignal) {
                let op = codes[pointer];
                let opCode = op % 100;
                op = Math.floor(op / 100);
                let modes = [];
        
                while(op > 0) {
                    modes.push(op % 10);
                    op = Math.floor(op / 10);
                }
                if(!funcs[opCode]) {
                    throw `Unrecognized opCode ${opCode}`;
                }
                funcs[opCode](modes);
            }

            return { signal: returnSignal, value: returnValue };
        }
    };
}

function parse(input) {
    return input.split(',').map(x => +x);
}

module.exports = {
    compile,
    parse,
}