var fs = require('fs');

fs.readFile(__dirname + '\\input.txt', 'utf-8', (err, data) => {
    var floor = 0;
    var position = 0;

    for(var char of data) {
        if(char === '(') {
            floor ++;
        }
        else {
            floor --;
        }
        position++;

        if(floor < 0) {
            console.log(position);
            break;
        }
    }
});