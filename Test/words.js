var dictionary;
const fetch = require('node-fetch');

fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json').then(function(data){
    return data.json();
}).then(function(resp) {
    dictionary = resp;
    console.table(isWords('lovingi',5,5));
});

let findPermutations = (string) => {
    if (!string || typeof string !== "string") {
        return "Please enter a string"
    } else if (string.length < 2) {
        return string
    }

    let permutationsArray = []

    for (let i = 0; i < string.length; i++) {
        let char = string[i]

        if (string.indexOf(char) != i)
            continue

        let remainingChars = string.slice(0, i) + string.slice(i + 1, string.length)

        for (let permutation of findPermutations(remainingChars)) {
            permutationsArray.push(permutation);
            permutationsArray.push(char + permutation);
        }
    }
    return permutationsArray
}

let isWords = (string, min, max) => {
    if (min == null || min < 1) {
        var min1 = 1;
    } else {
        var min1 = min;
    }

    if (max == null || max > string.length) {
        var max1 = string.length;
    } else {
        var max1 = max;
    }

    var temp = [...new Set(findPermutations(string).sort(function (a, b) {
        return b.length - a.length;
    }))];
    var temp2 = [];

    for (let i = 0; i < temp.length; i++) {
        if (dictionary.hasOwnProperty(temp[i])) temp2.push(temp[i]);
    }
    var resu = {};
    for (let i = min1; i <= max1; i++) {
        resu[i] = new Array();
    }
    for (let i = 0; i < temp2.length; i++) {
        if (resu[temp2[i].length] != undefined) resu[temp2[i].length].push(temp2[i]);
    }
    return resu;
}
