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

    const kiteImgs = ['kb-19.JPG', 'kb-20.JPG', 'kb-21.JPG', 'kb-22.JPG', 'kb-23.JPG', 'kb-24.JPG', 'kb-25.JPG', 'kb-26.JPG', 'kb-27.JPG', 'kb-28.JPG', 'kb-29.JPG', 'kb-30.JPG', 'kb-31.JPG', 'kb-32.JPG', 'kb-33.JPG', 'kb-34.JPG', 'kb-35.JPG', 'kb-36.JPG', 'kb-37.JPG'];
    let currentImage = 0;

    const slide = document.querySelector('#myKite');

    document.querySelector('#next').addEventListener('click', nextPhoto);
    document.querySelector('#previous').addEventListener('click', previousPhoto);

    function nextPhoto(){
        currentImage++;

        if (currentImage > kiteImgs.length - 1){
            currentImage = 0;
        }
        slide.src = `images/${kiteImgs[currentImage]}`;
    }

    function previousPhoto(){
        currentImage--;

        if (currentImage < 0){
            currentImage = kiteImgs.length - 1;
        }
        slide.src = `images/${kiteImgs[currentImage]}`;
    }

    const container = document.querySelector('#kestrel');
    const theKestrel = document.querySelector('#filmImg3');
    const percent = container.offsetWidth / 100;
    let prevLoc = 0;

    const targetX = 100;  
    const targetY = 400;

    container.addEventListener('mousemove', reportPos);

    function reportPos(event){
        const mousePosX = Math.ceil((event.clientX - (container.getBoundingClientRect().left)) / percent);

        if(prevLoc !== mousePosX){
            let addedPx = mousePosX * 10;
            let scale = 1 + (addedPx / 890);
            theKestrel.style.transformOrigin = `${targetX}px ${targetY}px`;
            theKestrel.style.transform = `scale(${scale})`;
            prevLoc = mousePosX;
        }
    }
});