const lib = require('../../lib');

lib.getInput(2015, 11).then((input) => {
    let validCount = 0;

    while(validCount < 2) {
        let valid = false;
        while(!valid) {
            let carry = true;
            let charIndex = 7;

            while(carry) {
                let val = parseInt(input[charIndex], 36);
                if(val === 35) {
                    input = input.substring(0, charIndex) + 'a' + input.substring(charIndex + 1);
                    carry = true;
                    charIndex--;
                }
                else {
                    carry = false;
                    input = input.substring(0, charIndex) + (val + 1).toString(36) + input.substring(charIndex + 1);
                }
            }

            if(/[iol]/.test(input)) {
                continue;
            }

            let index;

            for(index = 0; index < 6; index++) {
                if(parseInt(input[index], 36) + 1 === parseInt(input[index + 1], 36) && parseInt(input[index], 36) + 2 === parseInt(input[index + 2], 36)) {
                    valid = true;
                }
            }

            if(!valid) {
                continue;
            }

            valid = false;

            index = 0;
            let foundDoubles = 0;
            while(index < 7) {
                if(input[index] === input[index + 1]) {
                    foundDoubles ++;
                    index += 2;
                }
                else {
                    index++;
                }
            }

            valid = (foundDoubles >= 2);
        }
        validCount++;
    }

    console.log(input);
});