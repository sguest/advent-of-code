const lib = require('../../lib');
let crypto = require('crypto');

function md5(data) {
    return crypto.createHash('md5').update(data).digest('hex');
}
lib.getInput(2016, 5).then((input) => {
    var index = 0;

    var password = [];
    var foundCount = 0;

    while(foundCount < 8) {
        var hash = md5(input + index);
        if(hash.startsWith('00000')) {
            var place = parseInt(hash[5], 10);
            if(place <= 7 && !password[place]) {
                password[place] = hash[6];
                foundCount++;
            }
        }
        index++;
    }

    console.log(password.join(''));
});