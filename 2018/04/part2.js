let lib = require('../../lib');

let year = 2018;
let day = 4;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    lines = lines.sort();
    let currentGuard;
    let currentSleep;

    let guardStats = {};

    let timeParse = /\[1518-(\d+)-(\d+) \d+:(\d+)/;
    let shiftParse = /Guard #(\d+) begins shift/;

    for(let line of lines) {
        let parts = line.split('] ');
        let timeParsed = timeParse.exec(parts[0]);
        let month = +timeParsed[1];
        let day = +timeParsed[2];
        let minute = +timeParsed[3];
        let guardParsed = shiftParse.exec(parts[1]);

        if(guardParsed) {
            currentGuard = +guardParsed[1];
            guardStats[currentGuard] = guardStats[currentGuard] || {};
        }
        else if(parts[1] === 'wakes up') {
            for(let i = currentSleep; i < minute; i++) {
                guardStats[currentGuard][i] = (guardStats[currentGuard][i] || 0) + 1;
            }
        }
        else if(parts[1] === 'falls asleep') {
            sleepTime = minute;
            guardStats[currentGuard];
            currentSleep = minute;
        }
    }

    let lazyGuard = 0;
    let maxSleepCount = 0;
    let foundMinute = 0;

    for(let guardId in guardStats) {
        let sleep = 0;

        let currentStats = guardStats[guardId];
        for (let minute in currentStats) {
            if(currentStats[minute] > maxSleepCount) {
                lazyGuard = guardId;
                maxSleepCount = currentStats[minute];
                foundMinute = minute;
            }
        }
    }

    console.log(lazyGuard * foundMinute);
}).catch((err) => {
    console.log(err.stack);
});