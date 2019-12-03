let lib = require('../../lib');
let hasher = require('./hasher');

lib.getInput(2016, 14).then((input) => {
    console.log(hasher(input, 2017));
});