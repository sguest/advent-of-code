let lib = require('../../lib');

let year = 2020;
let day = 21;

lib.getInput(year, day).then((data) => {
    let lines = data.split('\n');
    let foods = [];
    for(let line of lines) {
        let ingredients = [];
        let allergens = [];
        let mode = 0;
        let parts = line.split(' ');
        for(let part of parts) {
            if(part === '(contains') {
                mode = 1;
            }
            else if(mode === 0) {
                ingredients.push(part);
            }
            else {
                allergens.push(part.slice(0, -1));
            }
        }
        foods.push({ingredients, allergens});
    }

    let options = new Map();

    for(let food of foods) {
        for(let allergen of food.allergens) {
            if(options.has(allergen)) {
                let existing = options.get(allergen);
                let newFood = [];
                for(let ingredient of existing) {
                    if(food.ingredients.indexOf(ingredient) !== -1) {
                        newFood.push(ingredient);
                    }
                }
                options.set(allergen, newFood);
            }
            else {
                options.set(allergen, food.ingredients.slice(0));
            }
        }
    }

    let allOptions = [];
    options.forEach(options => {
        for(let option of options) {
            if(allOptions.indexOf(option) === -1) {
                allOptions.push(option);
            }
        }
    });

    let safeIngredients = [];
    for(let food of foods) {
        for(let ingredient of food.ingredients) {
            if(allOptions.indexOf(ingredient) === -1) {
                safeIngredients.push(ingredient);
            }
        }
    }

    console.log(safeIngredients.length);
}).catch((err) => {
    console.log(err, err.stack);
});