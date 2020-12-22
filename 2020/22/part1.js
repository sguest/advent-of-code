let lib = require('../../lib');

let year = 2020;
let day = 22;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let player = -1;
    let decks = [new lib.linkedList(), new lib.linkedList()];
    for(let line of lines) {
        if(line.startsWith('Player')) {
            player++;
        }
        else if(line.length) {
            decks[player].push(+line);
        }
    }

    while(decks[0].length && decks[1].length) {
        let card1 = decks[0].shift();
        let card2 = decks[1].shift();
        if(card1 > card2) {
            decks[0].push(card1);
            decks[0].push(card2);
        }
        else {
            decks[1].push(card2);
            decks[1].push(card1);
        }
    }

    let winner = decks[0].length ? decks[0] : decks[1];

    let multiplier = winner.length;
    let score = 0;
    for(let card of winner) {
        score += card * multiplier;
        multiplier--;
    }

    console.log(score);
}).catch((err) => {
    console.log(err, err.stack);
});