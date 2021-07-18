var styleBool = false;
var secondlast = 0;
var last = 0;
function randomDecision() {
    var resultText = document.getElementById("decision");
    var results = ['Ja', 'Nein', 'Tu es!', 'Tu es nicht!', 'Vielleicht', 'Eher nicht', 'Tendenziell ja', 'Auf jeden Fall!'];
    resultText.innerText = results[getRandomInt(8)];
}
function getRandomInt(max) {
    var value = Math.floor(Math.random() * max);
    while (value == last || value == secondlast) {
        value = Math.floor(Math.random() * max);
    }
    secondlast = last;
    last = value;
    console.log(value);
    return value;
}
$(document).on('click', '#styleModeButton', function () {
    var body = document.querySelector('body');
    var html = document.querySelector('html');
    if (styleBool) {
        html.style.cssText = 'background-color:lightskyblue; text-align:center;';
        body.style.cssText = 'font-family: sans-serif;color: whitesmoke;background-color: deepskyblue;text-align: center;margin: 15px;padding: 30px;';
        styleBool = false;
    }
    else {
        html.style.cssText = 'background-color:lightgreen; text-align:center;';
        body.style.cssText = 'font-family: "Comic Sans MS", cursive, sans-serif;color: deeppink;background-color: lawngreen;text-align: center;margin: 15px;padding: 30px;';
        styleBool = true;
    }
});
