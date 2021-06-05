var rows = document.getElementById("rows");
var rows_data = document.getElementById("rows_data");

var cols = document.getElementById("cols");
var cols_data = document.getElementById("cols_data");

var mines = document.getElementById("mines");
var mines_data = document.getElementById("mines_data");

var isRandom = document.getElementById("isRandom");

var seed = document.getElementById("seed");

var copy = document.getElementById("copy");
var play = document.getElementById("play");

isRandom.addEventListener("change", () => {
    if (isRandom.checked) {
        seed.setAttribute("class", "random");
        seed.setAttribute("disabled", true);
    } else {
        seed.setAttribute("class", "seed");
        seed.removeAttribute("disabled");
    }
});

copy.addEventListener("click", () => {
    copyToClipboard();
});

play.addEventListener("click", () => {
    window.location.replace(generate());
})

cols.addEventListener("change", () => {
    cols_data.innerText = "Cols: " + cols.valueAsNumber;
    mines.setAttribute("max", (rows.valueAsNumber * cols.valueAsNumber) - 1);
    mines.value = 1;
    mines_data.innerText = "Mines: " + mines.valueAsNumber;
});

rows.addEventListener("change", () => {
    rows_data.innerText = "Rows: " + rows.valueAsNumber;
    mines.setAttribute("max", (rows.valueAsNumber * cols.valueAsNumber) - 1);
    mines.value = 1;
    mines_data.innerText = "Mines: " + mines.valueAsNumber;
});

mines.addEventListener("change", () => {
    mines_data.innerText = "Mines: " + mines.valueAsNumber;
});

function copyToClipboard() {
    var el = document.createElement('input');
    el.type = "text";
    el.value = generate();
    el.setAttribute('readonly', '');
    // el.setAttribute("hidden", '');
    el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, 99999);
    console.log(el)
    document.execCommand('copy');

    document.body.removeChild(el);

    // var copyText = generate();
    // copyText.select();
    // copyText.setSelectionRange(0, 99999);
    // document.execCommand("copy");
}

function generate() {
    var result = "https://mrblacklicorice.github.io/mine-sweeper/?";
    result += "r=" + rows.valueAsNumber + "&";
    result += "c=" + cols.valueAsNumber + "&";
    result += "m=" + mines.valueAsNumber + "&";
    result += "s=" + (isRandom.checked || seed.value == "" ? "random" : seed.value);
    console.log(result);
    return result;
}