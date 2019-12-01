const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Session cookie ', (cookie) => {
    let outputPath = path.resolve(__dirname, 'auth_cookie.txt');
    fs.writeFileSync(outputPath, cookie, (err) => {
        console.log('Could not write cookie, error ' + err);
    });
    rl.close();
});