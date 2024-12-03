let readline = require('readline');
let intcodes = require('../lib/intcodes');
let fs = require('fs');
let path = require('path');

if(process.argv.length < 3) {
    throw new Error(`Missing required parameter. Usage: node ${process.argv[1]} <inputfile>`)
}

let fileName = process.argv[2];

let data = fs.readFileSync(path.resolve(__dirname, fileName), 'utf-8');

let codes = intcodes.parse(data);
let program = intcodes.compile(codes);

let rl = readline.createInterface({
    input: process.stdin,
    output: null,
});

let running;
let input = undefined;

function run() {
    running = true;
    while(running) {
        running = false;
        output = program.readString(input);
        input = undefined;
        
        process.stdout.write(output.str);

        if(output.signal === 'output') {
            console.log(`Invalid ascii value ${output.value}`);
            running = true;
        }
        else if(output.signal === 'input') {
            function getInput(answer) {
                if(answer === '*debug') {
                    let state = program.getState();
                    console.log('pointer', state.pointer);
                    console.log('relative base', state.relativeBase);
                    console.log('codes', codes.join(','));
                    rl.question('', getInput);
                }
                else {
                    input = answer + '\n';
                    run();
                }
            }
            rl.question('', getInput)
        }
        else if(output.signal === 'end') {
            rl.close();
        }
    }
}

run();