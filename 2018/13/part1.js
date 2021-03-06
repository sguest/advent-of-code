let lib = require('../../lib');

let year = 2018;
let day = 13;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let carts = [];
    let tracks = [];

    let y = 0;
    for(let line of lines) {
        for(let x = 0; x < line.length; x++) {
            tracks[x] = tracks[x] || [];
            let current = line[x];
            if(current === '^') {
                carts.push({ x, y, dir: 'u', lastTurn: 'r'});
                tracks[x][y] = '|';
            }
            else if(current === 'v') {
                carts.push({ x, y, dir: 'd', lastTurn: 'r'});
                tracks[x][y] = '|';
            }
            else if(current === '<') {
                carts.push( {x, y, dir: 'l', lastTurn: 'r'});
                tracks[x][y] = '-';
            }
            else if(current === '>') {
                carts.push({ x, y, dir: 'r', lastTurn: 'r'});
                tracks[x][y] = '-';
            }
            else {
                tracks[x][y] = current;
            }
        }
        y++;
    }

    main: while(true) {
        carts = carts.sort((a, b) => (a.y * 1000 + a.x) - (b.y * 1000 + b.x));

        for(let cart of carts) {
            switch(cart.dir) {
                case 'u' :
                    cart.y--;
                    break;
                case 'd':
                    cart.y++;
                    break;
                case 'l':
                    cart.x--;
                    break;
                case 'r':
                    cart.x++;
                    break;
                }

            var curTrack = tracks[cart.x][cart.y];

            if(curTrack === '/') {
                switch(cart.dir) {
                    case 'u':
                        cart.dir = 'r';
                        break;
                    case 'd':
                        cart.dir = 'l';
                        break;
                    case 'l':
                        cart.dir = 'd';
                        break;
                    case 'r':
                        cart.dir = 'u';
                        break;
                }
            }
            else if(curTrack === '\\') {
                switch(cart.dir) {
                    case 'u':
                        cart.dir = 'l';
                        break;
                    case 'd':
                        cart.dir = 'r';
                        break;
                    case 'l':
                        cart.dir = 'u';
                        break;
                    case 'r':
                        cart.dir = 'd';
                        break;
                }
            }
            else if(curTrack === '+') {
                switch(cart.lastTurn) {
                    case 'r':
                        cart.lastTurn = 'l';
                        switch(cart.dir) {
                            case 'u' :
                                cart.dir = 'l';
                                break;
                            case 'd':
                                cart.dir = 'r';
                                break;
                            case 'l':
                                cart.dir = 'd';
                                break;
                            case 'r':
                                cart.dir = 'u';
                                break;
                        }
                        break;
                    case 'l':
                        cart.lastTurn = 's';
                        break;
                    case 's':
                        cart.lastTurn = 'r';
                        switch(cart.dir) {
                            case 'u' :
                                cart.dir = 'r';
                                break;
                            case 'd':
                                cart.dir = 'l';
                                break;
                            case 'l':
                                cart.dir = 'u';
                                break;
                            case 'r':
                                cart.dir = 'd';
                                break;
                        }
                        break;
                }
            }

            for(let cart2 of carts) {
                if(cart !== cart2 && cart.x === cart2.x && cart.y === cart2.y) {
                    console.log(cart.x + ',' + cart.y);
                    break main;
                }
            }
        }
    }
}).catch((err) => {
    console.log(err.stack);
});