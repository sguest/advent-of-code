let lib = require('../../lib');

let year = 2025;
let day = 6;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let i = 0;
    let nums = [];
    let operator = '+';
    let total = 0;

    const doOp = () => {
        if(operator === '+') {
            for(let num of nums) {
                total += num;
            }
        }
        else
        {
            let current = 1;
            for(let num of nums) {
                current *= num;
            }
            total += current;
        }
    }

    while(i < lines[0].length) {
        let newOp = lines[4][i];
        if(newOp !== ' ') {
            doOp();
            operator = newOp;
            nums = [];
        }

        let newNum = parseInt(lines[0][i] + lines[1][i] + lines[2][i] + lines[3][i])
        if(!isNaN(newNum))
        {
            nums.push(newNum);
        }
        i++;
    }

    doOp();

    console.log(total);
}).catch((err) => {
    console.log(err, err.stack);
});