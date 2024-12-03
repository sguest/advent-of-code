let lib = require('../../lib');

let year = 2015;
let day = 14;

lib.getInput(year, day).then((data) => {
    let parser = /^([a-z]+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds\.$/i;
    let reindeer = [];
    for(let line of data.split('\n')) {
        let parsed = parser.exec(line);
        reindeer.push({
            name: parsed[1],
            speed: parseInt(parsed[2], 10),
            flyTime: parseInt(parsed[3]),
            restTime: parseInt(parsed[4]),
            currentFly: 0,
            currentRest: 0,
            distance: 0,
            flying: true
        });
    }

    for(let time = 0; time < 2503; time++) {
        for(let deer of reindeer) {
            if(deer.flying) {
                deer.distance += deer.speed;
                deer.currentFly++;
                if(deer.currentFly >= deer.flyTime) {
                    deer.flying = false;
                    deer.currentFly = 0;
                }
            }
            else {
                deer.currentRest++;
                if(deer.currentRest >= deer.restTime) {
                    deer.flying = true;
                    deer.currentRest = 0;
                }
            }
        }
    }

    console.log(Math.max(...reindeer.map((x) => x.distance)));
});