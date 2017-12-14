let lib = require('../../lib');

let year = 2016;
let day = 21;

lib.getInput(year, day).then((data) => {
    let password = 'abcdefgh'.split('');
    for(let line of data.split('\n')) {
        let parsed = /^rotate (left|right) (\d+) steps?$/.exec(line);
        if(parsed) {
            let index = parseInt(parsed[2], 10);
            if(parsed[1] === 'right') {
                index = password.length - index;
            }
            password = password.slice(index).concat(password.slice(0, index))
            continue;
        }

        parsed = /^swap position (\d+) with position (\d+)$/.exec(line);
        if(parsed) {
            let index1 = parseInt(parsed[1], 10);
            let index2 = parseInt(parsed[2], 10);
            let temp = password[index1];
            password[index1] = password[index2];
            password[index2] = temp;
            continue;
        }

        parsed = /^swap letter ([a-z]) with letter ([a-z])$/.exec(line);
        if(parsed) {
            let index1 = password.indexOf(parsed[1]);
            let index2 = password.indexOf(parsed[2]);
            let temp = password[index1];
            password[index1] = password[index2];
            password[index2] = temp;
            continue;
        }

        parsed = /^reverse positions (\d+) through (\d+)$/.exec(line);
        if(parsed) {
            let index1 = parseInt(parsed[1], 10);
            let index2 = parseInt(parsed[2], 10);
            let reversed = password.slice(index1, index2 + 1).reverse();
            password.splice(index1, index2 - index1 + 1, ...reversed);
            continue;
        }

        parsed = /^move position (\d+) to position (\d+)$/.exec(line);
        if(parsed) {
            let index1 = parseInt(parsed[1], 10);
            let index2 = parseInt(parsed[2], 10);
            let moved = password.splice(index1, 1)[0];
            password.splice(index2, 0, moved);
            continue;
        }

        parsed = /^rotate based on position of letter ([a-z])$/.exec(line);
        if(parsed) {
            let index = password.indexOf(parsed[1]);
            if(index >= 4) {
                index++;
            }
            index++;
            index = password.length - index;
            password = password.slice(index).concat(password.slice(0, index))   
        }
    }
    console.log(password.join(''));  
});