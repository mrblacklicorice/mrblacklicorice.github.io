var algebra = require("algebra.js");

function vectorAddition(vectors, showWork) {
    var solutions = new Array(vectors.length);
    var x = 0;
    var y = 0;
    var x_string = "";
    var y_string = "";
    var range = new Array(vectors.length);
    for (let i = 0; i < vectors.length; i++) {
        solutions[i] = new Array(2);
        solutions[i][0] = new Array(2);
        solutions[i][1] = compassToUnitcircle(vectors[i][1]);
        range[i] = solutions[i][1];
        solutions[i][0][0] = Math.cos(solutions[i][1]) * vectors[i][0];
        solutions[i][0][1] = Math.sin(solutions[i][1]) * vectors[i][0];
        if (showWork) console.log(`cos(${round(radToDeg(solutions[i][1]))})*${vectors[i][0]} = ${round(solutions[i][0][0])}`);
        x_string += " + " + solutions[i][0][0];
        if (showWork) console.log(`sin(${round(radToDeg(solutions[i][1]))})*${vectors[i][0]} = ${round(solutions[i][0][1])}`);
        y_string += " + " + solutions[i][0][1];
    }
    for (let i = 0; i < solutions.length; i++) {
        x += solutions[i][0][0];
        y += solutions[i][0][1];
    }
    if (showWork) console.log(`\n${x_string.substring(3)} = ${round(x)}\n${y_string.substring(3)} = ${round(y)}\n\nsqrt((${round(x)}^2)+(${round(y)}^2)) = ${round(Math.sqrt((x * x) + (y * y)))} units\narctan(${round(y)}/${round(x)}) = ${degToCompass(whichone(round(radToDeg(Math.atan(y / x))), range))}`);
    return [round(Math.sqrt((x * x) + (y * y))), [degToCompass(whichone(round(radToDeg(Math.atan(y / x))), range))]];
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function degToRad(deg) {
    return deg * (Math.PI / 180);
}

function radToDeg(rad) {
    return (rad * 180 / Math.PI)
}

function round(input) {
    return Math.round(input * 100) / 100;
}

function compassToUnitcircle([compass, direction]) {
    if (direction == null) return degToRad(compass);

    if (direction == "E") return degToRad(0);
    if (direction == "N") return degToRad(90);
    if (direction == "W") return degToRad(180);
    if (direction == "S") return degToRad(270);

    if (direction == "NoE") return degToRad(compass);
    if (direction == "WoN") return degToRad(compass + 90);
    if (direction == "SoW") return degToRad(compass + 180);
    if (direction == "EoS") return degToRad(compass + 270);

    if (direction == "EoN") return degToRad((90 - compass));
    if (direction == "NoW") return degToRad((90 - compass) + 90);
    if (direction == "WoS") return degToRad((90 - compass) + 180);
    if (direction == "SoE") return degToRad((90 - compass) + 270);
}

function degToCompass(deg) {
    if (deg % 360 == 0) return `(${deg}°)   ` + "E";
    if (deg % 360 < 45) return `(${deg}°)   ` + (deg - 0) + "° NoE";
    if (deg % 360 < 90) return `(${deg}°)   ` + (90 - deg) + "° EoN";

    if (deg % 360 == 90) return `(${deg}°)   ` + "N";
    if (deg % 360 < 135) return `(${deg}°)   ` + (deg - 90) + "° WoN";
    if (deg % 360 < 180) return `(${deg}°)   ` + (180 - deg) + "° NoW";

    if (deg % 360 == 180) return `(${deg}°)   ` + "W";
    if (deg % 360 < 225) return `(${deg}°)   ` + (deg - 180) + "° SoW";
    if (deg % 360 < 270) return `(${deg}°)   ` + (270 - deg) + "° WoS";

    if (deg % 360 == 270) return `(${deg}°)   ` + "S";
    if (deg % 360 < 315) return `(${deg}°)   ` + (deg - 270) + "° EoS";
    if (deg % 360 < 360) return `(${deg}°)   ` + (360 - deg) + "° SoE";
}

function vector_components(value, Vi, theta) {
    if (value == 'x') {
        console.log(`${Vi} * cos(${theta}) = ${round(Vi * Math.cos(degToRad(theta)))}`);
        return round(Vi * Math.cos(degToRad(theta)));
    } else if (value == 'y') {
        console.log(`${Vi} * sin(${theta}) = ${round(Vi * Math.sin(degToRad(theta)))}`);
        return round(Vi * Math.sin(degToRad(theta)));
    }
}

function whichone(option, range) {
    var option2 = option + 180;
    if (option < 0) option += 360;
    if (option2 > 360) option2 -= 360;
    range.sort((a, b) => a - b);
    if (option > radToDeg(range[0]) && option < radToDeg(range[range.length - 1])) return option;
    return option2;
}

// console.log(vectorAddition([
//     [78.6, [0, "N"]],
//     [58.0, [0, "W"]]
// ]));


// console.log(vectorAddition([
//     [6, [0]],
//     [10, [90]]
// ], false));


// F = 5.7 units, 315o
// G = 6.4 units, 38.7o

// H = 15.6 units, 39.8o S of E
// I  = 10.0 units, 360o
// J = 15.6 units, 140.2

function kinematic_equations(input) {
    var equations = [
        [`(${input.Vf})`, `(${input.Vi}) + (${input.a}) * (${input.t})`],
        [`(${input.x})`, `(${input.Vi}) * (${input.t}) + (${input.a}) * (${input.t}) * (${input.t}) / 2`],
        [`(${input.Vf}) * (${input.Vf})`, `(${input.Vi}) * (${input.Vi}) + 2 * (${input.a}) * (${input.x})`],
        [`(${input.x})`, `((${input.Vi}) + (${input.Vf})) / 2 * (${input.t})`],
        [`(${input.x})`, `(${input.Vf}) * (${input.t}) - (${input.a}) * (${input.t}) * (${input.t}) / 2`],
    ];
    var eq, eq_string, ans;

    for (let i = 0; i < equations.length; i++) {
        eq = new algebra.Equation(algebra.parse(equations[i][0]), algebra.parse(equations[i][1]));
        eq_string = eq.toString();
        ans = (eq_string.includes("x") ? !eq_string.includes("y") : eq_string.includes("y")) ? (eq_string.includes("x") ? eq.solveFor("x") : eq.solveFor("y")) : undefined;
        if (ans != undefined) {
            console.log(`Equation ${i + 1}`);
            console.log(`-----------------\n${equations[i][0]} = ${equations[i][1]}\n-----------------`);
            console.log(eq_string);
            var arr = (ans.toString()).split(",");
            for (let i = 0; i < arr.length; i++) arr[i] = String(round(eval(arr[i]))) + `  (${eval(arr[i])})`;
            eq_string.includes("x") ? console.log("x = " + arr.join()) : console.log("y = " + arr.join());
            eq_string.includes("x") ? input[getKeyByValue(input, "x")] = (arr.length == 2) ? `${parseFloat(arr[0])} , ${parseFloat(arr[1])}` : parseFloat(arr[0]) : input[getKeyByValue(input, "y")] = (arr.length == 2) ? `${parseFloat(arr[0])} , ${parseFloat(arr[1])}` : parseFloat(arr[0]);
            console.log("-------------------------------------------------------------------");
        }
    }
    console.table(input);
}

kinematic_equations({
    Vf: 'x', // m/s //
    Vi: 0, // m/s //
    a: 20,  // m/s^2 //
    x: 12, // m //
    t: 'y'// s //
});

