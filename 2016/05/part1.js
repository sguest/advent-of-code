const lib = require('../../lib');
let crypto = require('crypto');

function md5(data) {
    return crypto.createHash('md5').update(data).digest('hex');
}
lib.getInput(2016, 5).then((input) => {
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
});