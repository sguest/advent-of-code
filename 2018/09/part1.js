let lib = require('../../lib');

let year = 2018;
let day = 9;

lib.getInput(year, day).then((data) => {
    let parsed = /(\d+) players; last marble is worth (\d+) points/.exec(data);
    let numPlayers = +parsed[1];
    let lastMarble = +parsed[2];

    let current = { value: 0};
    current.prev = current;
    current.next = current;

    players = [];

    for(let i = 0; i < numPlayers; i++) {
        players[i] = 0;
    }
    let currentPlayer = numPlayers - 1;

    for(let num = 1; num <= lastMarble; num++) {
        currentPlayer = (currentPlayer + 1) % numPlayers;
        if(num % 23 === 0) {
            players[currentPlayer] += num;

            let target = current;
            for(let i = 0; i < 7; i++) {
                target = target.prev;
            }

            players[currentPlayer] += target.value;
            target.next.prev = target.prev;
            target.prev.next = target.next;
            current = target.next;
        }
        else {
            let target = current.next;
            let newMarble = {value: num, prev: target, next: target.next};
            target.next.prev = newMarble;
            target.next = newMarble;
            current = newMarble;
        }
    }

    console.log(Math.max.apply(null, players));

}).catch((err) => {
    console.log(err.stack);
});