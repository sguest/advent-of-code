let lib = require('../../lib');

let year = 2020;
let day = 22;

function playGame(decks, depth) {
    let prevState = new Set();
    let max = [0, 0];
    for(let player = 0; player <= 1; player++) {
        for(let card of decks[player]) {
            max[player] = Math.max(max[player], card);
        }
    }
    if(max[0] > max[1] && depth > 0) {
        /*
            Can short-circuit a subgame if player 1 has the highest card
            - Highest card will never result in a sub-game, since each number is unique the highest card will always be more than the cards left after drawing it
            - Highest card will never lose a direct draw, by definition
            - If a repeated sequence is ever found, player 1 wins
            Can't short-circuit main game (depth 0) since we still need to find the correct order of the cards
        */
        return 0;
    }
    while(decks[0].length && decks[1].length) {
        let currentState = '';
        for(let card of decks[0]) {
            currentState += card + ',';
        }
        currentState += '|';
        for(let card of decks[1]) {
            currentState += card + ',';
        }
        if(prevState.has(currentState)) {
            return 0;
        }
        prevState.add(currentState);

        let cards = [];
        cards[0] = decks[0].shift();
        cards[1] = decks[1].shift();

        let winner;
        if(decks[0].length >= cards[0] && decks[1].length >= cards[1]) {
            let newDecks = [new lib.linkedList(), new lib.linkedList()];

            for(let player = 0; player <= 1; player++) {
                let count = 0;
                for(let card of decks[player]) {
                    if(count < cards[player]) {
                        newDecks[player].push(card);
                        count++;
                    }
                }
            }

            winner = playGame(newDecks, depth + 1);
        }
        else {
            if(cards[0] > cards[1]) {
                winner = 0;
            }
            else {
                winner = 1;
            }
        }

        if(winner === 0) {
            decks[0].push(cards[0]);
            decks[0].push(cards[1]);
        }
        else {
            decks[1].push(cards[1]);
            decks[1].push(cards[0]);
        }
    }

    return decks[0].length ? 0 : 1;
}

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

    let winnerIndex = playGame(decks, 0);

    let winner = decks[winnerIndex];

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