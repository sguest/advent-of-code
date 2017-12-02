let fs = require('fs');

fs.readFile(__dirname + '\\input.txt', 'utf-8', (err, data) => {
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
        let min = Infinity;
        for(let char in count) {
            if(count[char] < min) {
                letter = char;
                min = count[char];
            }
        }

        message += letter;
    }

    console.log(message);
});