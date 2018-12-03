let lib = require('../../lib');

let year = 2018;
let day = 3;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let parser = /\#(\d+) @ (\d+),(\d+)\: (\d+)x(\d+)/;
    let claimed = [];
    let overlaps = [];

    for(let i = 0; i <= 1000; i++) {
        claimed[i] = [];
        overlaps[i] = [];
    }

    let claims = [];

    for(let line of lines) {
        let parsed = parser.exec(line);
        let claimId = +parsed[1]
        let left = +parsed[2];
        let top = +parsed[3];
        let width = +parsed[4];
        let height = +parsed[5];
        
        claims.push({claimId, left, top, width, height});
    }

    for(let claim of claims) {
        let left = claim.left;
        let top = claim.top;
        let width = claim.width;
        let height = claim.height;

        for(let x = left; x < left + width; x++) {
            for(let y = top; y < top + height; y++) {
                if(claimed[x][y]) {
                    if(!overlaps[x][y]) {
                        overlaps[x][y] = true;
                    }
                }
                else {
                    claimed[x][y] = true;
                }
            }
        }
    }

    main: for(let claim of claims) {
        let claimId = claim.claimId;
        let left = claim.left;
        let top = claim.top;
        let width = claim.width;
        let height = claim.height;

        for(let x = left; x < left + width; x++) {
            for(let y = top; y < top + height; y++) {
                if(overlaps[x][y]) {
                    continue main;
                }
            }
        }
        console.log(claimId);
        break;
    }
}).catch((err) => {
    console.log(err.stack);
});
