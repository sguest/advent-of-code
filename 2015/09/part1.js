let lib = require('../../lib');

//shamelessly stolen https://stackoverflow.com/questions/9960908/permutations-in-javascript/37580979#37580979
function permute(permutation) {
    var length = permutation.length,
        result = [permutation.slice()],
        c = new Array(length).fill(0),
        i = 1, k, p;

    while (i < length) {
      if (c[i] < i) {
        k = i % 2 && c[i];
        p = permutation[i];
        permutation[i] = permutation[k];
        permutation[k] = p;
        ++c[i];
        i = 1;
        result.push(permutation.slice());
      } else {
        c[i] = 0;
        ++i;
      }
    }
    return result;

}
lib.getInput(2015,9).then(data => {
    let parse = /^([a-zA-Z]+) to ([a-zA-Z]+) = (\d+)$/;
    let distances = {};
    let locations = [];
    for(let line of data.split('\n')) {
        let parsed = parse.exec(line);
        let place1 = parsed[1];
        let place2 = parsed[2];
        let distance = parseInt(parsed[3], 10);
        if(locations.indexOf(place1) === -1) {
            locations.push(place1);
        }
        if(locations.indexOf(place2) === -1) {
            locations.push(place2);
        }
        distances[place1 + place2] = distance;
        distances[place2 + place1] = distance;
    }

    let minDistance = Infinity;

    for(path of permute(locations)) {
        let distance = 0;
        for(let index = 0; index < path.length - 1; index++) {
            distance += distances[path[index] + path[index + 1]];
        }
        if(distance < minDistance) {
            minDistance = distance;
        }
    }

    console.log(minDistance);
});