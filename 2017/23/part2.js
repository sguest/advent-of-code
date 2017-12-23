//This is the input optimized and converted to JS
let b = 105700;
let c = 122700;
let h = 0;

while(true) {
    let f = 1;
    for(let d = 2; d < b; d++) {
        if(b % d === 0) {
            f = 0;
            break;
        }
    }
    if(f === 0) {
        h++;
    }
    if(b === c) {
        console.log(h);
        break;
    }
    b += 17;
}
