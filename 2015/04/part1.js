var md5 = require('md5');

var secret = 'bgvyzdsv';
var index = 1;

while(true) {
    var result = md5(secret + index);
    if(/^00000/.test(result)) {
        console.log(index);
        break;
    }
    index++;
}