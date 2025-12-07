import fs from 'fs';
import path from 'path';
import http from 'https';
import readline from 'readline';

export function getInput(year: number, day: number) {
    return new Promise<string>((resolve, reject) => {

        let inputFile = getArgValue('inputfile');
        if(inputFile) {
            let currentDirectory = path.dirname(process.argv[1]);
            let inputFileName = path.resolve(currentDirectory, inputFile);
            fs.readFile(inputFileName, 'utf-8', (err, data) => {
                if(err) {
                    return reject(err);
                }
                resolve(data.replace(/\r\n/g, '\n').replace(/\n$/, ''));
            });
        }
        else {
            let rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
                terminal: false
            });

            let data = '';
            let timeout;

            function handleData(line) {
                clearTimeout(timeout);
                data += line + '\n';
            }

            function handleEnd() {
                resolve(data.replace(/\n$/, ''));
            }

            rl.on('line', handleData);
            rl.on('close', handleEnd);

            timeout = setTimeout(() => {
                rl.removeAllListeners();
                process.stdin.pause();
                getFile(year, day, resolve, reject);
            }, 100);
        }
    });
}

function getArgValue(argName) {
    for(let i = 0; i < process.argv.length; i++) {
        if(process.argv[i] === `--${argName}` && process.argv.length >= i) {
            return process.argv[i + 1];
        }
    }

    return null;
}

function getFile(year, day, resolve, reject) {
    let currentDirectory = path.dirname(process.argv[1]);
    let inputFileName = path.resolve(currentDirectory, 'input.txt');
    fs.exists(inputFileName, (exists) => {
        if(exists) {
            fs.readFile(inputFileName, 'utf-8', (err, data) => {
                if(err) {
                    return reject(err);
                }
                resolve(data.replace(/\r\n/g, '\n').replace(/\n$/, ''));
            });
        }
        else {
            let email = fs.readFileSync(path.resolve(import.meta.dirname, 'creator_email.txt'), 'utf-8') || '';
            // Auth cookie should be in a file named auth_cookie.txt in the same directory as this lib file.
            // Don't commit to source!!
            fs.readFile(path.resolve(import.meta.dirname, 'auth_cookie.txt'), 'utf-8', (err, secret) => {
                if(err) {
                    return reject(err);
                }
                let fileStream = fs.createWriteStream(inputFileName);
                let options = {
                    protocol: 'https:',
                    hostname: 'adventofcode.com',
                    path: `/${year}/day/${day}/input`,
                    headers: {
                        'Cookie': 'session=' + secret,
                        // https://www.reddit.com/r/adventofcode/comments/z9dhtd/please_include_your_contact_info_in_the_useragent/
                        'User-Agent': `https://github.com/sguest/advent-of-code/blob/master/lib/getInput.js by ${email}`,
                    }
                }
                let request = http.get(options, (response) => {
                    if(response.statusCode !== 200) {
                        fs.unlink(inputFileName, () => { });
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
                    fs.unlink(inputFileName, () => {});
                    reject(err.message);
                });
            });
        }
    });
}