function compile(codes, status) {
    let pointer = 0;
    let relativeBase = 0;
    if(status) {
        pointer = status.pointer;
        relativeBase = status.relativeBase;
    }
    let returnSignal = null;
    let returnValue;
    let inputValues = [];

    function execStandard(numArgs, modes, outputs, callback) {
        let args = [];
        for(let i = 0; i < numArgs; i++) {
            let mode = modes[i];
            let isOutput = outputs.indexOf(i) !== -1;

            let rawValue = codes[pointer + i + 1] || 0;
            if(mode === 2) {
                rawValue += relativeBase;
            }

            if(isOutput || mode === 1) {
                args.push(rawValue);
            }
            else {
                args.push(codes[rawValue] || 0);
            }
        }
        let newPointer = callback.apply(null, args);
        if(newPointer !== undefined) {
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
                returnSignal = 'input';
                return pointer;
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
        9: modes => execStandard(1, modes, [], (arg) => {
            relativeBase += arg;
        }),
        99: () => {
            returnSignal = 'end'
        },
    }

    let program = {
        run: (...inputs) => {
            for(let input of inputs) {
                if(typeof input === 'string') {
                    inputValues.push(...[].map.call(input, (val, index) => input.charCodeAt(index)));
                }
                else if(typeof input === 'number') {
                    inputValues.push(input);
                }
                else if(input !== undefined) {
                    throw `Unsupported input value ${input}`;
                }
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
                    throw `Unrecognized opCode ${opCode} at pointer ${pointer}`;
                }
                funcs[opCode](modes);
            }

            return { signal: returnSignal, value: returnValue };
        },
        clone: () => {
            return compile(codes.slice(0), {
                pointer,
                relativeBase,
            });
        },
        getState: () => {
            return { codes, pointer, relativeBase };
        },
        readString: (...inputs) => {
            let result = program.run(...inputs);
            let str = '';

            while(result.signal === 'output' && result.value > 0 && result.value <= 255) {
                str += String.fromCharCode(result.value);
                result = program.run();
            }

            result.str = str;
            return result;
        }
    };

    return program;
}

function parse(input) {
    return input.split(',').map(x => +x);
}

module.exports = {
    compile,
    parse,
}