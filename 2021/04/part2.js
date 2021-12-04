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
    let call;
    let lastWinner;
    while(boards.length) {
        let winners = [];
        callIndex++;
        call = calls[callIndex];
        for(let boardNum = 0; boardNum < boards.length; boardNum++) {
            let board = boards[boardNum]
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
                            winners.push(boardNum);
                        }
                    }
                }
            }
        }

        for(let i = winners.length - 1; i >= 0; i--) {
            lastWinner = boards.splice(winners[i], 1)[0];
        }
    }

    let unmarked = 0;
    for(let yy = 0; yy < lastWinner.lines.length; yy++) {
        let line = lastWinner.lines[yy];
        for(let xx = 0; xx < line.length; xx++) {
            if(!lastWinner.hits[yy] || !lastWinner.hits[yy][xx]) {
                unmarked += line[xx];
            }
        }
    }

    console.log(unmarked * call);
}).catch((err) => {
    console.log(err, err.stack);
});