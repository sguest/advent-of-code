// https://stackoverflow.com/a/31302607

function gcd(a, b) {
    return !b ? a : gcd(b, a % b);
}

function pairLcm(a, b) {
    return (a * b) / gcd(a, b);   
}

function lcm(...nums) {
    let multiple = nums[0];
    nums.forEach(n => multiple = pairLcm(multiple, n));
    return multiple;
}

module.exports = { gcd, lcm, pairLcm }