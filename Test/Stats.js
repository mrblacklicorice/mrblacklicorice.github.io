function relative_frequency(input, label) {
    var total = sum(input);
    var output = [];
    var sums = 0;
    for (let i = 0; i < input.length; i++) {
        sums += (Math.round((input[i] / total) * 10000)) / 100;
        output[i] = `${label[i]}: ${(Math.round((input[i] / total) * 10000)) / 100}%`;
    }
    return `${output.join("\n")}\n\ntotal%: ${sums}%\ntotal: ${total}`;
}


function sum(input) {
    var result = 0;
    for (let i = 0; i < input.length; i++) {
        result += parseFloat(input[i]);
    }
    return result;
}

function multiplier(input_array, multiplicant) {
    var output = ""
    for (let i = 0; i < input_array.length; i++) {
        output += `${input_array[i]} * ${multiplicant} = ${multiplicant*input_array[i]}\n`
    }
    return output;
}

// console.log(sum([36])/sum([198,44,36,6,4,1,14,3,16,3])*100);
// console.log(sum([198,44,36,6,4,1,14,3,16,3]));