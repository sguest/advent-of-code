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
    let filterApplied = false;

    for(let index = 0; index < args.length; index+= 2) {
        if(args[index] === '-?') {
            console.log('Possible parameters:');
            console.log('-y');
            console.log('\tFilter by year');
            console.log('\t-y 2018 runs 2018 only');
            console.log('\t-y 2015-2017 runs 2015 to 2017 inclusive');
            console.log('-d');
            console.log('\tFilter by day');
            console.log('\t-d 20 runs day 20 only');
            console.log('\t-d 10-15 runs days 10 to 15 inclusive');
            console.log('-t');
            console.log('\tTimeout');
            console.log('\t-t 20 stops all tests after 20 seconds');
            return;
        }

        if(args[index] === '-y') {
            filterApplied = true;
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
            filterApplied = true;
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

    if(!filterApplied) {
        console.log(chalk.yellow('Executing all tests. Run with -? argument for more options.'));
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

            process.stdout.write(`Year ${chalk.blue(year)} day ${chalk.blue(dayString)} part ${chalk.blue(part)}`);

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
                        else if(elapsed < 5000) {
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