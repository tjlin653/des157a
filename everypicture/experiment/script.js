(function(){
    'use strict';
    console.log('reading js');
    
    document.addEventListener('mousemove', reportPos);
            const theImg = document.querySelector('img');
            let prevLoc = 0;

            function reportPos(event){
                const windowSize = window.innerWidth;
                const percent2px = windowSize / 18;
                const xPos = event.clientX;
                const changePhoto = Math.floor(xPos / percent2px);
                if (changePhoto !== prevLoc){
                    theImg.src = `images/kb-${changePhoto}.JPG`;
                    prevLoc = changePhoto;
                }
            }
})();