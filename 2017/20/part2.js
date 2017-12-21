let lib = require('../../lib');

let year = 2017;
let day = 20;

lib.getInput(year, day).then((data) => {
    let particles = [];
    for(let line of data.split('\n')) {
        let particle = {};
        let parts = line.split(', ');
        let positionParts = parts[0].substring(3).split(',').map(x => parseInt(x, 10));
        particle.position = {x: positionParts[0], y: positionParts[1], z: positionParts[2]};
        let velocityParts = parts[1].substring(3).split(',').map(x => parseInt(x, 10));
        particle.velocity = {x: velocityParts[0], y: velocityParts[1], z: velocityParts[2]};
        let accelerationParts = parts[2].substring(3).split(',').map(x => parseInt(x, 10));
        particle.acceleration = {x: accelerationParts[0], y: accelerationParts[1], z: accelerationParts[2]};
        particles.push(particle);
    }      
    
    for(let index = 0; index < 100000; index++) {
        let newPositions = {};

        for(let particle of particles) {
            particle.velocity.x += particle.acceleration.x;
            particle.velocity.y += particle.acceleration.y;
            particle.velocity.z += particle.acceleration.z;
            particle.position.x += particle.velocity.x;
            particle.position.y += particle.velocity.y;
            particle.position.z += particle.velocity.z;
            let hash = particle.position.x + ',' + particle.position.y + ',' + particle.position.z;
            newPositions[hash] = (newPositions[hash] || 0) + 1;
        }
        let index2 = 0;
        while(index2 < particles.length)
        {
            let particle = particles[index2];
            let hash = particle.position.x + ',' + particle.position.y + ',' + particle.position.z;
            if(newPositions[hash] > 1) {
                particles.splice(index2, 1);
            }
            else {
                index2++;
            }
        }

        if(index % 1000 === 0){
            console.log(index);
        }
    }

    console.log(particles.length);
}).catch((err) => {
    throw err;
});