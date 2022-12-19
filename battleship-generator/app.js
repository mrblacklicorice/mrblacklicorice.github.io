var gamecode = document.getElementById("gamecode");

var join_game = document.getElementById("join_game");
var new_game = document.getElementById("new_game");

new_game.addEventListener("click", () => {
    window.location.replace(generate());
})

join_game.addEventListener("click", () => {
    if (!(gamecode.valueAsNumber > 99999 || gamecode.valueAsNumber < 10000))
        window.location.replace(generate());
})

function generate() {
    var result = "https://mrblacklicorice.github.io/battleship/?";
    result += (gamecode.valueAsNumber == NaN) ? random(10000, 99999) : "g=" + gamecode.valueAsNumber;
    return result;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}