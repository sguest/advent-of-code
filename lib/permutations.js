//https://stackoverflow.com/a/43260158
function permutations(a) {
    let res = [];
    for(let i=0; i<a.length; i++){
        let restA = a.slice(0,i).concat(a.slice(i+1));
        let rest = permutations( restA);
        if(rest.length === 0){
            res.push([a[i]]);
        }
        else {
            for(let j=0; j<rest.length; j++){
                res.push([a[i]].concat(rest[j]));
            }
        }
    }
    return res;
}

module.exports = permutations;