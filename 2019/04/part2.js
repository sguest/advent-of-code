let lib = require('../../lib');

let year = 2019;
let day = 4;

lib.getInput(year, day).then((data) => {
    let parts = data.split('-');
    let min = +parts[0];
    let max = +parts[1];
    let count = 0;

    main: for(let i = min; i <= max; i++) {
        let str = i.toString();

        let doubles = [];
        let triples = [];
        let last = '';

        let value = 0;
        for(let char of str) {
            if(+char < value) {
                continue main;
            }
            if(char === last) {
                if(doubles.indexOf(char) !== -1) {
                    triples.push(char);
                }
                doubles.push(char);
            }
            last = char;
            value = +char;
        }

        inner: for(let double of doubles) {
            if(triples.indexOf(double) === -1) {
                count++;
                break inner;
            }
        }
    }
    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});