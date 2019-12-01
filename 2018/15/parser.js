module.exports = function(data) {
    let lines = data.split('\n');
    let grid = [];

    for(let x = 0; x < lines[0].length; x++) {
        grid.push([]);
    }

    let combatants = [];

    let y = 0;
    for(let line of lines) {

        for(let x = 0; x < line.length; x++) {
            grid[x][y] = (line[x] === '#');

            if(line[x] === 'E') {
                combatants.push({ type: 'E', x, y, hp: 200});
            }
            else if(line[x] === 'G') {
                combatants.push({ type: 'G', x, y, hp: 200});
            }
        }

        y++
    }

    return {
        combatants,
        grid,
    };
}