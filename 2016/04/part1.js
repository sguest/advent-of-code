var fs = require('fs');

fs.readFile(__dirname + '\\input.txt', 'utf-8', (err, data) => {
    var total = 0;
    for(var line of data.trim().split('\n')) {
        var parts = line.split('-');
        var numAndChecksum = parts.pop();
        var name = parts.join('');
        var sectorId = parseInt(numAndChecksum, 10);
        var checksum = numAndChecksum.split('[')[1].substring(0, 5);
        var letterCounts = {};
        for(var char of name) {
            letterCounts[char] = (letterCounts[char] || 0) + 1;
        }
        var countArray = [];
        for(var letter in letterCounts) {
            countArray.push({letter: letter, count: letterCounts[letter]});
        }
        countArray = countArray.sort((a, b) => (b.count - a.count) || a.letter.localeCompare(b.letter));
        var expectedChecksum = '';
        for(var i = 0; i < 5; i++) {
            expectedChecksum += countArray[i].letter;
        }
        if(checksum === expectedChecksum) {
            total += sectorId;
        }
    }

    console.log(total);
});