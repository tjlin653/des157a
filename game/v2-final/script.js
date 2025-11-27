(function(){
    'use strict';
    console.log('reading js');

    const gameData = {
        cards: ['gorgon-eyes.jpg', 'bronze.jpg', 'silver.jpg', 'gold.jpg', 'emerald.jpg', 'diamond.jpg', 'treasure.jpg'],
        powers: [],
        roll: [],
        results: {
            'gorgon-eyes': 0,
            'bronze': 1,
            'silver': 2,
            'silver': 3,
            'silver': 4,
            'silver': 5,
            'silver': 6,
        },
        score: [0],
        roll1: 0,
        roll2: 0,
        roll3: 0,
        roll4: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 49,
        turnEnd: 9
    };

    const instructionsBtn = document.querySelector('#instructions-label');
    const instructionsPage = document.querySelector('#instructions-page');
    const closeInstructions = document.querySelector('#close-instructions');

    const startgameBtn = document.querySelector('#startgame');
    const screenBG = document.querySelector('body');
    const homeScreen = document.querySelector('#homeScreen');
    const gameScreen = document.querySelector('#gameScreen');

    instructionsBtn.addEventListener('click', function () {
        instructionsPage.classList.replace('hide', 'show');
    });

    if (closeInstructions) {
        closeInstructions.addEventListener('click', function () {
            instructionsPage.classList.replace('show', 'hide');
        });
    }

    startgameBtn.addEventListener('click', function(){
        screenBG.style.backgroundImage = "url('images/table.svg')"
        screenBG.style.backgroundSize = "cover";
        screenBG.style.backgroundPosition = "center bottom";
        screenBG.style.backgroundColor = 'transparent';
        homeScreen.classList.replace('show', 'hide');
        gameScreen.classList.replace('hide', 'show');
    });

    document.querySelector('#quit').addEventListener('click', function(){
        location.reload();
    });

    document.querySelector('#help').addEventListener('click', function(){
        instructionsPage.classList.replace('hide', 'show');
    });
})();