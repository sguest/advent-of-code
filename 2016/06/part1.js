let lib = require('../../lib');

lib.getInput(2016, 6).then((data) => {
    data = data.trim();
    let counts = [{},{},{},{},{},{},{},{}];
    for(let line of data.split('\n')) {
        for(let index = 0; index < line.length; index++) {
            let char = line[index];
            let count = counts[index];
            count[char] = (count[char] || 0) + 1;
        }
    }

    let message = '';

    for(let count of counts) {
        let letter = '';
        let max = 0;
        for(let char in count) {
            if(count[char] > max) {
                letter = char;
                max = count[char];
            }
        }

        message += letter;
    }

    console.log(message);
});