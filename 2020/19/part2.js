let lib = require('../../lib');

let year = 2020;
let day = 19;

function testStart(string, starts, allowEmpty) {
    if(!string.length) {
        return allowEmpty;
    }

    for(let start of starts) {
        if(string.startsWith(start)) {
            return testStart(string.slice(start.length), starts, true);
        }
    }

    return false;
}

function testStartEnd(string, starts, ends, allowEndless) {
    for(let end of ends) {
        if(string.endsWith(end)) {
            for(let start of starts) {
                if(string.startsWith(start)) {
                    return testStartEnd(string.slice(start.length, -end.length), starts, ends, true);
                }
            }
        }
    }

    if(allowEndless) {
        return testStart(string, starts, false);
    }

    return false;
}

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let completeRules = new Map();
    let partialRules = new Map();
    let messages = [];
    let mode = 0;

    for(let line of lines) {
        if(!line) {
            mode = 1;
        }
        else if(mode === 0) {
            let parts = line.split(': ');
            let ruleNum = parts[0];
            if(parts[1].startsWith('"')) {
                completeRules.set(ruleNum, parts[1].substring(1,2));
            }
            else {
                let options = [];
                for(let option of parts[1].split(' | ')) {
                    options.push(option.split(' '));
                }
                partialRules.set(ruleNum, options);
            }
        }
        else {
            messages.push(line);
        }
    }

    let dirty = true;
    while(dirty) {
        dirty = false;
        for(let arr of partialRules) {
            let key = arr[0];
            let value = arr[1];
            let finished = true;
            let newOptions = [];
            for(let option of value) {
                let results = [''];
                for(let value of option) {
                    if(completeRules.has(value)) {
                        let newResults = [];
                        for(let result of results) {
                            for(let completeRule of completeRules.get(value)) {
                                newResults.push(result + completeRule);
                            }
                        }
                        results = newResults;
                    }
                    else {
                        finished = false;
                    }
                }
                for(let result of results) {
                    newOptions.push(result);
                }
            }

            if(finished) {
                partialRules.delete(key);
                completeRules.set(key, newOptions);
                dirty = true;
            }
        }
    }

    let count = 0;
    let starts = completeRules.get('42');
    let ends = completeRules.get('31');
    for(let message of messages) {
        if(testStartEnd(message, starts, ends, false)) {
            count++;
        }
    }

    console.log(count);
}).catch((err) => {
    console.log(err, err.stack);
});