let fs = require('fs');

fs.readFile(__dirname + '\\input.txt', 'utf-8', (err, data) => {
    data = data.trim();
    var codeChars = 0;
    var stringChars = 0;
    for(let line of data.split('\n')) {
        stringChars += line.length;
        line = '"' + line.replace(/\\/g, '\\\\').replace(/\"/g, '\\"') + '"';
        codeChars += line.length;
    }

    console.log(codeChars - stringChars);
});