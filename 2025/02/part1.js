let lib = require('../../lib');

let year = 2025;
let day = 2;

lib.getInput(year, day).then((data) => {
    let pairs = data.split(',');
    let total = 0;
    for(let pair of pairs) {
        let items = pair.split('-');
        for(let i = +items[0]; i <= +items[1]; i++) {
            let item = i.toString();
            if(item.length % 2 === 0) {
                let first = +(item.substring(0, item.length / 2));
                let second = +(item.substring(item.length / 2));
                if(first === second) {
                    total += i;
                }
            }
        }
    }
    console.log(total);
}).catch((err) => {
    console.log(err, err.stack);
});