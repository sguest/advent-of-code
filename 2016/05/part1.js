var md5 = require('md5');

var input = 'ojvtpuvg';

var index = 0;

var password = '';

while(password.length < 8) {
    var hash = md5(input + index);
    if(hash.startsWith('00000')) {
        password += hash[5];
    }
    index++;
}

console.log(password);