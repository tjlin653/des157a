(function(){
    'use strict';
    console.log('reading js');

    const gameData = {
        cardGem: [
            {name: 'bronze', file: 'bronze.svg', gems: 1},
            {name: 'silver', file: 'silver.svg', gems: 2},
            {name: 'gold', file: 'gold.svg', gems: 3},
            {name: 'emerald', file: 'emerald.svg', gems: 4},
            {name: 'diamond', file: 'diamond.svg', gems: 5},
            {name: 'treasure', file: 'treasure.svg', gems: 6},
        ],
        cardEffect: [
            {name: 'gorgon-eyes', file: 'gorgon-eyes.svg', gems: 0, effect: 'gorgon'},
        ],
        power: {
            drewGorgonGaze: false,
            drewGorgonGazePending: false
        },
        hand: [],
        gemTurn: 0,
        gemTotal: 0,
        turn: 1,
        maxTurns: 10,
        gemGoal: 30,
        currentCardEffect: null,
        currentCardGem: null
    };

    const instructionsBtn = document.querySelector('#instructions-label');
    const instructionsPage = document.querySelector('#instructions-page');
    const closeInstructions = document.querySelector('#close-instructions');

    const screenBG = document.querySelector('body');
    const homeScreen = document.querySelector('#homeScreen');
    const gameScreen = document.querySelector('#gameScreen');
    const startgameBtn = document.querySelector('#startgame');

    const musicBtn = document.querySelector('#music button');
    const bgmusic = document.querySelector('#bg-music');
    const startAudio = 111;
    const musicIcon = document.querySelector('#music i');
    const settings = document.querySelector('#settings');
    const menu = document.querySelector('#menuOptions');
    const settingsIcon = document.querySelector('#settings i');

    const displayCards = document.querySelector('#display-cards');
    const currentTurn = document.querySelector('#currentTurn');
    const score = document.querySelector('#magicGems');

    const winScreen = document.querySelector('#win-screen');
    const loseScreen = document.querySelector('#lose-screen');

    instructionsBtn.addEventListener('click', function () {
        instructionsPage.classList.add('show');
        instructionsPage.classList.remove('hide');
    });

    if (closeInstructions) {
        closeInstructions.addEventListener('click', function () {
            instructionsPage.classList.add('hide');
            instructionsPage.classList.remove('show');
        });
    }

    startgameBtn.addEventListener('click', function(){
        screenBG.style.backgroundImage = "url('images/table.svg')";
        screenBG.style.backgroundSize = "cover";
        screenBG.style.backgroundPosition = "center bottom";
        screenBG.style.backgroundColor = 'transparent';
        homeScreen.classList.add('hide');
        homeScreen.classList.remove('show');
        gameScreen.classList.add('show');
        gameScreen.classList.remove('hide');
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

    document.querySelectorAll('.endingBtn').forEach(function(btn){
        btn.addEventListener('click', function(){
            location.reload();
        });
    });

    document.querySelector('#help').addEventListener('click', function(){
        instructionsPage.classList.add('show');
        instructionsPage.classList.remove('hide');
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

    startgameBtn.addEventListener('click', setUpTurn);
    
    function setUpTurn(){
        gameData.gemTurn = 0; 
        dealCards();
    }

    function dealCards(){

        let randomCardGem = Math.floor(Math.random() * gameData.cardGem.length);
        gameData.currentCardGem = gameData.cardGem[randomCardGem];

        let randomCardEffect = Math.floor(Math.random() * gameData.cardEffect.length);
        gameData.currentCardEffect = gameData.cardEffect[randomCardEffect];

        displayHand();
    }

    function displayHand(){
        displayCards.innerHTML = "";
        displayCards.innerHTML += `<img id="effect-card" src="images/${gameData.currentCardEffect.file}"> <img id="gem-card" src="images/${gameData.currentCardGem.file}">`;

        document.querySelector('#gem-card').addEventListener('click', chooseGemCard);
        document.querySelector('#effect-card').addEventListener('click', chooseEffectCard);
    }

    function chooseGemCard() {
        let card = gameData.currentCardGem;

        if (!gameData.power.drewGorgonGaze) {
            gameData.gemTurn += card.gems;
            gameData.gemTotal += card.gems;
        }

        endTurn();

        if (gameScreen.classList.contains('show')) {
            dealCards(); 
        }
    }

    function chooseEffectCard() {
        let card = gameData.currentCardEffect;

        if (card.effect === 'gorgon') {
            gameData.power.drewGorgonGazePending = true; 
        } else {
            if (!gameData.power.drewGorgonGaze) {
                gameData.gemTurn += card.gems;
                gameData.gemTotal += card.gems;
            }
        }

        endTurn();

        if (gameScreen.classList.contains('show')) {
            dealCards(); 
        }
    }

    function endTurn() {
        if (gameData.gemTotal >= gameData.gemGoal) {
            playerWins();
            return;
        }
        if (gameData.turn >= gameData.maxTurns) {
            playerLoses();
            return;
        }
        gameData.turn++;

        if (gameData.power.drewGorgonGaze) {
            gameData.power.drewGorgonGaze = false;
        }

        if (gameData.power.drewGorgonGazePending) {
            gameData.power.drewGorgonGazePending = false;
            gameData.power.drewGorgonGaze = true;
        }

        updateScoreAndTurn();
    }

    function updateScoreAndTurn() {
        score.textContent = `Magic Gems: ${gameData.gemTotal}`;
        currentTurn.textContent = `Turn ${gameData.turn}`;
    }

    function playerWins() {
        gameScreen.classList.add('hide');
        gameScreen.classList.remove('show');
        winScreen.classList.add('show');
        winScreen.classList.remove('hide');
        screenBG.style.backgroundImage = "url('images/win-screen.svg')";
        screenBG.style.backgroundSize = "cover";
        screenBG.style.backgroundPosition = "center top";
    }

    function playerLoses() {
        gameScreen.classList.add('hide');
        gameScreen.classList.remove('show');
        loseScreen.classList.add('show');
        loseScreen.classList.remove('hide');
        screenBG.style.backgroundImage = "url('images/lose-screen.svg')";
        screenBG.style.backgroundSize = "cover";
        screenBG.style.backgroundPosition = "center top";
    }
})();