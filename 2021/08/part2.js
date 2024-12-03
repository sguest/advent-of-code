let lib = require('../../lib');

let year = 2021;
let day = 8;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let samples = [];
    let outputs = [];
    for(let line of lines) {
        let parts = line.split(' | ');
        samples.push(parts[0].split(' '));
        outputs.push(parts[1].split(' '));
    }

    let total = 0;
    for(let i = 0; i < samples.length; i++) {
        let sample = samples[i];
        let one;
        let four;
        let seven;
        let eight;
        for(let item of sample) {
            if(item.length === 2) {
                one = item;
            }
            else if(item.length === 3) {
                seven = item;
            }
            else if(item.length === 4) {
                four = item;
            }
            else if(item.length === 7) {
                eight = item;
            }
        }

        let top;
        for(let char of seven) {
            if(one.indexOf(char) === -1) {
                top = char;
            }
        }

        let three;
        for(let item of sample) {
            if(item.length === 5) {
                let oneCount = 0;
                for(let char of item) {
                    if(one.indexOf(char) !== -1) {
                        oneCount++;
                    }
                }
                if(oneCount === 2) {
                    three = item;
                }
            }
        }

        let topLeft;
        for(let char of four) {
            if(three.indexOf(char) === -1) {
                topLeft = char;
            }
        }

        let two;
        let five;
        for(let item of sample) {
            if(item.length === 5 && item !== three) {
                if(item.indexOf(topLeft) === -1) {
                    two = item;
                }
                else {
                    five = item;
                }
            }
        }

        let topRight;
        let bottomLeft;
        for(let char of two) {
            if(one.indexOf(char) !== -1) {
                topRight = char;
            }
            else if(five.indexOf(char) === -1 && one.indexOf(char) === -1) {
                bottomLeft = char;
            }
        }

        let bottomRight;
        for(let char of five) {
            if(one.indexOf(char) !== -1) {
                bottomRight = char;
            }
        }

        let middle;
        for(let char of eight) {
            if(four.indexOf(char) !== -1 && char !== topLeft && char !== topRight && char !== bottomRight) {
                middle = char;
            }
        }

        let bottom;
        for(let char of eight) {
            if(char !== top && char !== topLeft && char !== topRight && char !== middle && char !== bottomLeft && char !== bottomRight)
            {
                bottom = char;
            }
        }

        let output = outputs[i];
        let display = '';

        for(let item of output) {
            if(item.length === 2) {
                display += '1';
            }
            else if(item.length === 3) {
                display += '7';
            }
            else if(item.length === 4) {
                display += '4';
            }
            else if(item.length === 7) {
                display += '8';
            }
            else if(item.indexOf(top) !== -1 && item.indexOf(topLeft) !== -1 && item.indexOf(topRight) !== -1 && item.indexOf(bottomRight) !== -1 && item.indexOf(bottomLeft) !== -1 && item.indexOf(bottom) !== -1)
            {
                display += '0';
            }
            else if(item.indexOf(top) !== -1 && item.indexOf(topLeft) !== -1 && item.indexOf(middle) !== -1 && item.indexOf(bottomRight) !== -1 && item.indexOf(bottomLeft) !== -1 && item.indexOf(bottom) !== -1)
            {
                display += '6';
            }
            else if(item.indexOf(top) !== -1 && item.indexOf(topLeft) !== -1 && item.indexOf(topRight) !== -1 && item.indexOf(bottomRight) !== -1 && item.indexOf(middle) !== -1 && item.indexOf(bottom) !== -1)
            {
                display += '9';
            }
            else if(item.indexOf(top) !== -1 && item.indexOf(topRight) !== -1 && item.indexOf(middle) !== -1 && item.indexOf(bottomLeft) !== -1 && item.indexOf(bottom) !== -1)
            {
                display += '2';
            }
            else if(item.indexOf(top) !== -1 && item.indexOf(topRight) !== -1 && item.indexOf(middle) !== -1 && item.indexOf(bottomRight) !== -1 && item.indexOf(bottom) !== -1)
            {
                display += '3';
            }
            else if(item.indexOf(top) !== -1 && item.indexOf(topLeft) !== -1 && item.indexOf(middle) !== -1 && item.indexOf(bottomRight) !== -1 && item.indexOf(bottom) !== -1)
            {
                display += '5';
            }
            else {
                console.log('ERROR, could not match ' + item);
            }
        }
        total += (+display);
    }

    console.log(total);
}).catch((err) => {
    console.log(err, err.stack);
});