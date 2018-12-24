const fs = require('fs');
const execFile = require('child_process').execFile;
const path = require('path');
const chalk = require('chalk');

runTests();

async function runTests() {
    let args = process.argv.slice(2);
    let minYear = 2015;
    let maxYear = new Date().getFullYear();
    let minDay = 1;
    let maxDay = 25;
    let timeout;

    for(let index = 0; index < args.length; index+= 2) {
        if(args[index] === '-y') {
            let parts = args[index + 1].split('-');
            minYear = +parts[0];
            if(parts.length === 2) {
                maxYear = +parts[1];
            }
            else {
                maxYear = minYear;
            }
        }
        else if(args[index] === '-d') {
            let parts = args[index + 1].split('-');
            minDay = +parts[0];
            if(parts.length === 2) {
                maxDay = +parts[1];
            }
            else {
                maxDay = minDay;
            }
        }
        else if(args[index] === '-t') {
            timeout = +args[index + 1];
        }
    }

    for(let year = minYear; year <= maxYear; year++) {
        for(let day = minDay; day <= maxDay; day++) {
            for(let part = 1; part <= 2; part++) {
                await testAnswer(year, day, part, timeout);
            }
        }
    }
}

function testAnswer(year, day, part, timeout) {
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

                let timeoutHandle;
                let killed = false;

                child.on('close', () => {
                    if(!killed) {
                        let elapsed = Date.now() - startTime;
                        clearTimeout(timeoutHandle);
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
                    }
                });

                if(timeout) {
                    timeoutHandle = setTimeout(() => {
                        killed = true;
                        child.kill('SIGINT');
                        process.stdout.write(chalk.red(' ⏱ Timed out\n'));
                        resolve(false);
                    }, timeout * 1000);
                }

                startTime = Date.now();
                fs.createReadStream(path.join(dir, 'input.txt')).pipe(child.stdin);
            });
        });
    });
}