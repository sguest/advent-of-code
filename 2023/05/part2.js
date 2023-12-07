let lib = require('../../lib');

let year = 2023;
let day = 5;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let seeds = lines[0].split(' ').map(x => +x);
    let ranges = [];
    for(let i = 1; i < seeds.length; i += 2) {
        ranges.push({ start: seeds[i], end: seeds[i] + seeds[i + 1] - 1});
    }

    let i = 1;
    let maps = [];
    while(i < lines.length) {
        let map = [];
        let name = lines[i + 1]
        i += 2;
        while(lines[i]) {
            let parts = lines[i].split(' ');
            let destStart = +parts[0];
            let sourceStart = +parts[1];
            let range = +parts[2];

            map.push({ destStart, destEnd: destStart + range - 1, sourceStart, sourceEnd: sourceStart + range - 1, range, name });
            i++;
        }
        maps.push(map);
    }

    let current = ranges;
    for(let map of maps) {
        let next = [];
        for(let item of current) {
            let handled = [];
            for(let mapItem of map) {
                if(mapItem.sourceStart <= item.end && mapItem.sourceEnd >= item.start) {
                    let startOffset = Math.max(0, item.start - mapItem.sourceStart);
                    let endOffset = Math.max(0, mapItem.sourceEnd - item.end);
                    next.push({ start: mapItem.destStart + startOffset, end: mapItem.destEnd - endOffset });
                    handled.push({ start: mapItem.sourceStart + startOffset, end: mapItem.sourceEnd - endOffset })
                }
            }
            handled = handled.sort((a, b) => a.start - b.start);
            let currentValue = item.start;
            for(let handledItem of handled) {
                if(handledItem.start > currentValue) {
                    next.push({ start: currentValue, end: handledItem.start - 1});
                }
                currentValue = handledItem.end + 1;
            }
            if(currentValue < item.end) {
                next.push({ start: currentValue, end: item.end });
            }
        }

        current = next;
    }
    let min = Infinity;
    for(let item of current) {
        if(item.start < min) {
            min = item.start;
        }
    }
    console.log(min)
}).catch((err) => {
    console.log(err, err.stack);
});