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
            let found = false;
            for(let runSize = 1; runSize <= item.length / 2; runSize++) {
                if(!found) {
                    if(item.length % runSize === 0) {
                        let section = item.substring(0, runSize);
                        let re = new RegExp(`(?:${section}){${item.length / runSize}}`);
                        if(re.test(item)) {
                            total += i;
                            found = true;
                        }
                    }
                }
            }
        }
    }
    console.log(total);
}).catch((err) => {
    console.log(err, err.stack);
});