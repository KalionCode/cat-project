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

const ADVISES = `
Your consultant says: <b>"Adding sand will make beach-goers happy, but beware: The sand washes away over time. Seawalls can
protect homes but they aren't good for beaches if you can afford it, consider buying out beachfront homeowners to get
them out of harm's way.<b>"
`

let COSTS = {
    buildWall: 1000,
    widenBeach: 2000,
    hireConsultant: 1000,
    evacuateArea: 40000,
    reduceEmissions: 0,
}

const INITIAL_MONEY = 10000 + COSTS.hireConsultant;
const INITIAL_INCOME = 3700;
const INITIAL_EMISSION = 2000
const INITIAL_SEALEVEL = 50

const INCOME_REDUCTION = 250;
const GREENHOUSE_REDUCTION = 100;

const SEAWALL_EFFECTIVENESS = 2;
let state = {
    seaLevelHeight: INITIAL_SEALEVEL,
    moneyAmount: INITIAL_MONEY,
    incomeAmount: INITIAL_INCOME,
    greenhouseGasEmission: INITIAL_EMISSION,
    turn: 0,
    wallStrength: 0,
    flooded: false,
    beachLength: 0,
    consulted: false,
    instruction: {
        id: 0,
    },
}

function customLogicForInstructionID() {
    const nextBtnElement = $.querySelector('#next-btn');
    let id = state.instruction.id;
    if (id + 1 > INSTRUCTIONS.length) {
        $.querySelector('#instructions').style.display = 'none';
    }

    switch (id) {
        case 1:
            nextBtnElement.innerHTML = 'Start'
            break;
        case 2:
            gameCode()
            break
        default:
            nextBtnElement.innerHTML = 'Next'
            break;
    }
}

function introductionCode() {//introduction-level code
    const instructionElement = $.querySelector('#specific-instructions');
    const nextBtnElement = $.querySelector('#next-btn');
    const previousBtnElement = $.querySelector('#previous-btn');

    nextBtnElement.addEventListener('click', function (e) {
        state.instruction.id = state.instruction.id + 1;
        let id = state.instruction.id;
        instructionElement.innerHTML = INSTRUCTIONS[id];
        if (id > 0) {
            previousBtnElement.style.display = "initial";
        }
        customLogicForInstructionID()
    })

    previousBtnElement.addEventListener('click', function (e) {
        state.instruction.id = state.instruction.id - 1;
        let id = state.instruction.id;
        console.log(id)
        instructionElement.innerHTML = INSTRUCTIONS[id];
        if (id == 0) {
            previousBtnElement.style.display = "none";
        }
        customLogicForInstructionID()
    })

    instructionElement.innerHTML = INSTRUCTIONS[0];
}

function updateStatus() {
    const turnAmountElement = $.querySelector('#turn-amount')
    const moneyAmountElement = $.querySelector('#money-amount');
    const incomeAmountElement = $.querySelector('#income-amount')
    const greenhouseGasAmountElement = $.querySelector('#greenhouse-gas-amount')

    turnAmountElement.innerHTML = `${state.turn}`
    moneyAmountElement.innerHTML = `$${state.moneyAmount}`
    incomeAmountElement.innerHTML = `$${state.incomeAmount}`
    greenhouseGasAmountElement.innerHTML = state.greenhouseGasEmission
}

function updateFinalResult() {
    const turnResultElement = $.querySelector('#turn-result')
    const moneyResultElement = $.querySelector('#money-result');
    const incomeResultElement = $.querySelector('#income-result')
    const greenhouseGasResultElement = $.querySelector('#greenhouse-gas-result')

    turnResultElement.innerHTML = `${state.turn}`
    moneyResultElement.innerHTML = `$${state.moneyAmount}`
    incomeResultElement.innerHTML = `$${state.incomeAmount}`
    greenhouseGasResultElement.innerHTML = state.greenhouseGasEmission
}

function showOverPrompt(text = "Game Over") {
    const gameEndOverlayElement = $.querySelector('#overlay');
    $.querySelector('#game-over-msg').innerHTML = text
    gameEndOverlayElement.style.display = 'flex';
}

function setBtnDisability() {
    const buildWallBtnElement = $.querySelector("#build-wall-btn");
    const widenBeachBtnElement = $.querySelector("#widen-beach-btn");
    const hireConsultantBtnElement = $.querySelector("#hire-consultant-btn");
    const reduceEmissionsBtnElement = $.querySelector("#reduce-emissions-btn");
    const evacuateAreaBtnElement = $.querySelector('#evacuate-area-btn');

    buildWallBtnElement.disabled = (state.moneyAmount >= COSTS.buildWall) ? false : true
    widenBeachBtnElement.disabled = (state.moneyAmount >= COSTS.widenBeach) ? false : true
    hireConsultantBtnElement.disabled = (state.moneyAmount >= COSTS.hireConsultant) ? false : true
    evacuateAreaBtnElement.disabled = (state.moneyAmount >= COSTS.evacuateArea) ? false : true
    reduceEmissionsBtnElement.disabled = false;
}

function addEventListenerToBtn() {

    function nextTurnUpdate(e) {

        function didGameLose() {
            //flooded the town
            if (state.seaLevelHeight > 200) {
                //seawall blocking water
                state.wallStrength = state.wallStrength - SEAWALL_EFFECTIVENESS;
                if (state.wallStrength < 0) {
                    state.flooded = true;
                    return true
                } else {
                    return false
                }
                // // no money
                // } else if (state.moneyAmount < 0) {
                //     return true
            } else {
                return false
            }
        }

        //raise the sea level
        state.turn = state.turn + 1;
        state.seaLevelHeight = state.seaLevelHeight + Math.floor(state.greenhouseGasEmission / 100)

        //wash away the sand
        state.beachLength = (state.beachLength-1>0) ? state.beachLength - 1: state.beachLength;  

        //give income 
        state.moneyAmount = state.moneyAmount + state.incomeAmount;

        if (!didGameLose()) {
            updateStatus()
            //reset button disability
            setBtnDisability()

        } else {
            showOverPrompt()
            setBtnDisability()
            updateStatus()
            updateFinalResult()

        }
    }

    function gameWonUpdate(e) {
        state.moneyAmount = state.moneyAmount - COSTS.evacuateArea;
        updateStatus()
        updateFinalResult()
        showOverPrompt("You Won!")
    }

    const buildWallBtnElement = $.querySelector("#build-wall-btn");
    const widenBeachBtnElement = $.querySelector("#widen-beach-btn");
    const hireConsultantBtnElement = $.querySelector("#hire-consultant-btn");
    const reduceEmissionsBtnElement = $.querySelector("#reduce-emissions-btn");
    const evacuateAreaBtnElement = $.querySelector('#evacuate-area-btn');
    const nextTurnBtnElement = $.querySelector('#next-turn-btn');

    buildWallBtnElement.addEventListener('click', function () {
        state.moneyAmount = state.moneyAmount - COSTS.buildWall
        state.wallStrength = state.wallStrength + 1;
        setBtnDisability()
        updateStatus()
        buildWallBtnElement.disabled = true;
    })

    widenBeachBtnElement.addEventListener('click', function () {
        state.moneyAmount = state.moneyAmount - COSTS.widenBeach
        state.beachLength = state.beachLength + 1;
        setBtnDisability()
        updateStatus()
        widenBeachBtnElement.disabled = true;
    })

    hireConsultantBtnElement.addEventListener('click', function () {
        if (!state.consulted) {
            //before consultation
            state.moneyAmount = state.moneyAmount - COSTS.hireConsultant
            popupInfo(ADVISES)

            state.consulted = true
            hireConsultantBtnElement.innerHTML = "Show advise";
            $.querySelector('#hire-consultant-cost').innerHTML = ""
            setBtnDisability()
            updateStatus()
        } else {
            popupInfo(ADVISES)
        }
    })

    reduceEmissionsBtnElement.addEventListener('click', function () {
        //do nothing
        state.moneyAmount = state.moneyAmount - COSTS.reduceEmissions;
        //cut income but reduce greenhouse gas emissions which affects sea level rise speed
        state.incomeAmount = state.incomeAmount - INCOME_REDUCTION;
        state.greenhouseGasEmission = state.greenhouseGasEmission - GREENHOUSE_REDUCTION;
        setBtnDisability()
        updateStatus()
        reduceEmissionsBtnElement.disabled = true;
    })

    evacuateAreaBtnElement.addEventListener('click', gameWonUpdate);

    nextTurnBtnElement.addEventListener("click", nextTurnUpdate)
}

function gameCode() {

    //initialize 
    state.turn = 1;

    const statusElement = $.querySelector('#status');
    const controlElement = $.querySelector('#controls');

    statusElement.style.display = 'block';
    controlElement.style.display = 'block';

    const buildWallCostElement = $.querySelector("#build-wall-cost");
    const widenBeachCostElement = $.querySelector("#widen-beach-cost");
    const hireConsultantCostElement = $.querySelector("#hire-consultant-cost");
    const evacuateAreaCostElement = $.querySelector('#evacuate-area-cost')
    const reduceEmissionsCostElement = $.querySelector("#reduce-emissions-cost");

    buildWallCostElement.innerHTML = `$${COSTS.buildWall}`
    widenBeachCostElement.innerHTML = `$${COSTS.widenBeach}`
    hireConsultantCostElement.innerHTML = `$${COSTS.hireConsultant}`
    evacuateAreaCostElement.innerHTML = `$${COSTS.evacuateArea}`

    setBtnDisability()
    updateStatus()

    addEventListenerToBtn()

}

//entry point (function)
introductionCode()