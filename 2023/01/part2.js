let lib = require('../../lib');

let year = 2023;
let day = 1;

lib.getInput(year, day).then((data) => {
    let numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    let lines = data.split('\n');
    let sum = 0;
    for(let line of lines) {
        let i = 0;
        let first = '';
        while(!first) {
            if(isNaN(line[i]))
            {
                let letters = line.substring(i, i + 5);
                for(let numIndex = 0; numIndex < 10; numIndex++) {
                    let re = new RegExp('^' + numbers[numIndex]);
                    if(re.test(letters)) {
                        first = numIndex + '';
                    }
                }
            }
            else {
                first = line[i];
            }
            i++;
        }
        i = line.length - 1;
        let last = ''
        while(!last) {
            if(isNaN(line[i]))
            {
                let letters = line.substring(i, i + 5);
                for(let numIndex = 0; numIndex < 10; numIndex++) {
                    let re = new RegExp('^' + numbers[numIndex]);
                    if(re.test(letters)) {
                        last = numIndex + '';
                    }
                }
            }
            else {
                last = line[i];
            }
            i--;
        }
        let num = first + last;
        sum += +num;
    }
    console.log(sum);
}).catch((err) => {
    console.log(err, err.stack);
});