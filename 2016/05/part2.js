var md5 = require('md5');

var input = 'ojvtpuvg';

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