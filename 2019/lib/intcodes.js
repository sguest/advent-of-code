function run(codes) {
    let pointer = 0;

    function execStandard(numArgs, callback) {
        callback.apply(null, codes.slice(pointer + 1, pointer + numArgs + 1));
        pointer += numArgs + 1;
    }

    let funcs = {
        1: () => execStandard(3, (first, second, target) => {
            codes[target] = codes[first] + codes[second];
        }),
        2: () => execStandard(3, (first, second, target) => {
            codes[target] = codes[first] * codes[second];
        }),
        99: () => {
            return 1;
        },
    }

    while(true) {
        let op = codes[pointer];
        let ret = funcs[op]();

        if(ret) {
            return;
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