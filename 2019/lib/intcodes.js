function run(codes, input) {
    let pointer = 0;
    let outputs = [];

    function execStandard(numArgs, modes, callback) {
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
        1: (modes) => {
            modes[2] = 1;
            execStandard(3, modes, (first, second, target) => {
                codes[target] = first + second;
            });
        },
        2: (modes) => {
            modes[2] = 1;
            execStandard(3, modes, (first, second, target) => {
                codes[target] = first * second;
            });
        },
        3: (modes) => {
            modes[0] = 1;
            execStandard(1, modes, (arg) => {
                codes[arg] = input;
            });
        },
        4: (modes) => execStandard(1, modes, (arg) => {
            outputs.push(arg);
        }),
        5: (modes) => execStandard(2, modes, (first, second) => {
            if(first) {
                return second;
            }
        }),
        6: (modes) => execStandard(2, modes, (first, second) => {
            if(!first) {
                return second;
            }
        }),
        7: (modes) => {
            modes[2] = 1;
            execStandard(3, modes, (first, second, third) => {
                codes[third] = (first < second) ? 1 : 0;
            });
        },
        8: (modes) => {
            modes[2] = 1;
            execStandard(3, modes, (first, second, third) => {
                codes[third] = (first === second) ? 1 : 0;
            });
        },
        99: () => {
            return 1;
        },
    }

    while(true) {
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
        let ret = funcs[opCode](modes);

        if(ret) {
            return outputs;
        }
    }
}

function parse(input) {
    return input.split(',').map(x => +x);
}

module.exports = {
    run,
    parse,
}