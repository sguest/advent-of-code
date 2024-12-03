let lib = require('../../lib');

let year = 2018;
let day = 4;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    lines = lines.sort();
    let currentGuard;
    let currentInterval;

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
            currentInterval.wake = minute;
            guardStats[currentGuard][day].intervals = guardStats[currentGuard][day].intervals || [];
            guardStats[currentGuard][day].intervals.push(currentInterval);
        }
        else if(parts[1] === 'falls asleep') {
            sleepTime = minute;
            guardStats[currentGuard][day] = guardStats[currentGuard][day] || {};
            currentInterval = { sleep: minute, day: day };
        }
    }

    let lazyGuard = 0;
    let maxSleep = 0;

    for(let guardId in guardStats) {
        let sleep = 0;

        let currentStats = guardStats[guardId];
        for(let day in currentStats) {
            for (let interval of currentStats[day].intervals) {
                sleep += interval.wake - interval.sleep;
            }
        }

        if(sleep > maxSleep) {
            lazyGuard = guardId;
            maxSleep = sleep;
        }
    }

    let lazyGuardStats = guardStats[lazyGuard];

    let sleepTimes = {};

    for(let day in lazyGuardStats) {
        for(let interval of lazyGuardStats[day].intervals) {
            for(let i = interval.sleep; i < interval.wake; i++) {
                sleepTimes[i] = (sleepTimes[i] || 0) + 1;
            }
        }
    }

    let maxSleepTime = 0;
    let maxMinute = 0;

    for(let sleepTime in sleepTimes) {
        if(sleepTimes[sleepTime] > maxSleepTime) {
            maxSleepTime = sleepTimes[sleepTime];
            maxMinute = sleepTime;
        }
    }

    console.log(lazyGuard * maxMinute);
}).catch((err) => {
    console.log(err.stack);
});