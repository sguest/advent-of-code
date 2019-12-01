let lib = require('../../lib');

lib.getInput(2015, 7).then((data) => {
    data = data.trim();
    let lines = [];
    for(let line of data.split('\n')) {
        lines.push(line);
    }

    let assignParser = /^(\d+|[a-z]+) -> ([a-z]+)$/;
    let notParser = /^NOT ([a-z]+) -> ([a-z]+)$/;
    let binaryParser = /^(\d+|[a-z]+) ([A-Z]+) (\d+|[a-z]+) -> ([a-z]+)$/;

    let registers = {};

    var binaryOps = {
        AND: (a, b) => a & b,
        OR: (a, b) => a | b,
        LSHIFT: (a, b) => a << b,
        RSHIFT: (a, b) => a >>> b
    }

    function getValue(val) {
        var intVal = parseInt(val);
        if(isNaN(intVal)) {
            return registers[val];
        }

        return intVal;
    }

    function setValue(register, val) {
        registers[register] = val & 65535;
    }

    main:
    while(lines.length) {
        let newLines = [];
        
        for(let line of lines) {
            let parsed = notParser.exec(line);
            if(parsed) {
                var value = getValue(parsed[1]);
                if(value !== undefined) {
                    setValue(parsed[2], ~value);
                }
                else {
                    newLines.push(line);
                }
                continue;
            }

            parsed = assignParser.exec(line);
            if(parsed) {
                var value = getValue(parsed[1]);
                if(value !== undefined) {
                    setValue(parsed[2], value);
                }
                else {
                    newLines.push(line);
                }
                continue;
            }

            parsed = binaryParser.exec(line);
            if(parsed) {
                let val1 = getValue(parsed[1]);
                let val2 = getValue(parsed[3]);

                if(val1 !== undefined && val2 !== undefined) {
                    result = binaryOps[parsed[2]](val1, val2);
                    setValue(parsed[4], result);
                }
                else {
                    newLines.push(line);
                }
                continue;
            }

            console.log('ERROR, unrecognized: ' + line);
            break main;
        }
        lines = newLines;
    }

    console.log(registers['a']);
});