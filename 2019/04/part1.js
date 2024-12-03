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
        if(!/(\d)\1/.test(str)) {
            continue main;
        }

        let value = 0;
        for(let char of str) {
            if(+char < value) {
                continue main;
            }
            value = +char;
        }

        count++;
    }
    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});