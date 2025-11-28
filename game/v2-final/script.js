(function(){
    'use strict';
    console.log('reading js');

    const gameData = {
        cards: [
            {name: 'bronze', file: 'bronze.svg', gems: 1},
            {name: 'silver', file: 'silver.svg', gems: 2},
            {name: 'gold', file: 'gold.svg', gems: 3},
            {name: 'emerald', file: 'emerald.svg', gems: 4},
            {name: 'diamond', file: 'diamond.svg', gems: 5},
            {name: 'treasure', file: 'treasure.svg', gems: 6},
            {name: 'gorgon-eyes', file: 'gorgon-eyes.svg', gems: 0, effect: 'gorgon'},
        ],
        power: {
            immuneToGorgon: false
        },
        hand: [],
        gemTurn: 0,
        gemTotal: 0,
        turn: 1,
        maxTurns: 10,
        gemGoal: 49
    };

    const instructionsBtn = document.querySelector('#instructions-label');
    const instructionsPage = document.querySelector('#instructions-page');
    const closeInstructions = document.querySelector('#close-instructions');

    const startgameBtn = document.querySelector('#startgame');
    const screenBG = document.querySelector('body');
    const homeScreen = document.querySelector('#homeScreen');
    const gameScreen = document.querySelector('#gameScreen');

    const musicBtn = document.querySelector('#music button');
    const bgmusic = document.querySelector('#bg-music');
    const startAudio = 111;
    const musicIcon = document.querySelector('#music i');
    const settings = document.querySelector('#settings');
    const menu = document.querySelector('#menuOptions');
    const settingsIcon = document.querySelector('#settings i');

    const fourCards = document.querySelector('#fourCards');
    const winScreen = document.querySelector('#winScreen');
    const currentTurn = document.querySelector('#currentTurn');
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
    });

    settings.addEventListener('click', function () {

        menu.classList.toggle('show');
        menu.classList.toggle('hide');

        if (menu.classList.contains('show')) {
            settingsIcon.className = "fa-solid fa-xmark";
        } 
        else {
            settingsIcon.className = "fa-solid fa-gear";
        }
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
            musicBtn.textContent = 'Pause Music';
        } else {
            bgmusic.pause();
            musicIcon.className = "fa-solid fa-play";
            musicBtn.textContent = 'Play Music';
        }
    });

    document.querySelector('#deal-cards').addEventListener('click', setUpTurn);
    
    function setUpTurn(){
        dealCards();
    }

    function dealCards(){
        gameData.hand = [];
        for (var i = 0; i < 4; i++){
            let randomCards = Math.floor(Math.random() * gameData.cards.length);
            gameData.hand.push(gameData.cards[randomCards]);
        }
        displayHand();
        applyEffects();
    }

    function displayHand(){
        fourCards.innerHTML = "";
        gameData.hand.forEach(function(card){
            fourCards.innerHTML += `<img src="images/${card.file}">`;
        });
    }

    function applyEffects(){
        gameData.gemTurn = 0;

        gameData.hand.forEach(function(card){
            gameData.gemTurn += card.gems;

            const hasGorgon = gameData.hand.some(function(card){
                return card.effect === 'gorgon';
            });
            
            if(hasGorgon && gameData.power.immuneToGorgon === false){
                gameData.gemTurn = 0;
                gameData.gemTotal = 0;
            }
        });
        
        gameData.gemTotal += gameData.gemTurn;
        checkWinningCondition();
    }

    function checkWinningCondition(){
        if(gameData.gemTotal > gameData.gemGoal){
            winScreen.classList.replace('hide', 'show');
        } else {
            showCurrentScore();
        }
    }

    function showCurrentScore(){
        score.textContent = `Magic Gems: ${gameData.gemTotal}`;
        nextTurn();
    }

    function nextTurn(){
        currentTurn.textContent = `Turn ${gameData.turn}`;
        gameData.turn++;
    }
})();