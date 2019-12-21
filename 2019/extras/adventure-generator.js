let fs = require('fs');
let path = require('path');

let jsonData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'adventure.json'), 'utf-8'));

let stageContent = '';
let strings = {};
let variables = [];

function getActionContent(action) {
    let content = '';

    if(action.variables) {
        for(let variable in action.variables) {
            if(variables.indexOf(variable) === -1) {
                variables.push(variable);
            }
            content += `1101,${action.variables[variable]},0,&var-${variable}\n`;
        }
    }
    content += `1105,1,&stage-${action.stage}\n`;

    return content;
}

for(let stageName in jsonData.stages) {
    let stage = jsonData.stages[stageName];

    stageContent += `*stage-${stageName};`;

    let intro;
    if(typeof stage.intro === 'string') {
        intro = [{text: stage.intro}]
    }
    else {
        intro = stage.intro;
    }

    for(let index = 0; index < intro.length; index++) {
        let introItem = intro[index];
        let introPointer = `stage-${stageName}-intro-${index}`;
        let nextPointer = `stage-${stageName}-intro-${index + 1}`;
        if(index === intro.length - 1) {
            nextPointer = `stage-${stageName}-actions`;
        }

        if(index > 0) {
            stageContent += `*${introPointer};`;
        }

        if(introItem.variables) {
            for(let variable in introItem.variables) {
                stageContent += `108,${introItem.variables[variable]},&var-${variable},&boolpointer\n` +
                    `1006,&boolpointer,&${nextPointer}\n`;
            }
        }

        strings[`str-${stageName}-intro-${index}`] = introItem.text + '\\n';
        stageContent += `1101,&str-${stageName}-intro-${index},0,&writepointer\n` +
            `1101,&${nextPointer},0,&returnpointer\n` +
            `1105,1,&stringwriter\n`
    }

    stageContent += `*stage-${stageName}-actions;`

    if(stage.auto) {
        stageContent += getActionContent(stage.auto);
    }
    else {
        stageContent += `1101,&6,0,&returnpointer\n` +
            `1105,1,&input\n`;

        for(let index = 0; index < stage.options.length; index++) {
            let option = stage.options[index];
            let optionText = option.text;
            let stringPointer = `str-${stageName}-option-${index}`;
            strings[stringPointer] = optionText;
            let optionPointer = `stage-${stageName}-option-${index}`;
            let nextPointer = `stage-${stageName}-option-${index + 1}`;
            if(index === stage.options.length - 1) {
                nextPointer = `stage-${stageName}-unknown`;
            }
            stageContent += `*${optionPointer};`

            if(option.variables) {
                for(let variable in option.variables) {
                    stageContent += `108,${option.variables[variable]},&var-${variable},&boolpointer\n` +
                        `1006,&boolpointer,&${nextPointer}\n`;
                }
            }
            stageContent += `1101,&inputbase,0,&comparetarget1\n` +
                `1101,&${stringPointer},0,&comparetarget2\n` +
                `1101,&6,0,&returnpointer\n` +
                `1105,1,&stringcomparer\n` +
                `1006,&compareoutput,&${nextPointer}\n` +
                getActionContent(option.actions);
        }

        stageContent += `*stage-${stageName}-unknown;1101,&str-unknown-option,0,&writepointer\n` +
            `1101,&stage-${stageName},0,&returnpointer\n` +
            `1105,1,&stringwriter\n`
    }

    stageContent += '\n';
}

let stringContent = '';

for(let stringName in strings) {
    stringContent += `*${stringName};"${strings[stringName].replace(/,/g, '\\+')}",-1\n`;
}

let variableContent = '';

for(let variable of variables) {
    variableContent += `*var-${variable}\n`;
}

let template = fs.readFileSync(path.resolve(__dirname, 'adventure.template'), 'utf-8');

template = template.replace('<stages>', stageContent).replace('<strings>', stringContent).replace('<vars>', variableContent);

fs.writeFileSync(path.resolve(__dirname, 'adventure.icpp'), template);