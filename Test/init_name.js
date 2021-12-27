var fs = require('fs');

var all = ["Melee", "Perk", "Power", "Ranged", "Shield", "Skin", "DeployedTrap", "Grenade"];
var dirname = `C:/Users/giris/Desktop/Games/Dead Cells-old/Mod Tools/Mod_pak/orig/data/affix/Advanced/`;

console.log("running");

var filenames = fs.readdirSync(dirname);
var content;

console.log(filenames);

filenames.forEach(function (filename) {
    // fs.rename(dirname + filename, dirname + filename.substring(6), function (err) {
    //     if (err) throw err;
    //     console.log('File Renamed.');
    // });

    content = JSON.parse(fs.readFileSync(dirname + filename, 'utf-8'))
    fs.writeFileSync(dirname + filename, JSON.stringify(content))
});

// var content = fs.readFileSync(dirname + "AmmoBackOnUse.json", 'utf-8');

// var cont = JSON.parse(content);
// console.log(content);
// console.log(cont.index);
