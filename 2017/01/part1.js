var fs = require('fs');

fs.readFile(__dirname + '\\input.txt', 'utf-8', (err, data) => {
    var total = 0;
    data = data.trim();
    for(var index = 0; index < data.length; index++) {
        if(data[index] === data[index + 1]) {
            total += parseInt(data[index], 10);
        }
    }
    if(data[0] === data[data.length - 1]) {
        total += parseInt(data[0], 10);
    }
    console.log(total);
});