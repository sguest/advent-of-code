const { pairLcm } = require('./lcm');

module.exports = {
    getInput: require('./getInput'),
    permutations: require('./permutations'),
    knotHash: require('./knotHash'),
    linkedList: require('./linkedList'),
    lcm: require('./lcm').lcm,
    pairLcm: require('./lcm').pairLcm,
    gcd: require('./lcm').gcd,
}