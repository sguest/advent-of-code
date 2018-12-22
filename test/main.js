const fs = require('fs');
const execFile = require('child_process').execFile;
const path = require('path');
const chalk = require('chalk');

runTests();

async function runTests() {
    for(let year = 2015; year <= 2018; year++) {
        for(let day = 1; day <= 25; day++) {
            for(let part = 1; part <= 2; part++) {
                await testAnswer(year, day, part);
            }
        }
    }
}

function testAnswer(year, day, part) {
    return new Promise((resolve, reject) => {
        let dayString = day.toString();
        if(dayString.length === 1) {
            dayString = '0' + dayString
        }
        let dir = path.join(__dirname, `../${year}/${dayString}`);
        let answerPath = path.join(dir, `answer${part}.txt`);

        fs.stat(answerPath, (err, stats) => {
            if(err || !stats) {
                return resolve();
            }

            process.stdout.write(`Year ${chalk.blue(year)} day ${chalk.blue(day)} part ${chalk.blue(part)}`);
    
            fs.readFile(answerPath, 'utf-8', (err, data) => {
                if(err) {
                    return reject(err);
                }
    
                let answer = data.trim();
    
                let startTime;
                let output;
                const child = execFile('node', [path.join(dir, `part${part}.js`)], (err, stdout) => {
                    if(err) {
                        return reject(err);
                    }
                    output = stdout.trim();
                });
            
                child.on('close', () => {
                    let elapsed = Date.now() - startTime;
                    let resultMark;
                    if(answer === output) {
                        resultMark = chalk.green('✓');
                    }
                    else {
                        resultMark = chalk.red('✘')
                    }
    
                    let elapsedOutput;
                    if(elapsed < 1000) {
                        elapsedOutput = chalk.green(elapsed + 'ms');
                    }
                    else if(elapsed < 10000) {
                        elapsedOutput = chalk.yellow(elapsed + 'ms');
                    }
                    else {
                        elapsedOutput = chalk.red(elapsed / 1000 + 's');
                    }
    
                    process.stdout.write(` ${resultMark} in ${elapsedOutput}\n`);
                    resolve(answer === output);
                });
            
                startTime = Date.now();
                fs.createReadStream(path.join(dir, 'input.txt')).pipe(child.stdin);
            });
        });
    });
}