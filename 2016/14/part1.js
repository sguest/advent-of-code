let md5 = require('md5');
let lib = require('../../lib');

lib.getInput(2016, 14).then((input) => {
    let index = 0;
    let candidates = [];
    let cutoffIndex = 0;
    let validKeys = [];

    while(!cutoffIndex || index < cutoffIndex) {
        if(candidates.length && candidates[0].index < index - 1000) {
            candidates.shift();
        }

        let hash = md5(input + index);

        if(index === 14937) debugger;

        let regex = /([0-9a-f])\1\1\1\1/g;
        let parsed = regex.exec(hash);
        while(parsed) {
            let arrIndex = 0;
            let digit = parsed[1];

            while(arrIndex < candidates.length) {
                if(candidates[arrIndex].digit === digit)
                {
                    let match = candidates.splice(arrIndex, 1)[0];
                    validKeys.push(match.index);
                    if(validKeys.length === 64) {
                        cutoffIndex = index + 1000;
                    }
                }
                else {
                    arrIndex++;
                }
            }

            parsed = regex.exec(hash);
        }

        parsed = /([0-9a-f])\1\1/.exec(hash);
        if(parsed) {
            candidates.push({
                index: index,
                digit: parsed[1]
            });
        }

        index++;
    }

    validKeys = validKeys.sort((a, b) => a - b);
    console.log(validKeys[63]);
});