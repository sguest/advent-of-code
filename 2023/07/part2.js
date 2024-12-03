let lib = require('../../lib');

let year = 2023;
let day = 7;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let regularCards = [ 'A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3' ,'2' ];
    let cards = [ ...regularCards, 'J' ];
    let typeLookup = {
        '5': 1,
        '14': 2,
        '23': 3,
        '113': 4,
        '122': 5,
        '1112': 6,
        '11111': 7,
    }
    let rows = [];
    for(let line of lines) {
        let parts = line.split(' ');
        let hand = parts[0];
        let bid = +parts[1];

        let handCounts = {};
        for(let card of hand) {
            handCounts[card] = (handCounts[card] || 0) + 1;
        }
        let numJokers = handCounts.J;
        delete handCounts.J;
        let countValues = [];
        for(let card in handCounts) {
            countValues.push(handCounts[card]);
        }
        countValues.sort((a, b) => a - b);
        if(numJokers) {
            countValues[countValues.length - 1] += numJokers
        }
        let signature = countValues.join('');
        let type = typeLookup[signature];
        if(numJokers === 5) {
            type = 1;
        }

        rows.push({ hand, bid, type });
    }

    rows.sort((a, b) => {
        if(a.type !== b.type) {
            return b.type - a.type;
        }
        else {
            for(let i = 0; i < 5; i++) {
                if(a.hand[i] !== b.hand[i]) {
                    return cards.indexOf(b.hand[i]) - cards.indexOf(a.hand[i]);
                }
            }
        }
    });

    let total = 0;
    for(let i = 0; i < rows.length; i++) {
        total += (i + 1) * rows[i].bid;
    }

    console.log(total);
}).catch((err) => {
    console.log(err, err.stack);
});