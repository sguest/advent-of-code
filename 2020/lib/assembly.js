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
        ops.push({op: parts[0], args: parts.slice(1).map(p => +p)});
    }

    let funcs = {
        acc: value => {
            accumulator += value;
            pointer++;
        },
        jmp: value => {
            pointer += value;
        },
        nop: () => {
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
            funcs[currentOp.op].apply(null, currentOp.args);
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