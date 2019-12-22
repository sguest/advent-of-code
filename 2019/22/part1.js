let lib = require('../../lib');

let year = 2019;
let day = 22;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    
    let cards = new lib.linkedList();

    for(let i = 0; i < 10007; i++) {
        cards.push(i);
    }

    for(let line of lines) {
        if(line === 'deal into new stack') {
            let newCards = new lib.linkedList();

            while(cards.any()) {
                newCards.unshift(cards.shift());
            }
            cards = newCards;
        }
        else if(/^cut/.test(line)) {
            let cutAmount = +(line.split(' ')[1]);

            if(cutAmount > 0) {
                for(let i = 0; i < cutAmount; i++) {
                    cards.push(cards.shift());
                }
            }
            else {
                for(let i = 0; i < Math.abs(cutAmount); i++) {
                    cards.unshift(cards.pop());
                }
            }
        }
        else if(/^deal with increment/.test(line)) {
            let incrementAmount = +(line.split(' ')[3]);
            let newCards = [];

            let pointer = 0;
            
            for(let i = 0; i < 10007; i++) {
                newCards[pointer] = cards.shift();
                pointer = (pointer + incrementAmount) % 10007;
            }

            let newList = new lib.linkedList();

            while(newCards.length) {
                newList.unshift(newCards.pop());
            }

            cards = newList;
        }
        else {
            throw `Unrecognized line ${line}`;
        }
    }

    let index = 0;

    for(let card of cards) {
        if(card === 2019) {
            console.log(index);
            process.exit(0);
        }
        index++;
    }
}).catch((err) => {
    console.log(err, err.stack);
});