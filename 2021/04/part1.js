let lib = require('../../lib');

let year = 2021;
let day = 4;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let calls = lines.shift().split(',').map(x => +x);

    let boards = [];
    let currentBoard;
    for(let line of lines) {
        if(!line) {
            if(currentBoard) {
                boards.push(currentBoard);
            }
            currentBoard = { lines: [], rows: [], cols: [], hits: [] };
        }
        else {
            currentBoard.lines.push(line.split(' ').filter(x => x !== '').map(x => +x));
        }
    }

    boards.push(currentBoard);

    let callIndex = -1;
    let found = false;
    while(!found) {
        callIndex++;
        let call = calls[callIndex];
        for(let board of boards) {
            for(let y = 0; y < 5; y++) {
                let line = board.lines[y];
                for(let x = 0; x < 5; x++) {
                    let val = line[x];
                    if(val === call) {
                        board.rows[y] = (board.rows[y] || 0) + 1;
                        board.cols[x] = (board.cols[x] || 0) + 1;
                        board.hits[y] = board.hits[y] || [];
                        board.hits[y][x] = true;
                        if(board.rows[y] === 5 || board.cols[x] === 5) {
                            found = true;
                            let unmarked = 0;
                            for(let yy = 0; yy < 5; yy++) {
                                let line = board.lines[yy];
                                for(let xx = 0; xx < 5; xx++) {
                                    if(!board.hits[yy] || !board.hits[yy][xx]) {
                                        unmarked += line[xx];
                                    }
                                }
                            }
            
                            console.log(unmarked * call);
                        }
                    }
                }
            }
        }
    }
}).catch((err) => {
    console.log(err, err.stack);
});