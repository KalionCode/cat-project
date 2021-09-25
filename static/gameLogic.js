const $ = document;

const INSTRUCTIONS = [
    `
    According to the latest scientific research, by next year, the sea level will rise nearly 3 feet and
    tides will swallow the households near the coast. In this game, you are the mayor of this town and
    your job is to evacuate the inhabitants near the seashore!
    <br><br>
    You will have $5000M at your disposal as the Sea Level Rise Evacuation Fund provided by the central
    government. Be aware, after you expend all of the fund, you can only then earn money from the income
    of your industrial factories or by raising the tax which would significantly decreased your
    likability amoung the civilians.
    <br><br>
    Your ultimate goal is to evacuate all the civilians in the town before the sea floods town. You will
    only have a limited amount of time as the sea will rise fast. You can, however, slow down the
    process of sea level rise by taking proper measures, this includes reducing the amount of greenhouse
    gas emissions, building a sea wall, and much more!
    `,
    `
    This game is turn-based, meaning that you will be taking action on each of you turn. Since the
    objective of this game is to evacuate the town, your actions should ultimately lead to that result.
    Here are some things you can do each turn:
    <br><br>
    • Build or reinforce a sea wall
    <br>
    • Widen the beach by buying more sand
    <br>
    • Reduce the greenhouse gas emissions of the local factories(this would also reduce your income each turn)
    `,

]

let state = {
    seaLevelHeight: 100,
    fundAmount: 5000,
    greenhouseGasEmission: 1000,
    instruction: {
        id: 0,
    },
    turn: 0,
}

function introductionCode() {//introduction-level code
    const instructionElement = $.querySelector('#specific-instructions');
    const nextButtonElement = $.querySelector('#next-button');
    const previousButtonElement = $.querySelector('#previous-button');

    function customLogicForInstructionID() {
        let id = state.instruction.id;

        if (id + 1 > INSTRUCTIONS.length) {
            $.querySelector('#instructions').style.display = 'none';
        }

        switch (id) {
            case 1:
                nextButtonElement.value = 'Start'
                break;
            case 2:
                gameCode()
                break
            default:
                nextButtonElement.value = 'Next'
                break;
        }
    }

    nextButtonElement.addEventListener('click', function (e) {
        state.instruction.id = state.instruction.id + 1;
        let id = state.instruction.id;
        instructionElement.innerHTML = INSTRUCTIONS[id];
        if (id > 0) {
            previousButtonElement.style.display = "initial";
        }
        customLogicForInstructionID()
    })

    previousButtonElement.addEventListener('click', function (e) {
        state.instruction.id = state.instruction.id - 1;
        let id = state.instruction.id;
        console.log(id)
        instructionElement.innerHTML = INSTRUCTIONS[id];
        if (id == 0) {
            previousButtonElement.style.display = "none";
        }
        customLogicForInstructionID()
    })

    instructionElement.innerHTML = INSTRUCTIONS[0];
}

function gameCode() {

    const statusElement = $.querySelector('#status');
    const controlElement = $.querySelector('#controls');

    statusElement.style.display = 'initial';
    controlElement.style.display = 'initial';

}

introductionCode()
