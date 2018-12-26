var fs = require('fs');

fs.readFile(__dirname + '\\input.txt', 'utf-8', (err, data) => {
    var letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
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
            var shift = sectorId % 26;
            var shiftedParts = [];

            for(var part of parts) {
                shiftedName = '';
                for(var letter of part) {
                    var index = letters.indexOf(letter);
                    index = (index + shift) % 26;
                    shiftedName += letters[index];
                }
                shiftedParts.push(shiftedName);
            }
            if(shiftedParts.join(' ') === 'northpole object storage') {
                console.log(sectorId);
                break;
            }
        }
    }
});