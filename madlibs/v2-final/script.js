(function(){
    "use strict";
    console.log("reading js");

    const myForm = document.querySelector('#myform');
    const myMadLib = document.querySelector('#madlib-questions');
    const output = document.querySelector('#madlib-output');

    myForm.addEventListener('submit', function(event){
        event.preventDefault();
        const adj = document.querySelector('#adj').value;
        const place = document.querySelector('#place').value;
        const noun = document.querySelector('#noun').value;
        const silly = document.querySelector('#silly').value;
        const verb = document.querySelector('#verb').value;

        let myText = `<h2>My Monster</h2>
            <p>Last night, a <span id="adj">${adj}</span> monster crawled out of <span id="place">${place}</span> and started singing under a full moon. It carried a giant <span id="noun">${noun}</span> and kept yelling <span id="silly">"${silly}!"</span> every time it <span id="verb">${verb}</span>. By morning, it was famous online for its <span id="adj">${adj}</span> dance moves.</p>
            <button id="backbtn">Back to Creating</button>`;  

        output.innerHTML = myText;
        myMadLib.style.display = 'none';
        output.style.display = 'block';

        const backBtn = document.querySelector('#backbtn');
        backBtn.addEventListener('click', function(e){
            e.preventDefault();
            output.style.display = 'none';
            myMadLib.style.display = 'block';
            document.querySelector('#adj').value = '';
            document.querySelector('#place').value = '';
            document.querySelector('#noun').value = '';
            document.querySelector('#silly').value = '';
            document.querySelector('#verb').value = '';
        });
    });
}());