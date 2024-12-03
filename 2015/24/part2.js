let lib = require('../../lib');
let Combinatorics = require('js-combinatorics');

let year = 2015;
let day = 24;

let targetWeight;

function findCandidates(packages) {
    for(let length = 2; length < packages.length; length++) {
        let cmb = Combinatorics.combination(packages, length);
        let candidates = [];
    
        let subList = cmb.next();
        while(subList) {
            var subWeight = subList.reduce((a, b) => a + b);
            
            if(subWeight === targetWeight) {
                candidates.push(subList);
            }
            subList = cmb.next();
        }

        if(candidates.length) {
            return candidates;
        }
    }
}

lib.getInput(year, day).then((data) => {
    let packages = data.split('\n').map(x => parseInt(x, 10));
    let totalWeight = packages.reduce((prev,  current) => prev + current);
    targetWeight = totalWeight / 4;

    let candidates = findCandidates(packages);

    var entanglements = candidates.map((arr) => arr.reduce((a,b) => a * b));
    let minEntanglement = Math.min(...entanglements);

    console.log(minEntanglement);
}).catch((err) => {
    console.log(err.stack);
});