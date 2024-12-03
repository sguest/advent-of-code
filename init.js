const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Year ', (year) => {
    rl.question('Day ', (day) => {
        fs.readFile(path.resolve(__dirname, 'skeleton.js'), 'utf-8', (err, skeleton) => {
            skeleton = skeleton.replace('{{year}}', year).replace('{{day}}', day)

            let yearPath = path.resolve(__dirname, year);

            if(!fs.existsSync(yearPath)) {
                fs.mkdirSync(yearPath);
            }

            day = (day.length < 2 ? '0' : '') + day
            let outputPath = path.resolve(yearPath, day);
            if(!fs.existsSync(outputPath)) {
                fs.mkdirSync(outputPath);
            }

            outputPath = path.resolve(outputPath, 'part1.js');
            fs.writeFile(outputPath, skeleton, (err) => {
                if(err) {
                    console.log(err);
                }
                rl.close();
            });
        });
    })
});