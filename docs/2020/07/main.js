(function() {
    let children = {};
    let parents = {};

    let bases = {
        plum: {h: 300, s: 1, l: 0.5},
        crimson: {h: 348, s: 1, l: 0.5},
        violet: {h: 270, s: 1, l: 0.5},
        tomato: {h: 9, s: 1, l: 0.5},
        salmon: {h: 6, s: 1, l: 0.5},
        lime: {h: 75, s: 1, l: 0.5},
        fuchsia: {h: 300, s: 1, l: 0.5},
        red: {h: 0, s: 1, l: 0.5},
        indigo: {h: 255, s:1 , l: 0.5},
        beige: {h: 60, s: 0.3, l: 0.8},
        maroon: {h: 0, s: 1, l: 0.3},
        cyan: {h: 180, s: 1, l: 0.5},
        brown: {h: 30, s:1, l: 0.25},
        white: {h: 0, s: 1, l: 1},
        green: {h: 120, s: 1, l: 0.5},
        purple: {h: 280, s: 1, l: 0.5},
        magenta: {h: 300, s: 1, l: 0.5},
        teal: {h: 150, s: 1, l: 0.5},
        gold: {h: 51, s: 1, l: 0.5},
        silver: {h: 0, s: 0, l: 0.75},
        orange: {h: 32, s: 1, l: 0.5},
        bronze: {h: 30, s: 0.75, l: 0.8},
        yellow: {h: 60, s: 1, l: 0.5},
        blue: {h: 220, s: 1, l: 0.5},
        olive: {h: 60, s: 1, l: 0.5},
        coral: {h: 16, s: 1, l: 0.5},
        gray: {h: 0, s: 0, l: 0.5},
        aqua: {h: 180, s: 1, l: 0.5},
        turquoise: {h: 174, s: 0.7, l: 0.7},
        lavender: {h: 240, s: 0.2, l: 0.8},
        tan: {h: 35, s: 0.3, l: 0.8},
        chartreuse: {h: 90, s: 1, l: 0.5},
        black: {h: 0, s: 0, l: 0},
    };

    function toPercent(value) {
        return Math.floor(value * 100) + '%';
    }

    function hsl(base) {
        return `hsl(${base.h}, ${toPercent(base.s)}, ${toPercent(base.l)})`;
    }

    let adjectives = {
        shiny: (bag, base) => {
            bag.style.backgroundColor = hsl(base);
            bag.style.boxShadow = `0 0 10px 1px ${hsl(base)}`;
        },
        clear: (bag, base) => {
            bag.style.backgroundColor = 'transparent';
            bag.style.border = `3px solid ${hsl(base)}`;
        },
        dim: (bag, base) => {
            let color = { h: base.h, s: base.s * 0.5, l: base.l};
            bag.style.backgroundColor = hsl(color);
        },
        mirrored: (bag, base) => {
            bag.style.backgroundImage = `linear-gradient(to right, #ccc 0, ${hsl(base)} 100%)`;
        },
        muted: (bag, base) => {
            let color = { h: base.h, s: base.s * 0.5, l: base.l};
            bag.style.backgroundColor = hsl(color);
        },
        posh: (bag, base) => {
            bag.style.backgroundColor = hsl(base);
            bag.style.border = '3px dotted black';
        },
        light: (bag, base) => {
            let color = { h: base.h, s: base.s, l: Math.min(base.l * 1.3, 1)};
            bag.style.backgroundColor = hsl(color);
        },
        plaid: (bag, base) => {
            bag.style.backgroundColor = hsl(base);
            bag.style.backgroundImage = 'linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%)';
            bag.style.backgroundSize = '30px 30px';
            bag.style.backgroundPosition = '0 0, 0 15px, 15px -15px, -15px 0px';
        },
        drab: (bag, base) => {
            let color = { h: base.h, s: base.s * 0.5, l: base.l};
            bag.style.backgroundColor = hsl(color);
        },
        dark: (bag, base) => {
            let color = { h: base.h, s: base.s, l: base.l * 0.5};
            bag.style.backgroundColor = hsl(color);
        },
        striped: (bag, base) => {
            bag.style.backgroundColor = hsl(base);
            bag.style.backgroundImage = 'linear-gradient(to bottom, transparent 0, #888 0, #888 10px, transparent 10px';
            bag.style.backgroundSize = '100% 20px';
        },
        vibrant: (bag, base) => {
            let color = { h: base.h, s: Math.min(1, base.s * 1.5), l: base.l};
            bag.style.backgroundColor = hsl(color);
        },
        pale: (bag, base) => {
            let color = { h: base.h, s: base.s * 0.3, l: Math.min(1, base.l * 1.3)};
            bag.style.backgroundColor = hsl(color);
        },
        dull: (bag, base) => {
            let color = { h: base.h, s: base.s * 0.5, l: base.l};
            bag.style.backgroundColor = hsl(color);
        },
        wavy: (bag, base) => {
            bag.style.backgroundColor = hsl(base);
            bag.style.backgroundImage = 'linear-gradient(45deg, transparent 65%, #808080 65%), linear-gradient(-45deg, transparent 65%, #808080 65%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%)';
            bag.style.backgroundSize = '20px 20px';
            bag.style.backgroundPosition = '0 10px, 0 30px, 40px -30px, -40px -10px';
        },
        dotted: (bag, base) => {
            bag.style.backgroundColor = hsl(base);
            bag.style.backgroundImage = 'radial-gradient(#808080 40%, transparent 40%)';
            bag.style.backgroundPosition = '0 0, 20px 20px';
            bag.style.backgroundSize = '40px 40px';
        },
        faded: (bag, base) => {
            let color = { h: base.h, s: base.s * 0.3, l: base.l};
            bag.style.backgroundColor = hsl(color);
        },
        bright: (bag, base) => {
            let color = { h: base.h, s: base.s, l: Math.min(1, base.l * 1.5)};
            bag.style.backgroundColor = hsl(color);
        },
    };

    function styleBag(bag, name) {
        let parts = name.split(' ');
        let base = bases[parts[1]];
        if(base === undefined) {
            base = bases.gray;
            console.log(`Unrecognized colour ${parts[1]}`);
        }
        if(adjectives[parts[0]]) {
            adjectives[parts[0]](bag, base);
        }
        else {
            bag.style.backgroundColor = hsl(base);
            console.log(`Unrecognized adjective ${parts[0]}`);
        }

        bag.title = name + ' bag';
        bag.dataset.name = name;
    }

    function drawBag(name) {
        let mainBag = document.createElement('div');
        mainBag.classList.add('bag', 'bag-main');
        styleBag(mainBag, name);

        if(children[name]) {
            for(let child of children[name]) {
                for(let i = 0; i < child.count; i++) {
                    let childBag = document.createElement('div');
                    childBag.classList.add('bag', 'bag-child');
                    styleBag(childBag, child.name);
                    mainBag.appendChild(childBag);
                }
            }
        }

        let parentArea = document.querySelector('#parent-area');
        parentArea.innerHTML = '';
        if(parents[name]) {
            for(let parent of parents[name]) {
                let parentBag = document.createElement('div');
                parentBag.classList.add('bag', 'bag-parent');
                styleBag(parentBag, parent);
                parentArea.appendChild(parentBag);
            }
        }

        let bagArea = document.querySelector('#bag-area');
        bagArea.innerHTML = '';
        bagArea.appendChild(mainBag);
    }

    document.addEventListener('click', event => {
        if(event.target.classList.contains('bag-child') || event.target.classList.contains('bag-parent')) {
            drawBag(event.target.dataset.name);
        }
    });

    document.querySelector('#go').addEventListener('click', () => {
        let input = document.querySelector('#input').value;
        let lines = input.trim().split('\n');

        document.querySelector('#input-area').style.display = 'none';

        for(let line of lines) {
            let parent = /(.*) bags contain /.exec(line)[1];
            let rest = line.replace(/.* bags contain /, '');
            let parts = rest.split(',');
            let childItems = [];
            for(let part of parts) {
                if(!/no other bags/.test(part)) {
                    let result = /\s*(\d+)\s*(.*) bag/.exec(part);
                    childItems.push({ name: result[2], count: +result[1]});
                    parents[result[2]] = parents[result[2]] || [];
                    parents[result[2]].push(parent);
                }
            }
            children[parent] = childItems;
        }

        drawBag('shiny gold');
    })
}());