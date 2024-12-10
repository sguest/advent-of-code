let lib = require('../../lib');

let year = 2024;
let day = 9;

lib.getInput(year, day).then((data) => {
    let fileBlocks = [];
    let emptyBlocks = [];
    let isFile = true;
    let index = 0;
    let fileId = 0;
    for(let char of data) {
        let num = +char;
        if(isFile)
        {
            fileBlocks.push({ start: index, fileId, length: num });
            fileId++;
        }
        else 
        {
            emptyBlocks.push({ start: index, length: num });
        }
        index += num;
        isFile = !isFile;
    }

    let emptyIndex = 0;
    let movedFiles = [];
    let currentFile = fileBlocks.pop();
    let currentEmpty = emptyBlocks[emptyIndex];

    while(emptyIndex < emptyBlocks.length && currentEmpty.start < currentFile.start)
    {
        if(currentEmpty.length > currentFile.length) {
            movedFiles.push({ start: currentEmpty.start, fileId: currentFile.fileId, length: currentFile.length });
            currentEmpty.start += currentFile.length;
            currentEmpty.length -= currentFile.length;
            currentFile = fileBlocks.pop();
        }
        else {
            movedFiles.push({ start: currentEmpty.start, fileId: currentFile.fileId, length: currentEmpty.length });
            currentFile.length -= currentEmpty.length;
            emptyIndex++;
            currentEmpty = emptyBlocks[emptyIndex];
        }
    }
    movedFiles.push(currentFile);

    let allFiles = [...fileBlocks, ...movedFiles].filter(f => f.length > 0);
    allFiles.sort((a, b) => a.start - b.start);

    let checksum = 0;
    for(let file of allFiles)
    {
        for(let i = 0; i < file.length; i++)
        {
            checksum += file.fileId * (i + file.start);
        }
    }

    console.log(checksum);
}).catch((err) => {
    console.log(err, err.stack);
});