(function(){
    'use strict';
    console.log('reading js');

    const gameData = {
        //the card on the right provides a gem value only
        cardGem: [
            {name: 'bronze', file: 'bronze.svg', gems: 1},
            {name: 'silver', file: 'silver.svg', gems: 2},
            {name: 'gold', file: 'gold.svg', gems: 3},
            {name: 'emerald', file: 'emerald.svg', gems: 4},
            {name: 'diamond', file: 'diamond.svg', gems: 5},
            {name: 'treasure', file: 'treasure.svg', gems: 6},
            {name: 'skull', file: 'skull.svg', gems: -1},
            {name: 'amulet', file: 'amulet.svg', gems: -2},
            {name: 'voodoo', file: 'voodoo.svg', gems: -3},
            {name: 'poison', file: 'poison.svg', gems: -4},
            {name: 'runes', file: 'runes.svg', gems: -5},
            {name: 'mimic', file: 'mimic.svg', gems: -6}
        ],
        //the card on the left provides various effects
        cardEffect: [
            {name: 'gorgon-eyes', file: 'gorgon-eyes.svg', gems: 2, effect: 'gorgon'},
            {name: 'magic-mirror', file: 'magic-mirror.svg', gems: 0, effect: 'mirror'},
            {name: 'demon-dice', file: 'demon-dice.svg', gems: 0, effect: 'dice'},
            {name: 'doppelganger', file: 'doppelganger.svg', gems: 0, effect: 'doppelganger'},
            {name: 'pinky-promise', file: 'pinky-promise.svg', gems: 6, effect: 'promise'},
            {name: 'dust-devil', file: 'dust-devil.svg', gems: 6, effect: 'dust'},
            {name: 'sin-of-greed', file: 'sin-of-greed.svg', gems: 0, effect: 'greed'},
            {name: 'tangled-time', file: 'tangled-time.svg', gems: 0, effect: 'time'},
            {name: 'magic-gemsmith', file: 'magic-gemsmith.svg', gems: 0, effect: 'gemsmith'},
            {name: 'wishing-well', file: 'wishing-well.svg', gems: -2, effect: 'well'},
            {name: 'rich-get-richer', file: 'rich-get-richer.svg', gems: 0, effect: 'richer'}
        ],
        //deals with effects that occur the next turn
        power: {
            drewGorgonGaze: false,
            drewGorgonGazePending: false,
            magicMirror: false,
            magicMirrorPending: false,
            doppelganger: false,
            doppelgangerPending: false,
            pinkyPromise: false,
            pinkyPromisePending: false,
            dustDevil: false,
            dustDevilPending: false,
            wishingWell: false,
            wishingWellPending: false,
        },
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
    const closeInstructions = document.querySelector('.close-instructions');

    const sourcesPage = document.querySelector('#sources-page');
    const closeSources = document.querySelector('.close-sources');

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

    const unsheatheSound = new Audio('audio/unsheathe.mp3');
    const paperSound = new Audio('audio/paper.mp3');
    const cardSound = new Audio('audio/card-dealing.mp3');
    const victorySound = new Audio('audio/victory.mp3');
    const defeatSound = new Audio('audio/defeat.mp3');

    const displayCards = document.querySelector('#display-cards');
    const currentTurn = document.querySelector('#currentTurn');
    const score = document.querySelector('#magicGems');
    const effectInfo = document.querySelector('#effectInfo');

    const winScreen = document.querySelector('#win-screen');
    const loseScreen = document.querySelector('#lose-screen');

    //open instructions in the home screen
    instructionsBtn.addEventListener('click', function () {
        instructionsPage.classList.add('show');
        instructionsPage.classList.remove('hide');
        paperSound.play();
    });
    //close instructions in the home screen
    if (closeInstructions) {
        closeInstructions.addEventListener('click', function () {
            instructionsPage.classList.add('hide');
            instructionsPage.classList.remove('show');
            paperSound.play();
        });
    }

    //change screen to game screen
    startgameBtn.addEventListener('click', function(){
        screenBG.style.backgroundImage = "url('images/table.svg')";
        screenBG.style.backgroundSize = "cover";
        screenBG.style.backgroundPosition = "center bottom";
        screenBG.style.backgroundColor = 'transparent';
        homeScreen.classList.add('hide');
        homeScreen.classList.remove('show');
        gameScreen.classList.add('show');
        gameScreen.classList.remove('hide');
        unsheatheSound.play();
    });

    //settings button
    settings.addEventListener('click', function () {
        menu.classList.toggle('show');
        menu.classList.toggle('hide');
        if (menu.classList.contains('show')) {
            settingsIcon.className = "fa-solid fa-xmark";
        } else {
            settingsIcon.className = "fa-solid fa-gear";
        }
    });

    //quit game during a game
    document.querySelector('#quit').addEventListener('click', function(){
        defeatSound.play();
        location.reload();
    });
    //reset game after win or loss
    document.querySelectorAll('.endingBtn').forEach(function(btn){
        btn.addEventListener('click', function(){
            location.reload();
        });
    });

    //instructions in the game screen
    document.querySelector('#help').addEventListener('click', function(){
        instructionsPage.classList.add('show');
        instructionsPage.classList.remove('hide');
        paperSound.play();
    });

    //open audio sources
    document.querySelector('#sources').addEventListener('click', function(){
        sourcesPage.classList.add('show');
        sourcesPage.classList.remove('hide');
        paperSound.play();
    });
    //close audio sources
    if (closeSources) {
        closeSources.addEventListener('click', function () {
            sourcesPage.classList.add('hide');
            sourcesPage.classList.remove('show');
            paperSound.play();
        });
    }

    //play background music during the game
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

    //when the game starts
    startgameBtn.addEventListener('click', setUpTurn);
    
    function setUpTurn(){
        gameData.gemTurn = 0; 
        dealCards();
    }

    //randonly select 1 gem card and 1 effect card
    function dealCards(){
        let randomCardGem = Math.floor(Math.random() * gameData.cardGem.length);
        gameData.currentCardGem = gameData.cardGem[randomCardGem];

        let randomCardEffect = Math.floor(Math.random() * gameData.cardEffect.length);
        gameData.currentCardEffect = gameData.cardEffect[randomCardEffect];

        //these effect cards change card selection
        if (gameData.power.pinkyPromise) {
            let randomCardEffect = Math.floor(Math.random() * gameData.cardEffect.length);
            gameData.currentCardEffect = gameData.cardEffect[randomCardEffect];
            gameData.effectFile = gameData.currentCardEffect.file;

            gameData.currentCardGem = {name: 'empty-slot', file: 'empty-card.svg', gems: 0};
            gameData.gemFile = "empty-card.svg";
        } else if (gameData.power.dustDevil) {
            gameData.gemFile = "hidden-card.svg";
            gameData.effectFile = "hidden-card.svg";
        } else if (gameData.power.wishingWell){
            let positives = [];
            for (let i = 0; i < gameData.cardGem.length; i++){
                if (gameData.cardGem[i].gems> 0){
                    positives.push(gameData.cardGem[i]);
                }
                let index = Math.floor(Math.random() * positives.length);
                gameData.currentCardGem = positives[index];

                gameData.gemFile = gameData.currentCardGem.file;
                gameData.effectFile = gameData.currentCardEffect.file;

                gameData.power.wishingWell = false;
            }
        } else {
            //normal card generation
            gameData.gemFile = gameData.currentCardGem.file;
            gameData.effectFile = gameData.currentCardEffect.file;
        }

        displayHand();
    }

    //match the card image with the random selection
    function displayHand(){
        displayCards.innerHTML = "";
        displayCards.innerHTML += `<img id="effect-card" src="images/${gameData.effectFile}"> <img id="gem-card" src="images/${gameData.gemFile}">`;

        document.querySelector('#gem-card').addEventListener('click', chooseGemCard);
        document.querySelector('#effect-card').addEventListener('click', chooseEffectCard);

        cardSound.play();
    }

    //handles what happens if the player choose the card on the right
    function chooseGemCard() {
        let card = gameData.currentCardGem;

        //the pinky-promise card forbids card selection on the right
        if (card.name === "empty-slot") {
            return;   
        }

        let gemValue = card.gems;

        //these effect cards change the interaction with the card on the right
        if (gameData.power.magicMirror){
            gemValue = gemValue * 2; 
        } else if (gameData.power.doppelganger){
            gemValue = (gemValue -2) * -1; 
        } 

        //calculate gems
        gameData.gemTurn += gemValue;
        gameData.gemTotal += gemValue;

        endTurn();

        if (gameScreen.classList.contains('show')) {
            dealCards(); 
        }
    }

    //handles what happens if the player choose the card on the left
    function chooseEffectCard() {
        let card = gameData.currentCardEffect;

        if (card.effect === 'gorgon'){
            gameData.power.drewGorgonGazePending = true; 
            effectInfo.textContent = '*FROZEN*';
        } else if (card.effect === 'mirror'){
            gameData.power.magicMirrorPending = true;
            effectInfo.textContent= '*DOUBLED*';
        } else if (card.effect === 'dice'){
            let diceValue;
            if (Math.random() < 0.5) {
                diceValue = 10;
            } else {
                diceValue = -10;
            }
            gameData.gemTurn += diceValue;
            gameData.gemTotal += diceValue;
        } else if (card.effect === 'doppelganger'){
            gameData.power.doppelgangerPending = true;
            effectInfo.textContent= '*-2 & INVERTED*';
        } else if (card.effect === 'promise'){
            gameData.power.pinkyPromisePending = true; 
        } else if (card.effect === 'dust'){
            gameData.power.dustDevilPending = true;
        } else if (card.effect === 'greed'){
            gameData.gemTotal = gameData.gemTotal * 2;
            gameData.turn = gameData.maxTurns;
            endTurn();
            return;
        } else if (card.effect === 'time'){
            let randomCardEffect = Math.floor(Math.random() * gameData.cardEffect.length);
            gameData.currentCardEffect = gameData.cardEffect[randomCardEffect];
            return chooseEffectCard();
        } else if (card.effect === 'gemsmith'){
            let randomCardGem = Math.floor(Math.random() * gameData.cardGem.length);
            gameData.currentCardGem = gameData.cardGem[randomCardGem];
            return chooseGemCard();
        } else if (card.effect === 'well'){
            gameData.power.wishingWellPending = true; 
        } else if (card.effect === 'richer'){
            if (gameData.gemTotal >= 20){
                gameData.gemTurn += 10;
                gameData.gemTotal += 10;
            }
        }

        gameData.gemTurn += card.gems;
        gameData.gemTotal += card.gems;

        endTurn();

        //if the game screen is still shown, then the game hasn't ended yet
        if (gameScreen.classList.contains('show')) {
            dealCards(); 
        }
    }

    //checks for win condition
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

        //if a card's effect would activate the next turn after being chosen, store it to activate it at the start of the next turn only
        if (gameData.power.drewGorgonGaze) {
            gameData.power.drewGorgonGaze = false;
            effectInfo.textContent = '';
        }
        if (gameData.power.drewGorgonGazePending) {
            gameData.power.drewGorgonGazePending = false;
            gameData.power.drewGorgonGaze = true;
        }
        if (gameData.power.magicMirror) {
            gameData.power.magicMirror = false;
            effectInfo.textContent = '';
        }
        if (gameData.power.magicMirrorPending) {
            gameData.power.magicMirrorPending = false;
            gameData.power.magicMirror = true;
        }
        if (gameData.power.doppelganger) {
            gameData.power.doppelganger = false;
            effectInfo.textContent = '';
        }
        if (gameData.power.doppelgangerPending) {
            gameData.power.doppelgangerPending = false;
            gameData.power.doppelganger = true;
        }
        if (gameData.power.pinkyPromise) {
            gameData.power.pinkyPromise = false;
        }
        if (gameData.power.pinkyPromisePending) {
            gameData.power.pinkyPromisePending = false;
            gameData.power.pinkyPromise = true;
        }
        if (gameData.power.dustDevil) {
            gameData.power.dustDevil = false;
        }
        if (gameData.power.dustDevilPending) {
            gameData.power.dustDevilPending = false;
            gameData.power.dustDevil = true;
        }
        if (gameData.power.wishingWell) {
            gameData.power.wishingWell = false;
        }
        if (gameData.power.wishingWellPending) {
            gameData.power.wishingWellPending = false;
            gameData.power.wishingWell = true;
        }

        updateScoreAndTurn();
    }

    //update the UI of the turn and score as the game progresses
    function updateScoreAndTurn() {
        score.textContent = `Gems: ${gameData.gemTotal}`;
        currentTurn.textContent = `Turn ${gameData.turn}`;
    }

    //display win screen
    function playerWins() {
        bgmusic.pause();
        victorySound.play();
        gameScreen.classList.add('hide');
        gameScreen.classList.remove('show');
        winScreen.classList.add('show');
        winScreen.classList.remove('hide');
        screenBG.style.backgroundImage = "url('images/win-screen.svg')";
        screenBG.style.backgroundSize = "cover";
        screenBG.style.backgroundPosition = "center top";
    }

    //display loss screen
    function playerLoses() {
        bgmusic.pause();
        defeatSound.play();
        gameScreen.classList.add('hide');
        gameScreen.classList.remove('show');
        loseScreen.classList.add('show');
        loseScreen.classList.remove('hide');
        screenBG.style.backgroundImage = "url('images/lose-screen.svg')";
        screenBG.style.backgroundSize = "cover";
        screenBG.style.backgroundPosition = "center top";
    }
})();