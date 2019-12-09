module.exports = function(getHash) {
    let index = 0;
    let candidates = {};
    let cutoffIndex = 0;
    let validKeys = [];

    while(!cutoffIndex || index < cutoffIndex) {
        if(candidates.length && candidates[0].index < index - 1000) {
            candidates.shift();
        }

        let hash = getHash();

        let regex = /([0-9a-f])\1\1\1\1/g;
        let parsed = regex.exec(hash);
        while(parsed) {
            let digit = parsed[1];

            for(let candidate of candidates[digit]) {
                if(candidate >= index - 1000) {
                    validKeys.push(candidate);
                    if(validKeys.length === 64) {
                        cutoffIndex = index + 1000;
                    }
                }
            }

            candidates[digit] = [];

            parsed = regex.exec(hash);
        }

        parsed = /([0-9a-f])\1\1/.exec(hash);
        if(parsed) {
            let digit = parsed[1];
            candidates[digit] = candidates[digit] || [];
            candidates[digit].push(index)
        }

        index++;
    }

    validKeys = validKeys.sort((a, b) => a - b);
    return validKeys[63];
}