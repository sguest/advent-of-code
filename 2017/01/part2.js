var fs = require('fs');

fs.readFile(__dirname + '\\input.txt', 'utf-8', (err, data) => {
    var total = 0;
    data = data.trim();
    var length = data.length;
    for(var index = 0; index < data.length; index++) {
        var targetIndex = (index + length / 2) % length;
        if(data[index] === data[targetIndex]) {
            total += parseInt(data[index], 10);
        }
    }
    console.log(total);
});