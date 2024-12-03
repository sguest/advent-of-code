let lib = require('../../lib');
let intcodes = require('../lib/intcodes');

let year = 2019;
let day = 23;

lib.getInput(year, day).then((data) => {
    let codes = intcodes.parse(data);
    
    let comps = [];
    for(let i = 0; i < 50; i++) {
        let program = intcodes.compile(codes.slice(0));
        program.run(i);
        comps.push(program);
    }

    let queue = new lib.linkedList();

    while(true) {
        while(queue.length) {
            let current = queue.shift();
            let address = current.address;
            if(address === 255) {
                console.log(current.y);
                process.exit(0);
            }

            let currentComp = comps[address];

            let output = currentComp.run();
            while(output.signal !== 'input') {
                let newPacket = {address: output.value};
                newPacket.x = currentComp.run().value;
                newPacket.y = currentComp.run().value;
                queue.push(newPacket);
                output = currentComp.run();
            }

            output = currentComp.run(current.x, current.y);

            while(output.signal !== 'input') {
                let newPacket = {address: output.value};
                newPacket.x = currentComp.run().value;
                newPacket.y = currentComp.run().value;
                queue.push(newPacket);
                output = currentComp.run();
            }
        }

        for(let comp of comps) {
            let output = comp.run();
            if(output.signal === 'input') {
                output = comp.run(-1);
            }
            if(output.signal === 'output') {
                let newPacket = {address: output.value};
                output = comp.run();
                newPacket.x = output.value;
                output = comp.run();
                newPacket.y = output.value;
                queue.push(newPacket);
            }
        }
    }

}).catch((err) => {
    console.log(err, err.stack);
});