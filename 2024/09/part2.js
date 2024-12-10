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

    let movedFiles = [];

    while(fileBlocks.length)
    {
        let currentFile = fileBlocks.pop();
        for(let currentEmpty of emptyBlocks)
        {
            if(currentEmpty.length >= currentFile.length && currentEmpty.start < currentFile.start)
            {
                currentFile.start = currentEmpty.start;
                currentEmpty.start += currentFile.length;
                currentEmpty.length -= currentFile.length;
            }
        }
        movedFiles.push(currentFile);
    }

    let checksum = 0;
    for(let file of movedFiles)
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