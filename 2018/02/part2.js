let lib = require('../../lib');

let year = 2018;
let day = 2;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');

    main: for(let index1 = 0; index1 < lines.length; index1++) {
        for(let index2 = index1 + 1; index2 < lines.length; index2++) {
            let line1 = lines[index1];
            let line2 = lines[index2];

            let common = '';
            let diffs = 0;

            for(let charIndex = 0; charIndex < line1.length; charIndex++) {
                if(line1[charIndex] === line2[charIndex]) {
                    common += line1[charIndex];
                }
                else {
                    diffs++;
                    if(diffs > 1) {
                        break;
                    }
                }
            }

            if(diffs === 1) {
                console.log(common);
                break main;
            }
        }
    }
}).catch((err) => {
    console.log(err.stack);
});