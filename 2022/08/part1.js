let lib = require('../../lib');

let year = 2022;
let day = 8;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let trees = [];
    let visible = [];
    for(let line of lines) {
        trees.push(line.split('').map(x => +x));
        visible.push([]);
    }

    let count = 0;
    for(let x = 0; x < trees.length; x++) {
        let tallest = -1;
        let y = 0;
        while(y < trees[x].length && tallest < 9) {
            if(trees[x][y] > tallest) {
                tallest = trees[x][y];
                if(!visible[x][y]) {
                    count ++;
                    visible[x][y] = true;
                }
            }
            y++;
        }
        tallest = -1;
        y = trees[x].length -1;
        while(y >= 0 && tallest < 9) {
            if(trees[x][y] > tallest) {
                tallest = trees[x][y];
                if(!visible[x][y]) {
                    count++;
                    visible[x][y] = true;
                }
            }
            y--;
        }
    }

    for(let y = 0; y < trees[0].length; y++) {
        let tallest = -1;
        let x = 0;
        while(x < trees.length && tallest < 9) {
            if(trees[x][y] > tallest) {
                tallest = trees[x][y];
                if(!visible[x][y]) {
                    count++;
                    visible[x][y] = true;
                }
            }
            x++;
        }
        tallest = -1;
        x = trees.length - 1;;
        while(x >= 0 && tallest < 9) {
            if(trees[x][y] > tallest) {
                tallest = trees[x][y];
                if(!visible[x][y]) {
                    count++;
                    visible[x][y] = true;
                }
            }
            x--;
        }
    }

    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});