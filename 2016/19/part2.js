const lib = require('../../lib');

lib.getInput(2016, 19).then((data) => {
    let input = +data;

    let firstElf;
    let targetElf;
    let previousElf;

    for(let index = 0; index < input; index++) {
        let elf = {index: index + 1};
        if(previousElf) {
            previousElf.next = elf;
            elf.prev = previousElf;
        }
        else {
            firstElf = elf;
        }
        if(index === Math.floor(input / 2)) {
            targetElf = elf;
        }
        previousElf = elf;
    }
    previousElf.next = firstElf;
    firstElf.prev = previousElf;

    let remainingElves = input;
    let currentElf = firstElf;

    while(remainingElves > 1) {
        targetElf.prev.next = targetElf.next;
        targetElf.next.prev = targetElf.prev;
        targetElf = targetElf.next;

        currentElf = currentElf.next;
        remainingElves--;

        if(remainingElves % 2 === 0) {
            targetElf = targetElf.next;
        }
    }

    console.log(currentElf.index);
});