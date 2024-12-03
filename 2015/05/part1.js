var fs = require('fs');

fs.readFile(__dirname + '\\input.txt', 'utf-8', (err, data) => {
    var count = 0;
    var doubleLetter = /(.)\1/;
    var threeVowels = /[aeiou].*[aeiou].*[aeiou]/;
    var disallowed = /(?:ab|cd|pq|xy)/;
    for(var line of data.trim().split('\n')) {
        if(doubleLetter.test(line) && threeVowels.test(line) && !disallowed.test(line)) {
            count++;
        }
    }
    console.log(count);
});