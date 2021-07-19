let styleBool: boolean = false;
let secondlast: number = 0;
let last: number = 0;

function randomDecision() {
    const resultText = document.getElementById("decision");
    var results = ['Ja', 'Nein', 'Tu es!', 'Tu es nicht!', 'Vielleicht', 'Eher nicht', 'Tendenziell ja', 'Auf jeden Fall!'];
    resultText.innerText = results[getRandomInt(8)];
}

function getRandomInt(max) {
    var value = Math.floor(Math.random() * max);
    while (value == last || value == secondlast) {
        value = Math.floor(Math.random() * max)
    }
    secondlast = last;
    last = value;
    console.log(value);
    return value;
}

$(document).on('click', '#styleModeButton', function(){
    let body = (document.querySelector('body') as HTMLElement);
    let html = (document.querySelector('html') as HTMLElement);
    if(styleBool) {
        html.style.cssText = 'background-color:lightskyblue; text-align:center;';
        body.style.cssText = 'font-family: sans-serif;color: whitesmoke;background-color: deepskyblue;text-align: center;margin: 15px;padding: 30px;';
        styleBool = false;
    } else {
        html.style.cssText = 'background-color:lightgreen; text-align:center;';
        body.style.cssText = 'font-family: "Comic Sans MS", cursive, sans-serif;color: deeppink;background-color: lawngreen;text-align: center;margin: 15px;padding: 30px;';
        styleBool = true;
    }
});


$(document).on('click', '#styleModeButtonSatan', function(){
    let body = (document.querySelector('body') as HTMLElement);
    let html = (document.querySelector('html') as HTMLElement);
    if(styleBool) {
        html.style.cssText = 'background-color:darkred; text-align:center;';
        body.style.cssText = 'font-family:\'Times New Roman\', cursive;color: black;background-color: darkred;text-align: center;margin: 15px;padding: 30px;';
        styleBool = false;
    } else {
        html.style.cssText = 'background-color:lightgreen; text-align:center;';
        body.style.cssText = 'font-family: "Comic Sans MS", cursive, sans-serif;color: deeppink;background-color: lawngreen;text-align: center;margin: 15px;padding: 30px;';
        styleBool = true;
    }
});