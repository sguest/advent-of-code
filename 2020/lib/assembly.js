function parse(input) {
    return compile(input.trim().split('\n'));
}

function compile(lines, initialState) {
    let ops = [];

    let pointer = 0;
    let accumulator = 0;
    if(initialState) {
        pointer = initialState.pointer || 0;
        accumulator = initialState.accumulator || 0;
    }

    for(let line of lines) {
        let parts = line.split(' ');
        let value = +parts[1];
        ops.push({op: parts[0], value});
    }

    let funcs = {
        acc: value => {
            accumulator += value;
            pointer++;
        },
        jmp: value => {
            pointer += value;
        },
        nop: value => {
            pointer++;
        },
    };

    let program = {
        getState: () => {
            return {
                pointer,
                accumulator,
                ops,
            };
        },
        step: () => {
            let currentOp = ops[pointer];
            funcs[currentOp.op](currentOp.value);
        },
        clone: () => {
            return compile(lines.slice(0), { pointer, accumulator });
        }
    }

    return program;
}

module.exports = {
    parse,
    compile,
};