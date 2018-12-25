const lib = require('../../lib');

lib.getInput(2015, 10).then((input) => {
    for(let count = 0; count < 50; count++) {
        let newVal = '';

        let current = '';
        let currentCount = 0;

        for(let char of input) {
            if(char === current) {
                currentCount++;
            }
            else {
                if(currentCount > 0) {
                    newVal += currentCount + current;
                }
                currentCount = 1;
                current = char;
            }
        }
        newVal += currentCount + current;

        input = newVal;
    }

    console.log(input.length);
});