(function(){
    'use strict';
    console.log('reading js');

    const gameData = {
        cards: [
            {name: 'gorgon-eyes', file: 'gorgon-eyes.svg'},
            {name: 'bronze', file: 'bronze.svg', gems: 1},
            {name: 'silver', file: 'silver.svg', gems: 2},
            {name: 'gold', file: 'gold.svg', gems: 3},
            {name: 'emerald', file: 'emerald.svg', gems: 4},
            {name: 'diamond', file: 'diamond.svg', gems: 5},
            {name: 'treasure', file: 'treasure.svg', gems: 6},
        ],
        roll1: 0,
        roll2: 0,
        roll3: 0,
        roll4: 0,
        powers: [],
        gems: 0,
        turn: 1,
        maxTurns: 10,
        gemGoal: 50
    };

    const instructionsBtn = document.querySelector('#instructions-label');
    const instructionsPage = document.querySelector('#instructions-page');
    const closeInstructions = document.querySelector('#close-instructions');

    const startgameBtn = document.querySelector('#startgame');
    const screenBG = document.querySelector('body');
    const homeScreen = document.querySelector('#homeScreen');
    const gameScreen = document.querySelector('#gameScreen');

    const musicBtn = document.querySelector('#music');
    const bgmusic = document.querySelector('#bg-music');
    const startAudio = 111;
    const musicIcon = document.querySelector('#music .icons i');

    const fourCards = document.querySelector('#fourCards');
    const winScreen = document.querySelector('#winScreen');
    const score = document.querySelector('#magicGems');

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

        setUpTurn();
    });

    document.querySelector('#quit').addEventListener('click', function(){
        location.reload();
    });

    document.querySelector('#help').addEventListener('click', function(){
        instructionsPage.classList.replace('hide', 'show');
    });

    musicBtn.addEventListener('click', function(){
        if (bgmusic.currentTime === 0){
            bgmusic.currentTime = startAudio;
        }
        if (bgmusic.paused) {
            bgmusic.play();
            musicIcon.className = "fa-solid fa-pause";
        } else {
            bgmusic.pause();
            musicIcon.className = "fa-solid fa-play";
        }
    });

    function setUpTurn(){
        document.querySelector('#deal-cards').addEventListener('click', function(){
            dealCards();
        });
    }

    function dealCards(){
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        gameData.roll3 = Math.floor(Math.random() * 6) + 1;
        gameData.roll4 = Math.floor(Math.random() * 6) + 1;
        fourCards.innerHTML += `<img src="images/${gameData.cards[gameData.roll1-1]}"> <img src="images/${gameData.cards[gameData.roll2-1]}">`;
        gameData.gems = gameData.roll1 + gameData.roll2 + gameData.roll3 + gameData.roll4;
        applyEffects();
    }

    function applyEffects(card){
        checkWinningCondition();
    }

    function checkWinningCondition(){
        if(gameData.score[gameData.index] > gameData.gemGoal){
            winScreen.classList.replace('hide', 'show');
        } else {
            showCurrentScore();
        }
    }

    function showCurrentScore(){
        score.innerHTML = `<p id='magicGems>Magic Gems: ${gameData.score[0]}</p>`;
    }
})();