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
            {name: 'skull', file: 'skull.svg', gems: -1},
            {name: 'amulet', file: 'amulet.svg', gems: -2},
            {name: 'voodoo', file: 'voodoo.svg', gems: -3},
            {name: 'poison', file: 'poison.svg', gems: -4},
            {name: 'runes', file: 'runes.svg', gems: -5},
            {name: 'mimic', file: 'mimic.svg', gems: -6}
        ],
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

    instructionsBtn.addEventListener('click', function () {
        instructionsPage.classList.add('show');
        instructionsPage.classList.remove('hide');
        paperSound.play();
    });

    if (closeInstructions) {
        closeInstructions.addEventListener('click', function () {
            instructionsPage.classList.add('hide');
            instructionsPage.classList.remove('show');
            paperSound.play();
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
        unsheatheSound.play();
    });

    settings.addEventListener('click', function () {
        menu.classList.toggle('show');
        menu.classList.toggle('hide');

        if (menu.classList.contains('show')) {
            settingsIcon.className = "fa-solid fa-xmark";
        } else {
            settingsIcon.className = "fa-solid fa-gear";
        }
    });

    document.querySelector('#quit').addEventListener('click', function(){
        defeatSound.play();
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
        paperSound.play();
    });

    document.querySelector('#sources').addEventListener('click', function(){
        sourcesPage.classList.add('show');
        sourcesPage.classList.remove('hide');
        paperSound.play();
    });

    if (closeSources) {
        closeSources.addEventListener('click', function () {
            sourcesPage.classList.add('hide');
            sourcesPage.classList.remove('show');
            paperSound.play();
        });
    }

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
            gameData.gemFile = gameData.currentCardGem.file;
            gameData.effectFile = gameData.currentCardEffect.file;
        }

        displayHand();
    }

    function displayHand(){
        displayCards.innerHTML = "";
        displayCards.innerHTML += `<img id="effect-card" src="images/${gameData.effectFile}"> <img id="gem-card" src="images/${gameData.gemFile}">`;

        document.querySelector('#gem-card').addEventListener('click', chooseGemCard);
        document.querySelector('#effect-card').addEventListener('click', chooseEffectCard);

        cardSound.play();
    }

    function chooseGemCard() {
        let card = gameData.currentCardGem;

        if (card.name === "empty-slot") {
            return;   
        }

        let gemValue = card.gems;

        if (gameData.power.magicMirror){
            gemValue = gemValue * 2; 
        } else if (gameData.power.doppelganger){
            gemValue = (gemValue -2) * -1; 
        } 

        gameData.gemTurn += gemValue;
        gameData.gemTotal += gemValue;

        endTurn();

        if (gameScreen.classList.contains('show')) {
            dealCards(); 
        }
    }

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

    function updateScoreAndTurn() {
        score.textContent = `Gems: ${gameData.gemTotal}`;
        currentTurn.textContent = `Turn ${gameData.turn}`;
    }

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