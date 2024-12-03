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

    let lastCollision = 0;

    while(lastCollision < 100) {
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
        let index = 0;
        while(index < particles.length)
        {
            let particle = particles[index];
            let hash = particle.position.x + ',' + particle.position.y + ',' + particle.position.z;
            if(newPositions[hash] > 1) {
                particles.splice(index, 1);
                lastCollision = 0;
            }
            else {
                index++;
            }
        }
        lastCollision ++;
    }

    console.log(particles.length);
}).catch((err) => {
    throw err;
});