let fs = require('fs');

fs.readFile(__dirname + '\\input.txt', 'utf-8', (err, data) => {
    data = data.trim();

    let count = 0;

    for(let line of data.split('\n')) {
        var words = line.split(/\s/);

        words = words.sort();

        let valid = true;
        for(let index = 0; index < words.length - 1; index++) {
            if(words[index] === words[index + 1]) {
                valid = false
            }
        }

        if(valid) {
            count++;
        }
    }

    console.log(count);
});