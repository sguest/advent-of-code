(function() {
    document.querySelector('#go').addEventListener('click', () => {
        document.querySelector('#go').style.display = 'none';

        let input = document.querySelector('#input').value;
        let context = document.querySelector('#main').getContext('2d');

        let lines = input.trim().split('\n');

        let seats = [];
        let seatIds = [];
        let minRow = Infinity;
        let maxRow = 0;

        for(let line of lines) {
            let min = 0;
            let max = 127;

            for(let i = 0; i < 7; i++) {
                let range = max - min + 1;
                if(line[i] === 'F') {
                    max -= range / 2;
                }
                else {
                    min += range / 2;
                }
            }

            let row = min;

            min = 0;
            max = 7;

            for(let i = 7; i < 10; i++) {
                let range = max - min + 1;

                if(line[i] === 'L') {
                    max -= range / 2;
                }
                else {
                    min += range / 2;
                }
            }

            let column = min;
            let id = row * 8 + column;
            seats.push({row, column});
            seatIds[id] = true;
            minRow = Math.min(minRow, row);
            maxRow = Math.max(maxRow, row);
        }

        let current = minRow * 8 + 8;

        let mySeat = null;
        while(!mySeat) {
            if(!seatIds[current]) {
                mySeat = {row: Math.floor(current / 8), column: current % 8};
            }
            else {
                current++;
            }
        }

        let left = 50;
        let top = 50;
        let width = 10;
        let height = 10;
        let spacing = 2;
        let aisle = 5;
        let columnOffsets = [];
        for(let col = 0; col < 8; col++) {
            offset = (width + spacing) * col;
            if(col >= 2) {
                offset += aisle;
            }
            if(col >= 6) {
                offset += aisle;
            }
            columnOffsets.push(offset);
        }

        function getCoords(row, col) {
            let y = left + columnOffsets[col];
            let x = top + (row - minRow) * (height + spacing);
            return { x, y };
        }

        context.lineWidth = 1;
        context.strokeStyle = 'black';

        for(let row = minRow; row <= maxRow; row++) {
            for(let col = 0; col < 8; col++) {
                let coords = getCoords(row, col);

                context.strokeRect(coords.x, coords.y, width, height);
            }
        }

        let seatIndex = 0;
        context.fillStyle = 'green';
        let interval = setInterval(() => {
            let coords;
            if(seatIndex >= seats.length) {
                clearInterval(interval);
                coords = getCoords(mySeat.row, mySeat.column);
                context.fillStyle = 'red';
            }
            else {
                coords = getCoords(seats[seatIndex].row, seats[seatIndex].column);
                seatIndex++;
            }
            context.fillRect(coords.x + 1, coords.y + 1, width - 2, height - 2);
        }, 10);
    });
}());