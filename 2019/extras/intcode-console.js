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
let input = [];

function run() {
    running = true;
    while(running) {
        running = false;
        output = program.run(input);
        input = [];

        if(output.signal === 'output') {
            process.stdout.write(String.fromCharCode(output.value));
            running = true;
        }
        else if(output.signal === 'input') {
            rl.question('', answer => {
                input = answer.split('').map(x => x.charCodeAt(0));
                input.push(10);
                run();
            })
        }
        else if(output.signal === 'end') {
            rl.close();
        }
    }
}

run();