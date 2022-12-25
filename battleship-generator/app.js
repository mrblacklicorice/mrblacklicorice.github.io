var gamecode = document.getElementById("gamecode");

var join_game = document.getElementById("join_game");
var new_game = document.getElementById("new_game");

new_game.addEventListener("click", () => {
    window.location.href = "https://mrblacklicorice.github.io/battleship/";
});

join_game.addEventListener("click", () => {
    if (!(gamecode.valueAsNumber > 99999 || gamecode.valueAsNumber < 10000))
        window.location.href = "https://mrblacklicorice.github.io/battleship/?g=" + gamecode.valueAsNumber;
});