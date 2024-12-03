(function() {
    let goButton = document.querySelector('#go');
    let validButton = document.querySelector('#valid');
    let invalidButton = document.querySelector('#invalid');
    let mode1 = document.querySelector('#mode1');
    let mode2 = document.querySelector('#mode2');
    let startTime = 0;
    let running = false;
    let score = 0;
    let shouldBeValid = false;
    let letters = 'abcdefghijklmnopqrstuvwxyz';
    let targetScore = 15;
    let password = '';

    function startGame() {
        goButton.classList.add('d-none');
        document.querySelector('#win-area').classList.add('d-none');
        document.querySelector('#lose-area').classList.add('d-none');
        document.querySelector('#game-area').classList.remove('d-none');
        mode1.disabled = true;
        mode2.disabled = true;

        startTime = new Date().getTime();
        running = true;
        window.requestAnimationFrame(showTime);
        score = 0;
        showScore();
        nextPassword();
    }

    function formatTime() {
        let elapsed = new Date().getTime() - startTime;
        let fractions = Math.floor((elapsed % 1000)/10);
        if(fractions < 10) {
            fractions = '0' + fractions;
        }
        return `${Math.floor(elapsed/1000)}.${fractions}`;
    }

    function showTime() {
        if(running) {
            document.querySelector('#time-display').innerHTML = formatTime();
            window.requestAnimationFrame(showTime);
        }
    }

    function nextPassword() {
        shouldBeValid = (Math.random() < 0.5);
        let length = randomInt(7, 15);
        let policyLetter = randomLetter();
        let policyMin = randomInt(1, length - 3);
        let policyMax = randomInt(policyMin + 1, length - 1);
        password = '';

        if(mode1.checked) {
            let targetNum;
            if(shouldBeValid) {
                targetNum = randomInt(policyMin, policyMax);
            }
            else {
                if(policyMin > 1 && Math.random() < 0.5) {
                    targetNum = randomInt(1, policyMin - 1);
                }
                else {
                    targetNum = randomInt(policyMax + 1, length);
                }
            }
            for(let i = 0; i < targetNum; i++) {
                password += policyLetter;
            }
            for(let i = 0; i < length - targetNum; i++) {
                password += randomLetter(policyLetter);
            }
            password = shuffle(password);
        }
        else {
            let lowValue = (Math.random() < 0.5);
            for(let i = 1; i <= length; i++) {
                if(i === policyMin) {
                    if(lowValue) {
                        password += policyLetter;
                    }
                    else {
                        password += randomLetter(policyLetter);
                    }
                }
                else if(i === policyMax) {
                    if((shouldBeValid && !lowValue) || (!shouldBeValid && lowValue)) {
                        password += policyLetter;
                    }
                    else {
                        password += randomLetter(policyLetter);
                    }
                }
                else {
                    password += randomLetter();
                }
            }

            if(shouldBeValid) {
                if(Math.random() < 0.5) {
                    password[policyMin + 1] = policyLetter;
                    password[policyMax + 1] = randomLetter(policyLetter);
                }
                else {
                    password[policyMax + 1] = policyLetter;
                    password[policyMin + 1] = randomLetter(policyLetter);
                }
            }
            else {
                if(Math.random() < 0.1) {
                    password[policyMin + 1] = policyLetter;
                    password[policyMax + 1] = policyLetter;
                }
                else {
                    password[policyMin + 1] = randomLetter(policyLetter);
                    password[policyMax + 1] = randomLetter(policyLetter);
                }
            }
        }

        password = `${policyMin}-${policyMax} ${policyLetter}: ${password}`;
        document.querySelector('#password-display').innerHTML = password;
    }

    function showScore() {
        document.querySelector('#score-display').innerHTML = `${score} correct out of ${targetScore}`;
    }

    function submitAnswer(valid) {
        if(valid === shouldBeValid) {
            score++;
            if(score >= targetScore) {
                showWin();
            }
            else {
                showScore();
                nextPassword();
            }
        }
        else {
            showLose();
        }
    }

    function showWin() {
        document.querySelector('#win-area').classList.remove('d-none');
        document.querySelector('#win-time-display').innerHTML = formatTime();
        resetGame();
    }

    function showLose() {
        document.querySelector('#lose-area').classList.remove('d-none');
        document.querySelector('#lose-password').innerHTML = password;
        document.querySelector('#lose-result').innerHTML = shouldBeValid ? 'Valid' : 'Invalid';
        resetGame();
    }

    function resetGame() {
        goButton.innerHTML = 'Play again';
        goButton.classList.remove('d-none');
        document.querySelector('#game-area').classList.add('d-none');
        mode1.disabled = false;
        mode2.disabled = false;
        running = false;
    }

    function randomLetter(exclude) {
        let letter = letters[randomInt(0, 25)];
        while(letter === exclude) {
            letter = letters[randomInt(0, 25)];
        }
        return letter;
    }

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function shuffle(str) {
        let arr = str.split('');
        var currentIndex = arr.length;
        let temporaryValue;
        let randomIndex;
        
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = arr[currentIndex];
            arr[currentIndex] = arr[randomIndex];
            arr[randomIndex] = temporaryValue;
        }

        return arr.join('');
    }

    goButton.addEventListener('click', startGame);
    validButton.addEventListener('click', () => submitAnswer(true));
    invalidButton.addEventListener('click', () => submitAnswer(false));

    document.addEventListener('keyup', e => {
        if(running) {
            if(e.key.toLowerCase() === 'v') {
                submitAnswer(true);
            }
            if(e.key.toLowerCase() === 'n') {
                submitAnswer(false);
            }
        }
    })
})();