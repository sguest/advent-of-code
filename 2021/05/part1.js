let lib = require('../../lib');

let year = 2021;
let day = 5;

lib.getInput(year, day).then((data) => {
    let datas = data.split('\n');
    let lines = [];
    for(let line of datas) {
        let parts = line.split(' -> ');
        let parts1 = parts[0].split(',');
        let parts2 = parts[1].split(',');
        lines.push({x1: +parts1[0], y1: +parts1[1], x2: +parts2[0], y2: +parts2[1]});
    }

    let vals = [];

    for(let line of lines) {
        if(line.x1 === line.x2) {
            vals[line.x1] = vals[line.x1] || [];
            let y1 = line.y1;
            let y2 = line.y2;
            if(y2 < y1) {
                [y1, y2] = [y2, y1];
            }
            for(let y = y1; y <= y2; y++)
            {
                vals[line.x1][y] = (vals[line.x1][y] || 0) + 1;
            }
        }
        else if(line.y1 === line.y2) {
            let x1 = line.x1;
            let x2 = line.x2;
            if(x2 < x1) {
                [x1, x2] = [x2, x1];
            }

            for(let x = x1; x <= x2; x++) {
                vals[x] = vals[x] || [];
                vals[x][line.y1] = (vals[x][line.y1] || 0) + 1;
            }
        }
    }

    let count = 0;
    for(let valLine of vals) {
        if(valLine) {
            for(let val of valLine) {
                if(val >= 2) {
                    count++;
                }
            }
        }
    }
    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});