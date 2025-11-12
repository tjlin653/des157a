window.addEventListener('load', function () {
    'use strict';
    console.log('reading js');

    const allImgs = document.querySelectorAll('.filmImg1');
    const totalFrames = 19; 

    for (let i = 0; i < allImgs.length; i++) {
        let currentImage = allImgs[i];
        let interval = null;
        let currentFrame = i; 

        currentImage.addEventListener('mouseenter', function(){
            clearInterval(interval);
            interval = setInterval(function(){
                currentFrame = (currentFrame + 1) % totalFrames;
                currentImage.src = `images/kb-${currentFrame}.JPG`;
            }, 100);
        });

        currentImage.addEventListener('mouseleave', function(){
            clearInterval(interval);
            interval = null;
            currentImage.src = `images/kb-${i}.JPG`;
            currentFrame = i;
        });
    }
});