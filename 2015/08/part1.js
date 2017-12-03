let fs = require('fs');

fs.readFile(__dirname + '\\input.txt', 'utf-8', (err, data) => {
    data = data.trim();
    var codeChars = 0;
    var stringChars = 0;
    for(let line of data.split('\n')) {
        codeChars += line.length;
        line = line.replace(/\\x[a-f0-9][a-f0-9]/g, 'a').replace(/\\\"/g, '"').replace(/\\\\/g, '\\').replace(/^\"/, '').replace(/\"$/, '');
        stringChars += line.length;
    }

    console.log(codeChars - stringChars);
});