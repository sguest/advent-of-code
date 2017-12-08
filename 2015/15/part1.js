let lib = require('../../lib');

let year = 2015;
let day = 15;

lib.getInput(year, day).then((data) => {
    let ingredients = [];
    for(let line of data.split('\n')) {
        let ingredient = [];
        let components = line.split(',');
        for(let component of components) {
            let parts = component.split(' ');
            let value = parseInt(parts[parts.length - 1], 10);
            ingredient.push(value);
        }
        ingredient.pop();
        ingredients.push(ingredient);
    }

    let maxScore = 0;

    for(let amount1 = 1; amount1 <= 100; amount1++) {
        for(let amount2 = 1; amount2 <= 100 - amount1; amount2++) {
            for(let amount3 = 1; amount3 <= 100 - amount1 - amount2; amount3++) {
                for(let amount4 = 1; amount4 <= 100 - amount1 - amount2 - amount3; amount4++) {
                    let propertyScores = [];

                    for(let propertyIndex = 0; propertyIndex < 4; propertyIndex++) {
                        let propertyScore = amount1 * ingredients[0][propertyIndex] + amount2 * ingredients[1][propertyIndex] + amount3 * ingredients[2][propertyIndex] + amount4 * ingredients[3][propertyIndex];
                        propertyScores.push(propertyScore < 0 ? 0 : propertyScore);
                    }

                    let score = 1;
                    for(let propertyScore of propertyScores) {
                        score *= propertyScore;
                    }

                    maxScore = Math.max(score, maxScore);
                }
            }
        }
    }

    console.log(maxScore);
});