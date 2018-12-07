let fs = require('fs');
let path = require('path');

function getSample(filename) {
    filename = filename || 'sample.txt'
    return new Promise((resolve, reject) => {
        let currentDirectory = path.dirname(require.main.filename);
        let inputFileName = path.resolve(currentDirectory, filename);
        fs.readFile(inputFileName, 'utf-8', (err, data) => {
            if(err) {
                return reject(err);
            }
            resolve(data.trim());
        });
    });
}

module.exports = getSample;