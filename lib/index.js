let fs = require('fs');
let path = require('path');
let http = require('https');

let lib = {
    getInput: (year, day) => {
        return new Promise((resolve, reject) => {
            let currentDirectory = path.dirname(require.main.filename);
            let inputFileName = path.resolve(currentDirectory, 'input.txt');
            fs.exists(inputFileName, (exists) => {
                if(exists) {
                    fs.readFile(inputFileName, 'utf-8', (err, data) => {
                        if(err) {
                            return reject(err);
                        }
                        resolve(data.trim());                            
                    });
                }
                else {
                    // Auth cookie should be in a file named auth_cookie.txt in the same directory as this lib file.
                    // Don't commit to source!!
                    fs.readFile(path.resolve(__dirname, 'auth_cookie.txt'), 'utf-8', (err, secret) => {
                        if(err) {
                            return reject(err);
                        }
                        let fileStream = fs.createWriteStream(inputFileName);
                        let options = {
                            protocol: 'https:',
                            hostname: 'adventofcode.com',
                            path: `/${year}/day/${day}/input`,
                            headers: {'Cookie': 'session=' + secret}
                        }
                        let request = http.get(options, (response) => {
                            if(response.statusCode !== 200) {
                                fs.unlink(inputFileName);
                                reject(`Could not download from ${options.protocol}\/\/${options.hostname}${options.path} - ${response.statusCode} ${response.statusMessage}`)
                            }
                            else {
                                response.pipe(fileStream);
                                fileStream.on('finish', () => {
                                    fileStream.close(() => {
                                        fs.readFile(inputFileName, 'utf-8', (err, data) => {
                                            if(err) {
                                                return reject(err);
                                            }
                                            resolve(data.trim());
                                        });
                                    });
                                });
                            }
                        }).on('error', (err) => {
                            fs.unlink(inputFileName);
                            reject(err.message);
                        });
                    });
                }
            });
        });
    },
    //https://stackoverflow.com/a/43260158
    permutations: function permutations(a) {
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
}

module.exports = lib;