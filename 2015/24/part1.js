/*
  This gets the right answer for part 1 (for my input at least)
  However, I think I may have just been lucky, since it's wrong
  if used for part 2 (i.e. 4 groups), which shouldn't be any
  different. Part 2's answer is much better, and gets the correct
  part 1 answer when plugging in 3 groups.
*/
let lib = require('../../lib');

let year = 2015;
let day = 24;

let targetWeight;
let maxPossible;

function findBestCompartment(current, remaining) {
  if(current.length > maxPossible) {
    return [];
  }
  
  let currentWeight = 0;
  if(current.length) {
    currentWeight = current.reduce((a, b) => a + b);
  }

  if(currentWeight > targetWeight) {
    return [];
  }
  
  if(currentWeight === targetWeight) {
    return [current];
  }
  
  let candidates = [];
  let minLength = Infinity;
  
  if(current.length < maxPossible - 1) {
    for(let index = remaining.length - 1; index >= 0; index--) {
      let newRemaining = remaining.slice(0);
      let newCurrent = current.slice(0);
      newCurrent.push(newRemaining.splice(index, 1)[0]);
      
      let newCandidates = findBestCompartment(newCurrent, newRemaining);
      
      if(newCandidates.length) {
        if(newCandidates[0].length < minLength) {
          candidates = newCandidates;
          minLength = newCandidates[0].length;
          maxPossible = minLength;
        }
        else if(newCandidates[0].length === minLength)  {
          candidates = candidates.concat(newCandidates);
        }
      }
    }
  }
  
  return candidates;
}

lib.getInput(year, day).then((data) => {
    let packages = data.split('\n').map(x => parseInt(x, 10));
    let totalWeight = packages.reduce((prev,  current) => prev + current);
    targetWeight = totalWeight / 3;
    maxPossible = Math.floor(packages.length / 3);

    var candidates = findBestCompartment([], packages);

    var entanglements = candidates.map((arr) => arr.reduce((a,b) => a * b));
    let minEntanglement = Math.min(...entanglements);

    console.log(minEntanglement);
}).catch((err) => {
    console.log(err.stack);
});