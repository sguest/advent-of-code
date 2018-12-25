const lib = require('../../lib');

lib.getInput(2015, 20).then((data) => {
    let input = +data;

    let houseNum = 2;
    while(true) {
        let presents = houseNum * 11;
        let sqrt = Math.sqrt(houseNum);
        for(let target = 2; target <= sqrt; target++) {
            let result = houseNum / target;
            if(result === Math.floor(result) && result * 50 >= houseNum) {
                presents += result * 11;
            }
        }
        if(presents >= input) {
            console.log(houseNum);
            break;
        }
        houseNum ++;
    }
});