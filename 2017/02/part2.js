let fs = require('fs');

fs.readFile(__dirname + '\\input.txt', 'utf-8', (err, data) => {
    data = data.trim();
    let total = 0;
    for(let line of data.split('\n')) {
        let nums = line.split(/\s+/).map(x => parseInt(x, 10));
        
        for(let index1 = 0; index1 < nums.length; index1++) {
            for(let index2 = index1 + 1; index2 < nums.length; index2++) {
                let num1 = nums[index1];
                let num2 = nums[index2];
                if(num1 % num2 === 0)
                {
                    total += num1 / num2;
                }

                if(num2 % num1 === 0) {
                    total += num2 / num1;
                }
            }
        }
    }
    console.log(total);
});